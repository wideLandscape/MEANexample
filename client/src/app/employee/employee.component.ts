import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit
} from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import {
  EmployeeActions,
  EmployeeSelectors,
  RootStoreState
} from '../root-store';
import { Employee } from '../_models/Employee';
import { SavedEmployee } from './employee-form/employee-form.component';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmployeeComponent implements OnInit, OnDestroy {
  employees$: Observable<Employee[]>;
  editableEmployee$: Observable<Employee>;

  showForm = false;

  private unsubscriber$: Subject<void> = new Subject<void>();
  private activeEmployeeId = '';

  constructor(private store$: Store<RootStoreState.State>) {}

  ngOnInit() {
    this.employees$ = this.store$.select(EmployeeSelectors.selectAll);
    this.store$
      .select(EmployeeSelectors.selectEmployeeActiveId)
      .pipe(takeUntil(this.unsubscriber$))
      .subscribe((activeId: string) => {
        this.activeEmployeeId = activeId;
      });
    this.editableEmployee$ = this.store$.select(
      EmployeeSelectors.selectEmployeeEditable
    );
    this.store$
      .select(EmployeeSelectors.selectEmployeeFormVisibility)
      .pipe(takeUntil(this.unsubscriber$))
      .subscribe((visibility: boolean) => {
        this.showForm = visibility;
      });

    this.store$.dispatch(EmployeeActions.requestEmployees());
  }

  ngOnDestroy() {
    this.unsubscriber$.next();
    this.unsubscriber$.complete();
  }

  toggleActiveEmployee(employee: Employee) {
    this.store$.dispatch(
      EmployeeActions.selectActiveEmployeeId({ id: employee._id })
    );
  }
  toggleShowForm() {
    this.store$.dispatch(EmployeeActions.toggleFormVisibility());
  }

  editEmployee(employee: Employee) {
    this.store$.dispatch(EmployeeActions.editEmployee({ employee }));
  }

  delete(id: string) {
    this.store$.dispatch(EmployeeActions.deleteEmployee({ id }));
  }

  successForm(employee: SavedEmployee) {
    this.store$.dispatch(EmployeeActions.successForm({ new: employee.new }));
  }

  errorForm(error: any) {
    this.store$.dispatch(EmployeeActions.errorForm({ error }));
  }

  isActive(employeeId: string) {
    return this.activeEmployeeId === employeeId;
  }
}
