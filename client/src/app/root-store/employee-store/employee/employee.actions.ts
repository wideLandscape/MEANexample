import { createAction, props } from '@ngrx/store';
// import { Update } from '@ngrx/entity';

import { Employee } from './employee.model';

export const requestEmployees = createAction('[Employee/API] Request Employee');

export const requestEmployeesFailure = createAction(
  '[Employee/API] Request Employee Failure',
  props<{ error: string }>()
);

export const loadEmployees = createAction(
  '[Employee/API] Load Employees',
  props<{ employees: Employee[] }>()
);

export const refreshEmployees = createAction('[Employee/API] Refresh Employee');

export const selectEmployee = createAction(
  '[Employee/Page] Select Employee',
  props<{ id: string }>()
);

/*
export const addEmployee = createAction(
  '[Employee/API] Add Employee',
  props<{ employee: Employee }>()
);

export const upsertEmployee = createAction(
  '[Employee/API] Upsert Employee',
  props<{ employee: Employee }>()
);

export const addEmployees = createAction(
  '[Employee/API] Add Employees',
  props<{ employees: Employee[] }>()
);

export const upsertEmployees = createAction(
  '[Employee/API] Upsert Employees',
  props<{ employees: Employee[] }>()
);

export const updateEmployee = createAction(
  '[Employee/API] Update Employee',
  props<{ employee: Update<Employee> }>()
);

export const updateEmployees = createAction(
  '[Employee/API] Update Employees',
  props<{ employees: Update<Employee>[] }>()
);

export const deleteEmployee = createAction(
  '[Employee/API] Delete Employee',
  props<{ id: string }>()
);

export const deleteEmployees = createAction(
  '[Employee/API] Delete Employees',
  props<{ ids: string[] }>()
);

export const clearEmployees = createAction('[Employee/API] Clear Employees');
*/
