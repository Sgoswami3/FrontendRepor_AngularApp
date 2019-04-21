import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { AuthService } from "../_services/auth.service";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"]
})
export class RegisterComponent implements OnInit {
  @Input()
  valuesFromeHome: any;
  @Output()
  cancelRegister = new EventEmitter();

  model: any = {};

  constructor(private authService: AuthService) {}

  ngOnInit() {}

  register() {
    this.authService.register(this.model).subscribe(
      () => {
        console.log("registration successfull");
      },
      err => console.error(err)
    );
  }

  cancel() {
    console.log("cancled");
    this.cancelRegister.emit(false);
  }
}
