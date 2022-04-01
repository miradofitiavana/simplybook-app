import {Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup, NgForm, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {Categorie} from "../../../core/models/categorie.types";
import {AuthService} from "../../../core/auth/auth.service";

@Component({
  selector: 'sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SignUpComponent implements OnInit, OnDestroy {

  @ViewChild('signUpNgForm') signUpNgForm: NgForm;
  signUpForm: FormGroup;
  showAlert: boolean = false;

  public allCategories: Categorie[] = [];

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _formBuilder: FormBuilder,
    private _router: Router,
    private _authService: AuthService
  ) {
  }

  ngOnInit(): void {
    let datas = this._activatedRoute.snapshot.data;
    this.allCategories = datas['categories'];

    this.signUpForm = this._formBuilder.group({
      nom_societe: ['', Validators.required],
      categories: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
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

    let formValue = this.signUpForm.value;
    if (formValue?.categories) {
      let formCategories = formValue?.categories;
      let ids_categories = [];
      formCategories.forEach((value: Categorie) => {
        ids_categories.push(value.id);
      });
      formValue.categories = ids_categories;
    }

    this._authService.signUp(this.signUpForm.value)
      .subscribe(
        (response) => {
          this._router.navigateByUrl('/signed-in-redirect')
            .then(r => {

            });
        },
        (response) => {
          this.signUpForm.enable();
          this.signUpNgForm.resetForm();
        }
      );
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
