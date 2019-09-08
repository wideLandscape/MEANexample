import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';
import {
  EmployeeActions,
  EmployeeSelectors,
  RootStoreState
} from '../root-store';
import { Employee } from '../_models/Employee';
import { AlertService } from '../_services/alert.service';
import { EmployeesService } from '../_services/employees.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmployeeComponent implements OnInit {
  employees$: Observable<Employee[]>;
  selected$: Observable<string>;

  showForm = false;
  editableEmployee: Employee;
  activeEmployeeId = '';

  constructor(
    private employeesService: EmployeesService,
    private alertService: AlertService,
    private store$: Store<RootStoreState.State>
  ) {}

  ngOnInit() {
    this.employees$ = this.store$.select(EmployeeSelectors.selectEmployeeItems);
    this.selected$ = this.store$.select(
      EmployeeSelectors.selectEmployeeActiveId
    );
    this.store$.dispatch(EmployeeActions.requestEmployees());
  }

  toggleActiveEmployee(employee: Employee) {
    this.store$.dispatch(
      EmployeeActions.selectActiveEmployeeId({ id: employee._id })
    );
    this.editableEmployee = undefined;
  }

  isActive(activeId: string, employeeId: string) {
    return activeId === employeeId;
  }

  toggleShowForm() {
    if (!this.showForm) {
      // close list as we are going to add a new employee
      this.store$.dispatch(EmployeeActions.selectActiveEmployeeId({ id: '' }));
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
