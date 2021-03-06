import { Component, OnInit } from "@angular/core";
import { User } from "../../_models/user";
import { UserService } from "../../_services/user.service";
import { AlertifyService } from "../../_services/alertify.service";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-memberlist",
  templateUrl: "./memberlist.component.html",
  styleUrls: ["./memberlist.component.css"]
})
export class MemberlistComponent implements OnInit {
  users: User[];
  singleuser: User;

  constructor(
    private userService: UserService,
    private alertyservice: AlertifyService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    // this.loadUsers();
    // this.loaduser(2);
    return this.route.data.subscribe(data => {
      this.users = data["users"];
    });
  }
}
