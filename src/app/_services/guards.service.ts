import { Injectable } from "@angular/core";
import { CanActivate } from "@angular/router";

@Injectable({
  providedIn: "root"
})
export class GuardsService implements CanActivate {
  constructor() {}

  canActivate() {
    let data = JSON.parse(localStorage.getItem("loggedUser"));
    if (data != null) {
      if (data.validity) return true;
      else {
        window.location.href = "/";
        return false;
      }
    } else {
      window.location.href = "/";
      return false;
    }
  }
}
