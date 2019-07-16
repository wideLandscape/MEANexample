import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { EmployeesService } from '../../_services/employees.service';
// import { AlertService } from '../../_services/authentication.service';
@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.sass']
})
export class EmployeeFormComponent implements OnInit {
  registerForm: FormGroup;
  loading = false;
  submitted = false;
  // convenience getter for easy access to form fields
  get formControls() {
    return this.registerForm.controls;
  }

  constructor(
    private formBuilder: FormBuilder,
    //  private alertService: AlertService,
    private employeesService: EmployeesService
  ) {}

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      isAdmin: []
    });
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }

    this.loading = true;
    this.employeesService
      .add(this.registerForm.value)
      .pipe(first())
      .subscribe(
        data => {
          //   this.alertService.success('Registration successful', true);
          this.loading = false;
          this.registerForm.reset();
        },
        error => {
          //       this.alertService.error(error);
          this.loading = false;
        }
      );
  }
}
