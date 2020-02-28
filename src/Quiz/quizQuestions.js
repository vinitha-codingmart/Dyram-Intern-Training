export const quiz = {
  quizTitle: "Pop Quiz",
  quizSynopsis: `Welcome to your pop quiz on ReactJs. There are 5 questions in total. Each correct answer earns you 1 mark. There is no negative marking`,
  questions: [
    {
      question:
        "How can you access the state of a component from inside of a member function?",
      questionType: "text",
      answers: [
        "this.getState()",
        "this.prototype.stateValue",
        "this.state",
        "this.values"
      ],
      correctAnswer: "3",
      messageForCorrectAnswer: "Correct answer. Good job.",
      messageForIncorrectAnswer: "Incorrect answer. Please try again."
    },
    {
      question: "ReactJS is developed by _____?",
      questionType: "text",
      answers: ["Google Engineers", "Facebook Engineers"],
      correctAnswer: "2",
      messageForCorrectAnswer: "Correct answer. Good job.",
      messageForIncorrectAnswer: "Incorrect answer. Please try again."
    },
    {
      question: "ReactJS is an MVC based framework?",
      questionType: "text",
      answers: ["True", "False"],
      correctAnswer: "2",
      messageForCorrectAnswer: "Correct answer. Good job.",
      messageForIncorrectAnswer: "Incorrect answer. Please try again."
    },
    {
      question: "Which of the following concepts is/are key to ReactJS?",
      questionType: "text",
      answers: [
        "Component-oriented design",
        "Event delegation model",
        "Both of the above"
      ],
      correctAnswer: "3",
      messageForCorrectAnswer: "Correct answer. Good job.",
      messageForIncorrectAnswer: "Incorrect answer. Please try again."
    },
    {
      question:
        "What function allows you to render React content in an HTML page?",
      questionType: "text",
      answers: ["ReactDOM.start()", "React.render()", "React.mount()"],
      correctAnswer: "2",
      messageForCorrectAnswer: "Correct answer. Good job.",
      messageForIncorrectAnswer: "Incorrect answer. Please try again."
    }
  ]
};
