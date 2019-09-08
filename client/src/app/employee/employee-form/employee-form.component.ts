import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { EmployeesService } from '../../_services/employees.service';
import { Employee } from 'src/app/_models/Employee';

export interface SavedEmployee {
  employee: Employee;
  new: boolean;
}

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
  id = '';
  @Output()
  success: EventEmitter<SavedEmployee> = new EventEmitter<SavedEmployee>();
  @Output()
  error: EventEmitter<any> = new EventEmitter<any>();
  @Input('employee')
  set editableEmployee(employee: Employee) {
    if (this.registerForm) {
      this.submitted = false;
      employee ? this.setEditEmployeeForm(employee) : this.setNewEmployeeForm();
    }
  }

  setNewEmployeeForm() {
    this.registerForm.reset();
    this.label = 'Save';
    this.id = '';
  }
  setEditEmployeeForm(employee: Employee) {
    this.registerForm.patchValue(employee);
    this.label = 'Update';
    this.id = employee._id;
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
    this.saveForm()
      .pipe(first())
      .subscribe(
        data => {
          this.loading = false;
          this.submitted = false;
          this.registerForm.reset();
          this.success.emit({
            employee: data as Employee,
            new: this.id === ''
          });
        },
        error => {
          this.loading = false;
          this.error.emit(error);
        }
      );
  }
  private saveForm() {
    return this.id.length > 0
      ? this.employeesService.update(this.registerForm.value, this.id)
      : this.employeesService.add(this.registerForm.value);
  }
}
