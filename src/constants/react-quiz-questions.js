export const jsQuizz = {
  questions: [
    {
      question:
        "Which animal has a long neck and many spots",
      type: "FIB",
      correctAnswer: "giraffe",
    },
    {
      question:
        "What is the name of the world’s highest mountain?",
      choices: [
        "Alps",
        "Zugspitze",
        "Annapurna",
        "Mount Everest",
      ],
      type: "MCQs",
      correctAnswer: "Mount Everest",
    },
    {
      question: "How many wings does a butterfly have?",
      choices: [
        "4",
        "2",
        "6",
        "5",
      ],
      type: "MCQs",
      correctAnswer: "4",
    },
    {
      question:
        "What is the capital city of Scotland",
      choices: ["Glasgow", "London", "Europe", "Edinburgh"],
      type: "MCQs",
      correctAnswer: "Edinburgh",
    },
    {
      question: "What is the largest animal in the world?",
      choices: ["elephant", "giraffe", "blue whale", "brown bear"],
      type: "MCQs",
      correctAnswer: "blue whale",
    },
    {
      question: "What was the original name of Mickey Mouse?",
      choices: [
        "Mortimer Mouse",
        "The Rat",
        "Marvin Mouse",
        "Marshall Mouse",
      ],
      type: "MCQs",
      correctAnswer: "Mortimer Mouse",
    },
  ],
};

export const resultInitalState = {
  score: 0,
  correctAnswers: 0,
  wrongAnswers: 0,
};