import React, { useEffect, useState } from 'react'
import { resultInitalState } from "./constants/react-quiz-questions";
import AnswerTimer from './components/AnswerTimer';
import Timer from './components/Timer';

const Quiz = ({ questions }) => {

    const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answerIdx, setAnswerIdx] = useState(null);
  const [answer, setAnswer] = useState(null);
  const [result, setResult] = useState(resultInitalState);
  const [showResult, setShowResult] = useState(false);
  const [showAnswerTimer, setShowAnswerTimer] = useState(true);
  const [inputAnswer, setInputAnswer] = useState();

  const [timeOut, setTimeOut] = useState(false);

  const [name, setName] = useState('');
  const [highScores, setHighScores] = useState([]);
  const [showScore, setShowScore] = useState(false);

useEffect(() => {
  setHighScores(JSON.parse(localStorage.getItem("highScores")) || []);
}, []);

  const handleSave = () => {
      const score = {
        name,
        score: result.score,
      };

      const newHighScore = [...highScores, score].sort(
        (a, b) => b.score - a.score
      );

      setHighScores(newHighScore);
      setShowScore(true);
      localStorage.setItem("highScores", JSON.stringify(newHighScore));
  }

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
    setInputAnswer(null);
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
      setName('');
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


  const handleTryAgain = () => {
    setShowScore(false);
    onTryAgain();
  }

  return (
    <div className="quiz-container relative">
      {!showResult ? (
        <>
        {showAnswerTimer && (
          <>
          <AnswerTimer duration={30} onTimeUp={onTimeUp} />
          <div className="timer">
          <Timer setTimeOut={setTimeOut} questionNumber={currentQuestion} />
          </div>
          </>
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
          <button onClick={handleTryAgain}>Try again</button>

          {!showScore ? 
          (
            <>
          <h3>
            Enter your name below <br /> to save your score!
          </h3>

          <input type="text" placeholder='Your Name'
          value={name} onChange={e => setName(e.target.value)}/>

          <button onClick={handleSave}>Save</button>
          </>
          )
          : (
          <>
          <table>
            <thead>
              <tr>
                <th>Ranking</th>
                <th>Name</th>
                <th>Score</th>
              </tr>
              </thead>
              <tbody>
                {highScores.map((highScores, i) => {
                  return (
                  <tr key={i} >
                  <td>{i + 1}</td>
                  <td>{highScores.name}</td>
                  <td>{highScores.score}</td>
                </tr>
                  )
                })}
                
              </tbody>
          </table>
          </>
          )}
        </div>
      )}
    </div>
  )
}

export default Quiz
