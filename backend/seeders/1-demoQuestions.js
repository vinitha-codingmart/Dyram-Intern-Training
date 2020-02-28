"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "QuestionsTables",
      [
        {
          question:
            "How can you access the state of a component from inside of a member function?",
          questionType: "text",

          option1: "this.getState()",
          option2: "this.prototype.stateValue",
          option3: "this.state",
          option4: "this.values",
          correctAnswer: "3",
          messageForCorrectAnswer: "Correct answer. Good job.",
          messageForIncorrectAnswer: "Incorrect answer. Please try again.",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          question: "ReactJS is developed by _____?",
          questionType: "text",
          option1: "Google Engineers",
          option2: "Facebook Engineers",
          correctAnswer: "2",
          messageForCorrectAnswer: "Correct answer. Good job.",
          messageForIncorrectAnswer: "Incorrect answer. Please try again.",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          question: "ReactJS is an MVC based framework?",
          questionType: "text",
          option1: "True",
          option2: "False",
          correctAnswer: "2",
          messageForCorrectAnswer: "Correct answer. Good job.",
          messageForIncorrectAnswer: "Incorrect answer. Please try again.",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          question: "Which of the following concepts is/are key to ReactJS?",
          questionType: "text",
          option1: "Component-oriented design",
          option2: "Event delegation model",
          option3: "Both of the above",
          correctAnswer: "3",
          messageForCorrectAnswer: "Correct answer. Good job.",
          messageForIncorrectAnswer: "Incorrect answer. Please try again.",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          question:
            "What function allows you to render React content in an HTML page?",
          questionType: "text",
          option1: "ReactDOM.start()",
          option2: "React.render()",
          option3: "React.mount()",
          correctAnswer: "2",
          messageForCorrectAnswer: "Correct answer. Good job.",
          messageForIncorrectAnswer: "Incorrect answer. Please try again.",
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("QuestionsTables", null, {});
  }
};
