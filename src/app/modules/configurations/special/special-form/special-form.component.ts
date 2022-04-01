import {Component, Inject, OnInit, ViewEncapsulation} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {SpecialService} from "../special.service";
import {SettingsSpecial} from "../../../../core/models/settings-special.types";

@Component({
  selector: 'special-form',
  templateUrl: './special-form.component.html',
  styleUrls: ['./special-form.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SpecialFormComponent implements OnInit {

  title: string;
  uuid: string;
  formSpecial: FormGroup;
  types: Array<any> = [
    {value: 'ouverture', viewValue: 'Ouverture'},
    {value: 'fermeture', viewValue: 'Fermeture'}
  ];
  statuts: Array<any> = [
    {value: 'active', viewValue: 'Actif'},
    {value: 'inactive', viewValue: 'Inactif'},
    {value: 'draft', viewValue: 'Brouillon'}
  ];

  constructor(
    public matDialogRef: MatDialogRef<SpecialFormComponent>,
    @Inject(MAT_DIALOG_DATA) private _data: any,
    private _specialService: SpecialService
  ) {
    this.uuid = _data.uuid;
    this.title = _data.action && _data.action == 'add' ? "Nouvelle journée spéciale" : "Modification d'une journée spéciale";
  }

  ngOnInit(): void {
    this.formSpecial = new FormGroup({
      type: new FormControl(null, Validators.required),
      dateFrom: new FormControl('', Validators.required),
      dateTo: new FormControl('', Validators.required),
      statut: new FormControl(null, Validators.required)
    });
  }

  closeDialog(datas: SettingsSpecial[] = []): void {
    this.matDialogRef.close([datas]);
  }

  saveSpecialDay(): void {
    if (this.formSpecial.invalid) {
      return;
    }
    this.formSpecial.disable();

    let formData = this.formSpecial.value;
    formData.dateFrom = formData.dateFrom.valueOf();
    formData.dateTo = formData.dateTo.valueOf();
    formData.uuid = this.uuid;

    this._specialService.insertHoraires(this.formSpecial.value)
      .subscribe(
        (value) => {
          this.closeDialog(value.datas);
        },
        (err) => {
          console.log(err);
        },
        () => {
          this.formSpecial.enable();
        }
      );
  }
}
