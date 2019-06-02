import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import { JwtHelperService } from "@auth0/angular-jwt";
import { environment } from "src/environments/environment";
import { User } from '../_models/user';

@Injectable({
  providedIn: "root"
})
export class AuthService {
  baseurl = environment.apiurl + "auth/";
  jwthelper = new JwtHelperService();
  decodedToken: any;
  currentuser: User;
  constructor(private http: HttpClient) {}

  login(model: any) {
    return this.http.post(this.baseurl + "login", model).pipe(
      map((res: any) => {
        const user = res;
        if (user) {
          localStorage.setItem("token", user.token);
          localStorage.setItem("user", JSON.stringify(user.user));
          this.decodedToken = this.jwthelper.decodeToken(user.token);
          this.currentuser = user.user;
          console.log(this.decodedToken);
        }
      })
    );
  }

  register(model: any) {
    return this.http.post(this.baseurl + "register", model);
  }

  loggedIn() {
    const token = localStorage.getItem("token");
    return !this.jwthelper.isTokenExpired(token);
  }
}
