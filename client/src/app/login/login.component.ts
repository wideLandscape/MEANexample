import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { RootStoreState, AuthSelectors, AuthActions } from '../root-store/';
import { Employee } from '../_models/employee';

@Component({ templateUrl: 'login.component.html' })
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  submitted = false;

  loginItem$: Observable<Employee>;
  isLoading$: Observable<boolean>;

  // convenience getter for easy access to form fields
  get formControls() {
    return this.loginForm.controls;
  }

  constructor(
    private formBuilder: FormBuilder,
    private store$: Store<RootStoreState.State>
  ) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    this.isLoading$ = this.store$.select(AuthSelectors.selectAuthIsLoading);
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

    this.store$.dispatch(AuthActions.authRequest(payload));
  }
}
