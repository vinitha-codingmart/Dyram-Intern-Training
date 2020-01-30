import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { ApiService } from "../_services/api.service";

@Component({
  selector: "app-signup",
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.css"]
})
export class SignupComponent implements OnInit {
  constructor(private user: ApiService) {}

  profileForm = new FormGroup({
    name: new FormControl(""),
    password: new FormControl(""),
    cpassword: new FormControl("")
  });
  users = [];

  addUser() {
    this.user.addUser(this.profileForm.value).subscribe(() => {});
  }

  onSubmit() {
    // TODO: Use EventEmitter with form value
    if (this.profileForm.value.password === this.profileForm.value.cpassword) {
      this.addUser();
    } else alert("Invalid Login Credentials");
  }

  ngOnInit() {
    let data = JSON.parse(localStorage.getItem("users"));
    if (data != null) this.users = data;
  }
}
