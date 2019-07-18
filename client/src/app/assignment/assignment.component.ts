import { Component, OnInit } from '@angular/core';
import { AssignmentsService } from '../_services/assignments.service';
import { Review } from '../_models/Review';
import { Router } from '@angular/router';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Employee } from '../_models/Employee';
import { first } from 'rxjs/operators';
import { EmployeesService } from '../_services/employees.service';
import { Assignment } from '../_models/assignment';
import { AlertService } from '../_services/alert.service';

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
    private alertService: AlertService,
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
      employee_id: [null, Validators.required]
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
    this.assignmentsService
      .add({
        review_id: this.assignmentsService.current._id,
        employee_id: this.assignForm.value.employee_id
      })
      .pipe(first())
      .subscribe(
        (assignment: Assignment) => {
          this.loading = false;
          this.submitted = false;
          this.assignForm.reset();
          this.getEmployees();
          this.alertService.success('Reviewer assigned');
        },
        error => {
          this.loading = false;
          this.alertService.error(error);
        }
      );
  }

  onRemove(id: string) {
    this.submitted = true;
    this.loading = true;
    this.assignmentsService
      .delete(id)
      .pipe(first())
      .subscribe((assignment: Assignment) => {
        this.loading = false;
        this.submitted = false;
        this.getEmployees();
      });
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
