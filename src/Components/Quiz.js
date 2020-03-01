import React, { Component } from "react";
import Quizs from "reactjs-quiz";
import Axios from "axios";

//quiz questions
// import { quiz } from "../Quiz/quizQuestions";
import "../Styles/quiz.css";
import { Link } from "react-router-dom";

export class Quiz extends Component {
  state = {
    quizQuestions: {
      quizTitle: "Pop Quiz",
      quizSynopsis: `Welcome to your pop quiz on ReactJs. There are 5 questions in total. Each correct answer earns you 1 mark. There is no negative marking`,
      questions: []
    },
    answers: []
  };

  componentDidMount() {
    this.getQuestions();
  }

  getQuestions = () => {
    Axios.post("http://localhost:3031/getQuestions").then(res => {
      res.data.map((maps, index) => {
        let answerArr = [];
        if (maps.option1) answerArr.push(maps.option1);
        if (maps.option2) answerArr.push(maps.option2);
        if (maps.option3) answerArr.push(maps.option3);
        if (maps.option4) answerArr.push(maps.option4);
        let obj = {
          question: maps.question,
          questionType: maps.questionType,
          answers: answerArr,
          correctAnswer: maps.correctAnswer,
          messageForCorrectAnswer: maps.messageForCorrectAnswer,
          messageForIncorrectAnswer: maps.messageForIncorrectAnswer
        };
        this.state.quizQuestions.questions.push(obj);
        return "success";
      });
    });
  };

  result = e => {
    let score = e;
    let data = JSON.parse(localStorage.getItem("userToken"));
    Axios.post("http://localhost:3031/quizSubmit", { score, data }).then(
      res => {
        console.log("Score submitted");
      }
    );
  };

  logout = () => {
    console.log("Logout");
    localStorage.removeItem("userToken");
  };

  render() {
    return (
      <div>
        <div className="logo-div">
          <img
            className="react-logo"
            src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9Ii0xMS41IC0xMC4yMzE3NCAyMyAyMC40NjM0OCI+CiAgPHRpdGxlPlJlYWN0IExvZ288L3RpdGxlPgogIDxjaXJjbGUgY3g9IjAiIGN5PSIwIiByPSIyLjA1IiBmaWxsPSIjNjFkYWZiIi8+CiAgPGcgc3Ryb2tlPSIjNjFkYWZiIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiPgogICAgPGVsbGlwc2Ugcng9IjExIiByeT0iNC4yIi8+CiAgICA8ZWxsaXBzZSByeD0iMTEiIHJ5PSI0LjIiIHRyYW5zZm9ybT0icm90YXRlKDYwKSIvPgogICAgPGVsbGlwc2Ugcng9IjExIiByeT0iNC4yIiB0cmFuc2Zvcm09InJvdGF0ZSgxMjApIi8+CiAgPC9nPgo8L3N2Zz4K"
            alt="react-logo"
          />
          <h4>ReactJS</h4> <span className="quiz-span">quiz</span>
        </div>
        <Link to="/" onClick={this.logout} className="links">
          Logout
        </Link>
        <Quizs
          quiz={this.state.quizQuestions}
          shuffle={true}
          onComplete={e => this.result(e)}
        />
      </div>
    );
  }
}

export default Quiz;
