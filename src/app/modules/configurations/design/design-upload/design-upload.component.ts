import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {MatDialogRef} from "@angular/material/dialog";
import {UtilsService} from "../../../../shared/utils.service";

@Component({
  selector: 'design-upload',
  templateUrl: 'design-upload.component.html',
  styleUrls: ['./design-upload.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class DesignUploadComponent implements OnInit {
  title: any;
  designUpload: FormGroup;
  selectedFile: File;
  imageSelected: any = "/assets/img/image-upload.svg";

  constructor(
    public matDialogRef: MatDialogRef<DesignUploadComponent>,
    private _utilsService: UtilsService
  ) {
  }

  ngOnInit() {
    this.designUpload = new FormGroup({
      image: new FormControl()
    });
  }


  closeDialog() {
    this.matDialogRef.close([]);
  }

  saveUpload() {
    this.matDialogRef.close([this.selectedFile]);
  }

  onFileChanged(event) {
    this.selectedFile = event.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(this.selectedFile);
    reader.onloadend = () => {
      this.imageSelected = this._utilsService.getSafeUrl(reader.result);
    };
    // this.fileName = this.fileReupload.name;
    console.log(this.selectedFile);
  }

  onUpload() {

  }
}
