import {Component, Inject, OnInit, ViewEncapsulation} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'special-form',
  templateUrl: './special-form.component.html',
  styleUrls: ['./special-form.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SpecialFormComponent implements OnInit {

  title: string;
  formSpecial: FormGroup;
  types: Array<any> = [
    {value: 'ouverture', viewValue: 'Ouverture'},
    {value: 'fermeture', viewValue: 'Fermeture'}
  ];

  constructor(
    public matDialogRef: MatDialogRef<SpecialFormComponent>,
    @Inject(MAT_DIALOG_DATA) private _data: any,
  ) {
    this.title = _data.action && _data.action == 'add' ? "Nouvelle journée spéciale" : "Modification d'une journée spéciale";
  }

  ngOnInit(): void {
    this.formSpecial = new FormGroup({
      type: new FormControl(),
      dateFrom: new FormControl(),
      dateTo: new FormControl(),
      statut: new FormControl()
    });
  }

  closeDialog(): void {
    this.matDialogRef.close();
  }
}
