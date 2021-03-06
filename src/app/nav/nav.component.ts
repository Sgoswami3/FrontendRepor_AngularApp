import { Component, OnInit } from "@angular/core";
import { AuthService } from "../_services/auth.service";
import { AlertifyService } from "../_services/alertify.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-nav",
  templateUrl: "./nav.component.html",
  styleUrls: ["./nav.component.css"]
})
export class NavComponent implements OnInit {
  model: any = {};
  photoUrl: string;

  constructor(
    public authservice: AuthService,
    private alertify: AlertifyService,
    private router: Router
  ) {}

  ngOnInit() {
    this.authservice.currentPhotoUrl.subscribe(photourl => this.photoUrl = photourl );
  }

  login() {
    this.authservice.login(this.model).subscribe(
      next => {
        // console.log("logged in successfully");
        this.alertify.success("logged in successfully");
      },
      err => {
        // console.error(err);
        this.alertify.error(err);
      },
      () => {
        this.router.navigate(["/members"]);
      }
    );
  }

  loggedIn() {
    return this.authservice.loggedIn();
  }

  logOut() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    this.authservice.decodedToken = null;
    this.authservice.currentuser = null;
    // console.log("logged out");
    this.alertify.message("Logged out");
    this.router.navigate(["/home"]);
  }
}
