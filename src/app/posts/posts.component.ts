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
    this.post.addPost(this.profileForm.value).subscribe(() => {
      alert("Post added successfully");
      this.toggleModal();
      this.getPost();
    });
  }

  getPost() {
    this.post.getPost().subscribe(res => {
      this.posts.push(...res);
    });
  }

  ngOnInit() {
    let data = JSON.parse(localStorage.getItem("loggedUser"));
    if (data != null) {
      this.loggedUser.name = data.name;
      this.loggedUser.validity = data.validity;
      this.getPost();
    }
  }
}
