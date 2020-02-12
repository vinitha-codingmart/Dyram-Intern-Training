import React, { Component } from "react";
import Axios from "axios";
import "../assets/styles/list.css";
import ListNavbar from "./ListNavbar";

export class List extends Component {
  state = {
    videos: []
  };

  componentDidMount() {
    Axios.post("http://localhost:3031/getList").then(res => {
      this.setState({ videos: res.data });
    });
  }

  render() {
    return (
      <div>
        <ListNavbar
          paths={[
            { name: "Go Live", url: "http://localhost:3002/" },
            { name: "Record", url: "record" },
            { name: "Logout", url: "/" }
          ]}
        />
        <div className="list-div">
          <div className="title-div">
            <h2 className="title">
              <hr />
              Videos
              <hr />
            </h2>
          </div>
          <div className="video-container">
            {this.state.videos.map((video, index) => (
              <div className="video-div" key={index}>
                <video width="320" height="240" controls>
                  <source src={"/videos/" + video.name} type="video/webm" />
                </video>
                <h4>
                  <em>{video.name}</em>
                </h4>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default List;
