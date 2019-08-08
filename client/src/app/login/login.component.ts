import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../_services/authentication.service';
import { Store } from '@ngrx/store';
import {
  RootStoreState,
  LoginStoreSelectors,
  LoginStoreActions
} from '../root-store/';
import { Employee } from '../_models/employee';

@Component({ templateUrl: 'login.component.html' })
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  submitted = false;
  returnUrl: string;

  loginItem$: Observable<Employee>;
  error$: Observable<string>;
  isLoading$: Observable<boolean>;

  // convenience getter for easy access to form fields
  get formControls() {
    return this.loginForm.controls;
  }

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,

    private store$: Store<RootStoreState.State>
  ) {
    // redirect to home if already logged in
    if (this.authenticationService.currentEmployeeValue) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/';

    this.loginItem$ = this.store$.select(LoginStoreSelectors.selectLoginUser);

    this.error$ = this.store$.select(LoginStoreSelectors.selectLoginError);

    this.isLoading$ = this.store$.select(
      LoginStoreSelectors.selectLoginIsLoading
    );
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }
    const payload = {
      userName: this.formControls.username.value,
      password: this.formControls.password.value
    };

    this.store$.dispatch(new LoginStoreActions.LoginRequestAction(payload));
  }
}
