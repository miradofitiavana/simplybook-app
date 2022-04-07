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
      image: '/assets/img/design-v1.png'
    },
    {
      value: 'v2',
      valueDisplay: 'v2',
      image: '/assets/img/design-v2.png'
    }
  ];

  design: SettingsDesign = null;
  designForm: FormGroup;
  saving: boolean = false;
  progress = 0;

  logoSelected: any = "/assets/img/image-placeholder.svg";
  bannerSelected: any = "/assets/img/image-placeholder.svg";

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
          this.bannerSelected = this.design?.banner_url ? `${NORMAL}/storage/${this.design?.banner_url}` : this.bannerSelected;
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
      'logo_url': new FormControl(null),
      'logo_preference': new FormControl(this.design.logo_preference ? this.design.logo_preference : 'image'),
      'banner_url': new FormControl(null),
    });
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }

  saveDesignWeek(): void {
    let formData = new FormData();
    formData.append("design_version", `${this.designForm.get('design_version').value}`);
    formData.append("uuid", this.uuid);
    if (this.designForm.get('logo_url').value) formData.append("logo_url", this.designForm.get('logo_url').value, this.designForm.get('logo_url').value.name);
    formData.append("logo_preference", `${this.designForm.get('logo_preference').value}`);
    if (this.designForm.get('banner_url').value) formData.append("banner_url", this.designForm.get('banner_url').value, this.designForm.get('banner_url').value.name);

    let headers = new Headers();
    headers.append('Content-Type', 'image/png');
    headers.append('Accept', 'application/json');

    this.saving = true;

    this._designService.updateDesign(this.uuid, formData, headers)
      .subscribe(event => {
        if (event.type === HttpEventType.UploadProgress) {
          this.progress = Math.round((100 * event.loaded) / event.total);
        }
        if (event.type === HttpEventType.Response) {
          // console.log(event.body); // this.signup.reset();
          this.saving = false;
        }
      });
  }

  uploadImage(type: string): void {
    const dialogRef = this._dialog.open(DesignUploadComponent, {
      data: {
        typeDialog: type
      },
      disableClose: true
    });

    dialogRef.afterClosed()
      .subscribe(result => {
        if (result && result.length > 0) {
          this.designForm.get(type).setValue(result[0]);
          let reader = new FileReader();
          reader.readAsDataURL(result[0]);
          reader.onloadend = () => {
            if (type == 'logo_url') {
              this.logoSelected = this._utilsService.getSafeUrl(reader.result);
            }
            if (type == 'banner_url') {
              this.bannerSelected = this._utilsService.getSafeUrl(reader.result);
            }
          };
        }
      });
  }
}
