import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ClientService } from 'src/app/services/client.service';
import { NgxSpinnerService } from "ngx-spinner";
import { Dimensions, ImageCroppedEvent, ImageTransform } from 'ngx-image-cropper';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-update-profile-page',
  templateUrl: './update-profile-page.component.html',
  styleUrls: ['./update-profile-page.component.scss']
})
export class UpdateProfilePageComponent implements OnInit {
  form: FormGroup | any;
  submitted = false;

  constructor(
    private clientService: ClientService,
    private router: Router,
    private spinnerService: NgxSpinnerService,
    public dialog: MatDialog) { }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogOverview, {
      width: '90%',
      height: '90%',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed. Result', result);
      if (result) {
        this.form.patchValue(
          {
            photo: result
          });
      }
    });
  }

  ngOnInit(): void {
    this.spinnerService.show();
    this.form = new FormGroup({
      // client name 
      name: new FormControl(null, [Validators.required,
      Validators.minLength(2),
      Validators.maxLength(20)]),

      // client middle name 
      middleName: new FormControl(null, [Validators.required,
      Validators.minLength(2),
      Validators.maxLength(20)]),

      // client surname 
      surname: new FormControl(null, [Validators.required,
      Validators.minLength(2),
      Validators.maxLength(20)]),

      // client photo 
      photo: new FormControl(null),

      // client phone 
      phone: new FormControl("+380", [Validators.required,
      Validators.pattern('[0-9+]*'),
      Validators.minLength(13),
      Validators.maxLength(13)]),

      // client email
      email: new FormControl(null, [Validators.required, Validators.email]),
      school: new FormControl(null, Validators.required)
    });

    this.clientService.getClientProfile().subscribe(res => {
      console.log("GET USER INFO: ", res);
      this.form.patchValue(
        {
          ...res,
          phone: res.phoneNumber === null ? "+380" : res.phoneNumber,
          school: res.schoolName
        });
      this.spinnerService.hide();
    },
      err => {
        console.log("ERROR GET USER INFO: ", err);
        this.spinnerService.hide();
      })
  }

  public submit() {
    this.spinnerService.show();
    if (this.form.invalid) {
      return;
    }

    const clientInfo = {
      name: this.form.value.name,
      surname: this.form.value.surname,
      middleName: this.form.value.middleName,
      email: this.form.value.email,
      phoneNumber: this.form.value.phone,
      schoolName: this.form.value.school
    }

    this.clientService.setClientProfile(clientInfo).subscribe(
      res => { console.log("SET USER INFO: ", res) },
      err => { console.log("ERROR SET USER INFO: ", err); });

    this.router.navigate(['/client', 'dashboard']);
    this.spinnerService.hide();
  }
}

@Component({
  selector: 'dialog-overview',
  templateUrl: 'dialog-overview.html',
  styleUrls: ['./update-profile-page.component.scss']
})
export class DialogOverview {

  imageChangedEvent: any = '';
  croppedImage: any = '';
  canvasRotation = 0;
  rotation = 0;
  scale = 1;
  showCropper = false;
  containWithinAspectRatio = false;
  transform: ImageTransform = {};
  isPhotoloaded = false;

  constructor(
    private clientService: ClientService,
    public dialogRef: MatDialogRef<DialogOverview>,
    private spinnerService: NgxSpinnerService) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  setPhoto() {
    this.isPhotoloaded = true;
    this.spinnerService.show();
    if (this.croppedImage) {
      this.clientService.setClientPhoto({ photo: this.croppedImage }).subscribe(
        res => {
          this.spinnerService.hide();
          this.isPhotoloaded = false;
          this.dialogRef.close(res.photo);
        },
        err => {
          console.log("ERROR CHANGE PHOTO: ", err);
          this.isPhotoloaded = false;
          this.spinnerService.hide();
        })
    }
    else {
      console.log("Load failed");
      this.onNoClick();
    }
  }

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
  }

  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
  }

  imageLoaded() {
    this.showCropper = true;
    this.isPhotoloaded = true;
    console.log('Image loaded');
  }

  cropperReady(sourceImageDimensions: Dimensions) {
    console.log('Cropper ready', sourceImageDimensions);
  }

  loadImageFailed() {
    console.log('Load failed');
  }

  rotateLeft() {
    this.canvasRotation--;
    this.flipAfterRotate();
  }

  rotateRight() {
    this.canvasRotation++;
    this.flipAfterRotate();
  }

  private flipAfterRotate() {
    const flippedH = this.transform.flipH;
    const flippedV = this.transform.flipV;
    this.transform = {
      ...this.transform,
      flipH: flippedV,
      flipV: flippedH
    };
  }


  flipHorizontal() {
    this.transform = {
      ...this.transform,
      flipH: !this.transform.flipH
    };
  }

  flipVertical() {
    this.transform = {
      ...this.transform,
      flipV: !this.transform.flipV
    };
  }

  resetImage() {
    this.scale = 1;
    this.rotation = 0;
    this.canvasRotation = 0;
    this.transform = {};
  }

  zoomOut() {
    this.scale -= .1;
    this.transform = {
      ...this.transform,
      scale: this.scale
    };
  }

  zoomIn() {
    this.scale += .1;
    this.transform = {
      ...this.transform,
      scale: this.scale
    };
  }

  toggleContainWithinAspectRatio() {
    this.containWithinAspectRatio = !this.containWithinAspectRatio;
  }

  updateRotation() {
    this.transform = {
      ...this.transform,
      rotate: this.rotation
    };
  }
}