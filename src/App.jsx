import { useEffect, useState } from "react";
import Quiz from "./Quiz";
import { jsQuizz } from "./constants/react-quiz-questions";

function App() {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    getQuestions();
  }, []);

  const getQuestions = async () => {
    try {
      const response = await fetch("https://644982a3e7eb3378ca4ba471.mockapi.io/questions");

      const questionsResponse = await response.json();

      console.log(questionsResponse);

      setQuestions(questionsResponse);
    } catch (error) {
     console.log(error) 
    }
  }


  return (
    <>
    <Quiz questions={jsQuizz.questions} />
    </>
  );
}

export default App;