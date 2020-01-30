import { Component, OnInit } from "@angular/core";
import { ApiService } from "../_services/api.service";

@Component({
  selector: "app-user-list",
  templateUrl: "./user-list.component.html",
  styleUrls: ["./user-list.component.css"]
})
export class UserListComponent implements OnInit {
  constructor(private users: ApiService) {}

  loggedUser = { name: "", validity: false };
  userList = [];

  log() {
    localStorage.removeItem("loggedUser");
    this.loggedUser.name = "";
    this.loggedUser.validity = false;
  }

  getUsers() {
    this.users.getUsers().subscribe(res => {
      this.userList.push(...res);
    });
  }

  ngOnInit() {
    let data = JSON.parse(localStorage.getItem("loggedUser"));
    if (data != null) {
      this.loggedUser.name = data.name;
      this.loggedUser.validity = data.validity;
      this.getUsers();
    }
  }
}
