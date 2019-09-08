import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Observable, of as observableOf } from 'rxjs';
import { exhaustMap, first, map, catchError, switchMap } from 'rxjs/operators';
import { Action } from '@ngrx/store';
import * as EmployeeActions from './employee.actions';
import { EmployeesService } from 'src/app/_services/employees.service';
import { Employee } from 'src/app/_models/employee';
import { AlertService } from 'src/app/_services/alert.service';

@Injectable()
export class EmployeeEffects {
  constructor(
    private actions$: Actions,
    private employeesService: EmployeesService,
    private alertService: AlertService
  ) {}

  employeesRequestEffect$: Observable<Action> = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          EmployeeActions.requestEmployees,
          EmployeeActions.refreshEmployees
        ),
        exhaustMap(action =>
          this.employeesService.getAll().pipe(
            first(),
            map((employees: Employee[]) =>
              EmployeeActions.loadEmployees({
                employees
              })
            ),
            catchError(error =>
              observableOf(EmployeeActions.requestEmployeesFailure({ error }))
            )
          )
        )
      ),
    { resubscribeOnError: false }
  );

  employeeRequestFailureEffect$: Observable<void> = createEffect(
    () =>
      this.actions$.pipe(
        ofType(EmployeeActions.requestEmployeesFailure),
        map(action => this.alertService.error(action.error))
      ),
    { dispatch: false }
  );

  employeeToggleFormVisibilityEffect$: Observable<void> = createEffect(
    () =>
      this.actions$.pipe(
        ofType(EmployeeActions.toggleFormVisibility),
        map(action => this.alertService.close())
      ),
    { dispatch: false }
  );
  employeeSuccessFormEffect$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(EmployeeActions.successForm),
      map(action => {
        this.alertService.success(
          action.new ? 'Employee created' : 'Successful update'
        );
        return EmployeeActions.refreshEmployees();
      })
    )
  );

  employeeErrorFormEffect$: Observable<void> = createEffect(
    () =>
      this.actions$.pipe(
        ofType(EmployeeActions.errorForm),
        map(action => this.alertService.error(action.error))
      ),
    { dispatch: false }
  );

  employeeDeleteEmployeeEffect$: Observable<void> = createEffect(
    () =>
      this.actions$.pipe(
        ofType(EmployeeActions.deleteEmployee),
        map(action => this.alertService.success('Deleted successfully'))
      ),
    { dispatch: false }
  );
}
