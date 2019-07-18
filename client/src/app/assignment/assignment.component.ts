import { Component, OnInit } from '@angular/core';
import { AssignmentsService } from '../_services/assignments.service';
import { Review } from '../_models/Review';
import { Router } from '@angular/router';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Employee } from '../_models/Employee';
import { first } from 'rxjs/operators';
import { EmployeesService } from '../_services/employees.service';

@Component({
  selector: 'app-assignment',
  templateUrl: './assignment.component.html',
  styleUrls: ['./assignment.component.sass']
})
export class AssignmentComponent implements OnInit {
  review: Review = this.assignmentsService.current;
  assignForm: FormGroup;
  loading = false;
  submitted = false;
  employees: Employee[];
  constructor(
    private assignmentsService: AssignmentsService,
    private formBuilder: FormBuilder,
    private employeesService: EmployeesService,
    router: Router
  ) {
    // redirect to home if already logged in
    if (!this.assignmentsService.current) {
      router.navigate(['/review']);
    }
  }
  // convenience getter for easy access to form fields
  get formControls() {
    return this.assignForm.controls;
  }
  ngOnInit() {
    this.assignForm = this.formBuilder.group({
      employee: [null, Validators.required]
    });
    this.getEmployees();
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.assignForm.invalid) {
      return;
    }

    this.loading = true;
  }

  private getEmployees() {
    this.employeesService
      .getAll()
      .pipe(first())
      .subscribe((data: Employee[]) => {
        this.employees = data;
      });
  }
}
