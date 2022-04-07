import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../../../core/auth/auth.service";

@Component({
  selector: 'sign-in',
  templateUrl: './sign-in.component.html',
  encapsulation: ViewEncapsulation.None
})
export class SignInComponent implements OnInit {

  signInForm: FormGroup;
  showAlert: boolean = false;

  pass: boolean = false;

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _formBuilder: FormBuilder,
    private _router: Router,
    private _authService: AuthService
  ) {
  }

  clickEvent() {
    this.pass = !this.pass;
  }

  ngOnInit(): void {
    this.signInForm = this._formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  signIn(): void {
    // Return if the form is invalid
    if (this.signInForm.invalid) {
      return;
    }

    // Disable the form
    this.signInForm.disable();

    // Hide the alert
    this.showAlert = false;

    // Sign in
    this._authService.signIn(this.signInForm.value)
      .subscribe(
        () => {
          const redirectURL = this._activatedRoute.snapshot.queryParamMap.get('redirectURL') || '/signed-in-redirect';
          this._router.navigateByUrl(redirectURL);
        },
        (response) => {
          this.signInForm.enable();

          // Reset the form
          // this.signInNgForm.resetForm();

          // Set the alert
          // this.alert = {
          //   type: 'error',
          //   message: response.error.message
          // };

          // Show the alert
          this.showAlert = true;
        }
      );
  }

}
