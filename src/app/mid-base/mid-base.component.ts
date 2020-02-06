import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-mid-base",
  templateUrl: "./mid-base.component.html",
  styleUrls: ["./mid-base.component.css"]
})
export class MidBaseComponent implements OnInit {
  constructor() {}

  date: any;
  day: any;

  checkDay(day) {
    if (day === 1) return "Mo";
    if (day === 2) return "Tu";
    if (day === 3) return "We";
    if (day === 4) return "Th";
    if (day === 5) return "Fr";
    if (day === 6) return "Sa";
    if (day === 7) return "Su";
  }

  handleClick(event) {
    let x = {
      div: document.getElementsByClassName("calendar-items"),
      spec: event.srcElement
    };

    if (x.spec.style.border === "2px solid transparent") {
      x.spec.setAttribute(
        "style",
        "border: 2px solid orange;background: orange;color: white;border-radius: 25px;"
      );
    } else {
      x.spec.setAttribute(
        "style",
        "border: 2px solid transparent;background: none;color: black;border-radius: 25px;"
      );
    }
  }

  displayDate() {
    let date: Date = new Date();
    this.date = date.getDate();
    this.day = date.getDay();
  }

  ngOnInit() {
    this.displayDate();
  }
}
