import {Component, Inject, OnInit, ViewEncapsulation} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
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

  type: string = '';

  constructor(
    public matDialogRef: MatDialogRef<DesignUploadComponent>,
    private _utilsService: UtilsService,
    @Inject(MAT_DIALOG_DATA) private _data: any,
  ) {
    this.type = _data.typeDialog;
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
  }

  onUpload() {

  }
}
