import {
  Resolve,
  ActivatedRoute,
  Router,
  ActivatedRouteSnapshot
} from "@angular/router";

import { Injectable } from "@angular/core";
import { User } from "../_models/user";
import { UserService } from "../_services/user.service";
import { AlertifyService } from "../_services/alertify.service";
import { Observable, of } from "rxjs";
import { catchError } from "rxjs/operators";
import { AuthService } from "../_services/auth.service";

@Injectable()
export class MemberDetailResolver implements Resolve<User> {
  constructor(
    private userService: UserService,
    private router: Router,
    private alertify: AlertifyService
  ) {}

  resolve(route: ActivatedRouteSnapshot): Observable<User> {
    return this.userService.getUser(route.params["id"]).pipe(
      catchError(error => {
        this.alertify.error("Problem retriving data");
        this.router.navigate(["/members"]);
        return of(null);
      })
    );
  }
}

@Injectable()
export class MemberListResolver implements Resolve<User[]> {
  constructor(
    private userService: UserService,
    private router: Router,
    private alertify: AlertifyService
  ) {}

  resolve(route: ActivatedRouteSnapshot): Observable<User[]> {
    return this.userService.getUsers().pipe(
      catchError(err => {
        this.alertify.error("error retriving list of users");
        this.router.navigate(["/home"]);
        return of(null);
      })
    );
  }
}

@Injectable()
export class MemberEditResolver implements Resolve<User> {
  constructor(
    private userService: UserService,
    private alertify: AlertifyService,
    private route: Router,
    private authservice: AuthService
  ) {}
  resolve(route: ActivatedRouteSnapshot): Observable<User> {
    return this.userService.getUser(this.authservice.decodedToken.nameid).pipe(
      catchError(error => {
        this.alertify.error(error);
        this.route.navigate(["/members"]);
        return of(null);
      })
    );
  }
}
