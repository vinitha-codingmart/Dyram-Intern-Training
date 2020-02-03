import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { ApiService } from "../_services/api.service";

@Component({
  selector: "app-user-card",
  templateUrl: "./user-card.component.html",
  styleUrls: ["./user-card.component.css"]
})
export class UserCardComponent implements OnInit {
  @Input() name: any;
  @Input() followers: any;

  @Output() followEvent = new EventEmitter<any>();
  @Output() unfollowEvent = new EventEmitter<any>();

  followText = "follow";
  uname = {};
  following = [];

  constructor(private user: ApiService) {}

  toggle() {
    if (this.followText === "follow") {
      this.followText = "unfollow";
      this.following.push(this.name.name);
      this.followEvent.emit(this.following);
    } else {
      this.followText = "follow";
      this.following.pop();
      this.unfollowEvent.emit(this.name.name);
    }
  }

  getUserName() {
    let data = JSON.parse(localStorage.getItem("loggedUser"));
    this.user.getUser(data).subscribe(res => {
      this.uname = res;
      this.name.name === this.uname
        ? this.following.push(...this.name.following)
        : null;
    });
  }

  checkFollowers() {
    this.followers.filter((users, index) => {
      if (this.name.name === users) this.followText = "unfollow";
    });
  }

  ngOnInit() {
    this.getUserName();
    this.checkFollowers();
  }
}
