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
  followers = [];
  uname: any = {};

  followerEventHander = ($event: any) => {
    this.followers.push(...$event);
    this.users.addFollower({ followers: this.followers }).subscribe(res => {});
  };

  unfollowerEventHander = ($event: any) => {
    let index = this.followers.indexOf($event);
    this.followers.splice(index, 1);
    this.users.addFollower({ followers: this.followers }).subscribe(res => {});
  };

  log() {
    localStorage.removeItem("loggedUser");
    this.loggedUser.name = "";
    this.loggedUser.validity = false;
  }

  getFollowers() {
    this.userList.filter(user => {
      if (user.name === this.uname.name) {
        this.followers.push(...user.following);
      }
    });
  }

  getUsers() {
    this.users.getUsers().subscribe(res => {
      this.userList.push(...res);
      this.getFollowers();
    });
  }

  getUserName() {
    let data = JSON.parse(localStorage.getItem("loggedUser"));
    this.users.getUser(data).subscribe(res => {
      this.uname = res;
    });
  }

  ngOnInit() {
    let data = JSON.parse(localStorage.getItem("loggedUser"));
    if (data != null) {
      this.loggedUser.name = data.name;
      this.loggedUser.validity = data.validity;
      this.getUserName();
      this.getUsers();
    }
  }
}
