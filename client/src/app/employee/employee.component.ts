import { Component, OnInit } from '@angular/core';
import { Employee } from '../_models/Employee';
import { EmployeesService } from '../_services/employees.service';
import { first } from 'rxjs/operators';
import { AlertService } from '../_services/alert.service';
import { Store } from '@ngrx/store';
import {
  RootStoreState,
  EmployeeSelectors,
  EmployeeActions
} from '../root-store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.sass']
})
export class EmployeeComponent implements OnInit {
  employees$: Observable<Employee[]>;

  activeId = '';
  showForm = false;
  editableEmployee: Employee;
  constructor(
    private employeesService: EmployeesService,
    private alertService: AlertService,
    private store$: Store<RootStoreState.State>
  ) {}

  ngOnInit() {
    this.employees$ = this.store$.select(EmployeeSelectors.selectEmployeeItems);
    this.store$.dispatch(EmployeeActions.requestEmployees());
  }

  isActive(id: string) {
    return this.activeId === id;
  }

  toggleActivation(employee: Employee) {
    this.activeId = employee._id === this.activeId ? '' : employee._id;
    this.editableEmployee = undefined;
  }

  toggleShowForm() {
    if (!this.showForm) {
      // close list as we are adding a new employee
      this.activeId = '';
    }
    this.showForm = !this.showForm;
    this.editableEmployee = undefined;
    this.alertService.close();
  }

  showEditForm(id: string) {
    this.employeesService
      .get(id)
      .pipe(first())
      .subscribe((employee: Employee) => {
        this.showForm = true;
        this.editableEmployee = employee;
      });
  }

  delete(id: string) {
    this.alertService.close();
    this.employeesService
      .delete(id)
      .pipe(first())
      .subscribe(data => {
        this.alertService.success('Deleted successfully');
        this.showForm = false;
        this.store$.dispatch(EmployeeActions.refreshEmployees());
      });
  }

  successForm(employee: Employee) {
    this.alertService.success(
      this.editableEmployee ? 'Successful update' : 'Employee created'
    );
    this.showForm = false;
    this.editableEmployee = undefined;
    this.store$.dispatch(EmployeeActions.refreshEmployees());
  }
  errorForm(error: any) {
    this.alertService.error(error);
  }
}
