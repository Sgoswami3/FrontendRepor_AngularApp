import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { Photo } from "src/app/_models/Photo";
import { FileUploader } from 'ng2-file-upload';
import { environment } from 'src/environments/environment';
import { AuthService } from 'src/app/_services/auth.service';
import { UserService } from 'src/app/_services/user.service';
import { AlertifyService } from 'src/app/_services/alertify.service';


@Component({
  selector: "app-photoeditor",
  templateUrl: "./photoeditor.component.html",
  styleUrls: ["./photoeditor.component.css"]
})
export class PhotoeditorComponent implements OnInit {
  @Input()
  photos: Photo[];
  @Output()
  getMemmberPhotoChnage = new EventEmitter<string>();

  currentMainPhoto: Photo;




   uploader: FileUploader;
   hasBaseDropZoneOver = false;
   baseUrl = environment.apiurl;


  constructor(private authservice:  AuthService, private userservice: UserService, private alertify: AlertifyService) {}

  ngOnInit() {
    this.initializeUploader();
    console.log(this.photos);
  }

  public fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  initializeUploader(){
    this.uploader = new FileUploader({
      url: this.baseUrl + 'users/' + this.authservice.decodedToken.nameid + "/photos",
      authToken: 'Bearer ' + localStorage.getItem('token'),
      isHTML5: true,
      allowedFileType: ['image'],
      removeAfterUpload: true,
      autoUpload: false,
      maxFileSize: 10 * 1024 * 1024
    });

    this.uploader.onAfterAddingFile = (file) => {
      file.withCredentials = false;
    };

    this.uploader.onSuccessItem = (item, res, status, headers) => {
      if (res) {
        const resp: Photo = JSON.parse(res);

        const photo = {
          id: resp.id,
          url: resp.url,
          datesAdded:  resp.datesAdded,
          Description:  resp.Description,
          isMain:  resp.isMain
        };
        this.photos.push(photo);
      }
    };
  }


setMainPhoto(photo:  Photo) {
  this.userservice.setMainPhoto(this.authservice.decodedToken.nameid, photo.id).subscribe(() => {
    this.currentMainPhoto = this.photos.filter(p => p.isMain === true)[0];
    this.currentMainPhoto.isMain = false;
    photo.isMain = true;
    this.authservice.changeMemberPhoto(photo.url);
    this.authservice.currentuser.photourl = photo.url;
    localStorage.setItem("user", JSON.stringify(this.authservice.currentuser));
    // this.getMemmberPhotoChnage.emit(photo.url);
  }, err => this.alertify.error(err));

}

deletePhoto(photoId: number) {
  this.alertify.confirm("Are you sure you want to delete this photo", () => {
    this.userservice.deletePhoto(this.authservice.decodedToken.nameid, photoId).subscribe(() => {
      this.photos.splice(this.photos.findIndex(p => p.id === photoId), 1);
      this.alertify.success("Photo has been deleted");
    }, err => this.alertify.error("failed to delete photos"));
  })
}


}
