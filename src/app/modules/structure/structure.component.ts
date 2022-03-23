import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Societe} from "../../core/models/societe.types";

@Component({
  selector: 'structure',
  templateUrl: './structure.component.html',
  styleUrls: ['./structure.component.scss']
})
export class StructureComponent implements OnInit, OnDestroy {

  societeForm: FormGroup;
  societe: Societe = null;

  constructor() {
  }

  ngOnInit(): void {
    this.societeForm = new FormGroup({
      uuid: new FormControl({value: this.societe?.uuid, disabled: true}),
      permalink: new FormControl(this.societe?.permalink, [Validators.required]),
      nom: new FormControl(this.societe?.nom, [Validators.required]),
      adresse: new FormControl(this.societe?.adresse, [Validators.required]),
      ville: new FormControl(this.societe?.ville, [Validators.required]),
      code_postal: new FormControl(this.societe?.code_postal, [Validators.required]),
      autocomplete: new FormControl(""),
      adresse_complement: new FormControl(this.societe?.adresse_complement),
      descr: new FormControl(this.societe?.descr, [Validators.required]),
    });
  }

  ngOnDestroy(): void {
  }
}
