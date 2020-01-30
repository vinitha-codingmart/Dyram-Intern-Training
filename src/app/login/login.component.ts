import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { ApiService } from "../_services/api.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  constructor(private user: ApiService) {}

  profileForm = new FormGroup({
    name: new FormControl(""),
    password: new FormControl("")
  });

  users = [];

  loginUser() {
    this.user.loginUser(this.profileForm.value).subscribe(res => {
      if (res != null) {
        localStorage.setItem("loggedUser", JSON.stringify(res));
        window.location.href = "/";
      }
      if (res === null) alert("Invalid Login Credentials");
    });
  } 

  ngOnInit() {
    let data = JSON.parse(localStorage.getItem("users"));
    this.users = data;
  }
}
