import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-ice",
  templateUrl: "./ice.component.html",
  styleUrls: ["./ice.component.css"]
})
export class IceComponent implements OnInit {
  constructor() {}

  flavor1_percent = 64;
  flavor2_percent = 72;
  flavor3_percent = 24;

  ngOnInit() {}
}
