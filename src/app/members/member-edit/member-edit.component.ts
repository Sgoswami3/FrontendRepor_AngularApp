import { Component, OnInit, ViewChild, HostListener } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { User } from "src/app/_models/user";
import { AlertifyService } from "src/app/_services/alertify.service";
import { NgForm } from "@angular/forms";
import { UserService } from "src/app/_services/user.service";
import { AuthService } from "src/app/_services/auth.service";

@Component({
  selector: "app-member-edit",
  templateUrl: "./member-edit.component.html",
  styleUrls: ["./member-edit.component.css"]
})
export class MemberEditComponent implements OnInit {
  user: User;
  photoUrl: string;

  @ViewChild("editForm") editForm: NgForm;

  @HostListener("window:beforeunload", ["$event"])
  unloadNotification($event: any) {
    if (this.editForm.dirty) {
      $event.returnValue = true;
    }
  }

  constructor(
    private route: ActivatedRoute,
    private alretify: AlertifyService,
    private userservice: UserService,
    private authservice: AuthService
  ) {}

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.user = data["user"];
    });
    this.authservice.currentPhotoUrl.subscribe(photo => this.photoUrl = photo);
  }
  updateUser() {
    this.userservice
      .updateUser(this.authservice.decodedToken.nameid, this.user)
      .subscribe(
        next => {
          this.alretify.success("Profile update successfully");
          this.editForm.reset(this.user);
        },
        error => this.alretify.error(error)
      );
  }

  updateMainPhoto(photourl) {
    this.user.photourl = photourl;
  }
}
