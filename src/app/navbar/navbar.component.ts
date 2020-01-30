import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.css"]
})
export class NavbarComponent implements OnInit {
  constructor() {}
  loggedUser = { name: "", validity: false };
  log() {
    localStorage.removeItem("loggedUser");
    this.loggedUser.name = "";
    this.loggedUser.validity = false;
  }
  ngOnInit() {
    let data = JSON.parse(localStorage.getItem("loggedUser"));
    if (data != null) {
      this.loggedUser.name = data.name;
      this.loggedUser.validity = data.validity;
    }
  }
}
