import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { EmployeesService } from '../../_services/employees.service';
import { Employee } from 'src/app/_models/Employee';

type Label = 'Save' | 'Update';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.sass']
})
export class EmployeeFormComponent implements OnInit {
  registerForm: FormGroup;
  loading = false;
  submitted = false;
  label: Label = 'Save';
  @Output()
  success: EventEmitter<Employee> = new EventEmitter<Employee>();
  @Output()
  error: EventEmitter<any> = new EventEmitter<any>();
  @Input('employee')
  set editableEmployee(employee: Employee) {
    if (this.registerForm) {
      employee ? this.setEditEmployeeForm(employee) : this.setNewEmployeeForm();
    }
  }

  setNewEmployeeForm() {
    this.registerForm.reset();
    this.label = 'Save';
  }
  setEditEmployeeForm(employee: Employee) {
    this.registerForm.patchValue(employee);
    this.label = 'Update';
  }
  // convenience getter for easy access to form fields
  get formControls() {
    return this.registerForm.controls;
  }

  constructor(
    private formBuilder: FormBuilder,
    private employeesService: EmployeesService
  ) {}

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      isAdmin: false
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
          this.loading = false;
          this.registerForm.reset();
          this.success.emit(data as Employee);
        },
        error => {
          this.loading = false;
          this.error.emit(error);
        }
      );
  }
}
