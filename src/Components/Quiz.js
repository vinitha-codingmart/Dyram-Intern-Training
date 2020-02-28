import React, { Component } from "react";
import Quizs from "reactjs-quiz";
import Axios from "axios";

//quiz questions
import { quiz } from "../Quiz/quizQuestions";
import "../Styles/quiz.css";
let array2 = [];
export class Quiz extends Component {
  state = {
    quizQuestions: {},
    answers: []
  };

  componentDidMount() {
    this.getQuestions();
  }

  getQuestions = () => {
    Axios.post("http://localhost:3031/getQuestions").then(res => {
      //Stringify questions in the DB
    });
  };

  result = e => {
    let score = e;
    let data = JSON.parse(localStorage.getItem("userToken"));
    Axios.post("http://localhost:3031/quizSubmit", { score, data }).then(
      res => {
        console.log(res.data);
      }
    );
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
        <Quizs quiz={quiz} shuffle={true} onComplete={e => this.result(e)} />
      </div>
    );
  }
}

export default Quiz;
