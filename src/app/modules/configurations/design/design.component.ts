import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {MatDialog} from "@angular/material/dialog";
import {DesignUploadComponent} from "./design-upload/design-upload.component";
import {UtilsService} from "../../../shared/utils.service";
import {Subject, takeUntil} from "rxjs";
import {DesignService} from "./design.service";
import {ActivatedRoute} from "@angular/router";
import {HttpEventType} from "@angular/common/http";
import {SettingsDesign} from "../../../core/models/settings-design.type";
import {NORMAL} from "../../../core/config/api.config";

@Component({
  selector: 'settings-design',
  templateUrl: 'design.component.html'
})

export class DesignComponent implements OnInit, OnDestroy {
  choices = [
    {
      value: 'v1',
      valueDisplay: 'v1',
      image: 'https://ramira.secure.simplybook.it/v2/images/admin/themes/preview-image/inspiration/1.png'
    },
    {
      value: 'v2',
      valueDisplay: 'v2',
      image: 'https://ramira.secure.simplybook.it/v2/images/admin/themes/preview-image/air/1.png'
    }
  ];

  designForm: FormGroup;
  saving: boolean = false;
  logoSelected: any = "/assets/img/image-placeholder.svg";
  progress = 0;

  design: SettingsDesign = null;

  private _unsubscribeAll: Subject<any>;
  private uuid: string = "";

  constructor(
    private _route: ActivatedRoute,
    public _dialog: MatDialog,
    private _utilsService: UtilsService,
    private _designService: DesignService
  ) {
    this._unsubscribeAll = new Subject<any>();
  }

  ngOnInit() {
    this.uuid = this._route.snapshot.params['uuid'];
    this._designService.getDesign(this.uuid)
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(
        value => {
          this.design = value;
          this.initForm();
          this.logoSelected = this.design?.logo_url ? `${NORMAL}/storage/${this.design?.logo_url}` : this.logoSelected;
        },
        error => {
        },
        () => {
        }
      );
  }

  initForm(): void {
    this.designForm = new FormGroup({
      'design_version': new FormControl(this.design.design_version),
      'logo': new FormControl(null),
    });
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }

  saveDesignWeek(): void {
    const formData = new FormData();
    formData.append("design_version", `${this.designForm.get('design_version').value}`);
    formData.append("uuid", this.uuid);
    if (this.designForm.get('logo').value) formData.append("logo", this.designForm.get('logo').value, this.designForm.get('logo').value.name);

    let headers = new Headers();
    headers.append('Content-Type', 'image/png');
    headers.append('Accept', 'application/json');

    this._designService.updateDesign(this.uuid, formData, headers)
      .subscribe(event => {
        if (event.type === HttpEventType.UploadProgress) {
          this.progress = Math.round((100 * event.loaded) / event.total);
          console.log(this.progress);
        }
        if (event.type === HttpEventType.Response) {
          console.log(event.body);
          // this.signup.reset();
        }
      });
  }

  uploadImage(): void {
    const dialogRef = this._dialog.open(DesignUploadComponent, {
      data: {
        // action: 'add',
        // uuid: this._route.snapshot.params['uuid']
      },
      disableClose: true
    });

    dialogRef.afterClosed()
      .subscribe(result => {
        if (result) {
          console.log(result);
          this.designForm.get('logo').setValue(result[0]);
          let reader = new FileReader();
          reader.readAsDataURL(result[0]);
          reader.onloadend = () => {
            this.logoSelected = this._utilsService.getSafeUrl(reader.result);
          };
        }
      });
  }
}
