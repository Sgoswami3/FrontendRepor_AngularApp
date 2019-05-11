import { Component, OnInit } from "@angular/core";
import { User } from "../_models/user";
import { UserService } from "../_services/user.service";
import { AlertifyService } from "../_services/alertify.service";

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
    private alertyservice: AlertifyService
  ) {}

  ngOnInit() {
    this.loadUsers();
    // this.loaduser(2);
  }

  loadUsers() {
    this.userService.getUsers().subscribe(
      (users: User[]) => {
        this.users = users;
      },
      err => {
        this.alertyservice.error(err);
      }
    );
  }

  loaduser(id) {
    this.userService.getUser(id).subscribe((usr: User) => {
      this.singleuser = usr;
      console.log(this.singleuser);
    });
  }
}
