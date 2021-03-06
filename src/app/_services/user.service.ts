import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { User } from "../_models/user";

// const httpOptions = {
//   headers: new HttpHeaders({
//     Authorization: "Bearer " + localStorage.getItem("token")
//   })
// };

@Injectable({
  providedIn: "root"
})
export class UserService {
  baseurl = environment.apiurl;
  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.baseurl + "users");
  }
  getUser(id): Observable<User> {
    return this.http.get<User>(this.baseurl + "users/" + id);
  }

  updateUser(id: number, user: User) {
    return this.http.put(this.baseurl + "users/" + id, user);
  }

 setMainPhoto(userId: number, photoId: Number) {
   return this.http.post(this.baseurl + "users/" + userId + "/photos/" + photoId + "/setMain", {});
 }
 deletePhoto(userId: Number, photoId: Number) {
   return this.http.delete(this.baseurl + "users/" +userId + "/photos/" + photoId);
 }

}
