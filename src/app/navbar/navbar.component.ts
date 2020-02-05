import { Component, OnInit, HostListener } from "@angular/core";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.css"]
})
export class NavbarComponent implements OnInit {
  constructor() {}

  @HostListener("window:scroll", ["$event"]) // for window scroll events
  onScroll(event) {
    let x = {
      element: document.getElementById("navz"),
      links: document.getElementsByClassName("navbar-links"),
      logo: document.getElementById("logo")
    };
    let dist = x.element.offsetTop;
    if (dist < 5) {
      x.element.style.background = "none";
      for (let i = 0; i < x.links.length; i++) {
        x.links[i].setAttribute("style", "color:white");
      }
      x.logo.style.filter = "invert(0%)";
    }
    if (dist > 5) {
      x.element.style.background = "white";
      for (let i = 0; i < x.links.length; i++) {
        x.links[i].setAttribute("style", "color:black");
      }
      x.logo.style.filter = "invert(100%)";
    }
  }

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
