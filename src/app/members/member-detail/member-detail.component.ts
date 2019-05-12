import { Component, OnInit } from "@angular/core";
import { User } from "src/app/_models/user";
import { UserService } from "src/app/_services/user.service";
import { AlertifyService } from "src/app/_services/alertify.service";
import { Route, ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-member-detail",
  templateUrl: "./member-detail.component.html",
  styleUrls: ["./member-detail.component.css"]
})
export class MemberDetailComponent implements OnInit {
  usre: User;

  constructor(
    private userService: UserService,
    private alertify: AlertifyService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.loaduser();
  }

  loaduser() {
    this.userService.getUser(+this.route.snapshot.params["id"]).subscribe(
      (usr: User) => {
        this.usre = usr;
      },
      err => this.alertify.error(err)
    );
  }
}
