import { Component, OnInit } from "@angular/core";
import { ApiService } from "../_services/api.service";
import { FormGroup, FormControl } from "@angular/forms";

@Component({
  selector: "app-posts",
  templateUrl: "./posts.component.html",
  styleUrls: ["./posts.component.css"]
})
export class PostsComponent implements OnInit {
  constructor(private post: ApiService) {}

  profileForm = new FormGroup({
    title: new FormControl(""),
    content: new FormControl("")
  });

  loggedUser = { name: "", validity: false };
  posts = [];
  followers = [];

  uname = { name: {} };

  log() {
    localStorage.removeItem("loggedUser");
    this.loggedUser.name = "";
    this.loggedUser.validity = false;
  }

  toggleModal() {
    let x = document.getElementById("addPostModal");
    console.log(x.style);
    if (x.style.display == "none") x.style.display = "block";
    if (x.style.display == "block") x.style.display = "none";
  }

  addPost() {
    this.post.addPost(this.profileForm.value, this.uname).subscribe(() => {
      alert("Post added successfully");
      this.toggleModal();
      this.getFollowers();
    });
  }

  getFollowers() {
    this.post.getFollowers(this.uname).subscribe(res => {
      this.followers.push(...res);
      this.followers.map((name, index) => {
        this.getPost(name);
      });
    });
  }

  getPost(name) {
    this.post.getPost({ name: name }).subscribe(res => {
      this.posts.push(...res);
    });
  }

  getUserName() {
    let data = JSON.parse(localStorage.getItem("loggedUser"));
    this.post.getUser(data).subscribe(res => {
      this.uname.name = res;
      this.getFollowers();
    });
  }

  ngOnInit() {
    let data = JSON.parse(localStorage.getItem("loggedUser"));
    if (data != null) {
      this.loggedUser.name = data.name;
      this.loggedUser.validity = data.validity;
      this.getUserName();
    }
  }
}
