import React, { useState } from 'react'
import { resultInitalState } from "./constants/react-quiz-questions";
import AnswerTimer from './components/AnswerTimer';

const Quiz = ({ questions }) => {

    const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answerIdx, setAnswerIdx] = useState(null);
  const [answer, setAnswer] = useState(null);
  const [result, setResult] = useState(resultInitalState);
  const [showResult, setShowResult] = useState(false);
  const [showAnswerTimer, setShowAnswerTimer] = useState(true);
  const [inputAnswer, setInputAnswer] = useState();

  const { question, choices, correctAnswer, type } = questions[currentQuestion];

  

  const onAnwswerClick = (answer, index) => {
    setAnswerIdx(index);

    if (answer === correctAnswer) {
      setAnswer(true);
    } else {
      setAnswer(false);
    }
  }

  const onClickNext = (finalAnswer) => {
    setAnswerIdx(null);
    setShowAnswerTimer(false);
    setResult((prev) => 
    finalAnswer ? { 
      ...prev, 
      correctAnswers: prev.correctAnswers + 1, 
      score: prev.score + 5
     } : {
      ...prev,
      wrongAnswers: prev.wrongAnswers + 1,
     }
    );

    if (currentQuestion !== questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    } else {
      setCurrentQuestion(0);
      setShowResult(true);
    }

    setTimeout(() => {
      setShowAnswerTimer(true);
    });
  }

  const onTryAgain = () => {
    setResult(resultInitalState);
    setShowResult(false);
  }

  const onTimeUp = () => {
    setAnswer(false);
    onClickNext(false);
  }

  const handleInputChange = (e) => {
    setInputAnswer(e.target.value);
    setAnswerIdx('fill');

    if (e.target.value === correctAnswer) {
      setAnswer(true);
    } else {
      setAnswer(false);
    }
  }

  const getAnswerUI = () => {

    if (type === "FIB") {
      return <input value={inputAnswer} onChange={handleInputChange} />
    }

    return (
      <ul>
            {choices.map((choice, index) => (
              <li
                onClick={() => onAnwswerClick(choice, index)}
                key={choice}
                className={answerIdx === index ? "selected-answer" : null}
              >
                {choice}
              </li>
            ))}
          </ul>
    )
  }

  return (
    <div className="quiz-container relative">
      {!showResult ? (
        <>
        {showAnswerTimer && (
          <AnswerTimer duration={15} onTimeUp={onTimeUp} />
        )}
          <span className="active-question-no">{currentQuestion + 1}</span>
          <span className="total-question">/{questions.length}</span>
          <h2>{question}</h2>
          {getAnswerUI()}
          <div className="footer">
            <div className="hidden">hello</div>
            <button onClick={() => onClickNext(answer)} disabled={answerIdx === null}>
              {currentQuestion === questions.length - 1 ? "Finish" : "Next"}
            </button>
          </div>
        </>
      ) : (
        <div className="result">
          <h3>Result</h3>
          <p>
            Total Questions: <span>{questions.length}</span>
          </p>
          <p>
            Total Score: <span>{result.score}</span>
          </p>
          <p>
            Correct Answers: <span>{result.correctAnswers}</span>
          </p>
          <p>
            Wrong Answers: <span>{result.wrongAnswers}</span>
          </p>
          <button onClick={onTryAgain}>Try again</button>
        </div>
      )}
    </div>
  )
}

export default Quiz
