import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {Categorie} from "../../../core/models/categorie.types";

@Component({
  selector: 'sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SignUpComponent implements OnInit, OnDestroy {

  signUpForm: FormGroup;
  showAlert: boolean = false;

  public allCategories: Categorie[] = [
    {categorie: 'A.N. Engineer', id: 1, descr: "description"},
    {categorie: 'Some Other', id: 2, descr: "description"},
    {categorie: 'Prof. Engineering', id: 3, descr: "description"},
  ];

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _formBuilder: FormBuilder,
    private _router: Router
  ) {
  }

  ngOnInit(): void {
    this.signUpForm = this._formBuilder.group({
      permalink: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      categories: ['', Validators.required],
      nom: ['', Validators.required],
      description: ['', [Validators.required, Validators.maxLength(255)]],
    });
  }

  ngOnDestroy(): void {
  }

  signUp(): void {
    if (this.signUpForm.invalid) {
      return;
    }
    this.signUpForm.disable();
    this.showAlert = false;
  }

  onCategorieRemoved(categorie: Categorie): void {
    const categories = this.signUpForm.get('categories').value as Categorie[];
    this.removeFirst(categories, categorie);
    this.signUpForm.get('categories').setValue(categories); // To trigger change detection
  }

  private removeFirst<T>(array: T[], toRemove: T): void {
    const index = array.indexOf(toRemove);
    if (index !== -1) {
      array.splice(index, 1);
    }
  }

}
