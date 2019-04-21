import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: "app-Home",
  templateUrl: "./Home.component.html",
  styleUrls: ["./Home.component.css"]
})
export class HomeComponent implements OnInit {
  registerMode = false;
  values: any;
  constructor(private http: HttpClient) {}

  ngOnInit() {}

  registerToggel() {
    this.registerMode = true;
  }

  cancelRegisterMode(cancel: boolean) {
    this.registerMode = cancel;
  }
}
