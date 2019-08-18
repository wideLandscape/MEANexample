import { Action, createReducer, on } from '@ngrx/store';
import * as EmployeeActions from './employee.actions';
import { initialState, adapter, State } from './employee.state';

export const employeesFeatureKey = 'employees';

const employeeReducer = createReducer(
  initialState,
  on(
    EmployeeActions.requestEmployees,
    EmployeeActions.refreshEmployees,
    (state, action) => ({
      ...state,
      error: null,
      loading: true,
      selected: null
    })
  ),
  on(EmployeeActions.requestEmployeesFailure, (state, action) => ({
    ...state,
    error: action.error,
    isLoading: false
  })),
  on(EmployeeActions.loadEmployees, (state, action) => ({
    ...adapter.addAll(action.employees, state),
    isLoading: false
  })),
  on(EmployeeActions.selectEmployee, (state, action) => ({
    ...state,
    activeId: action.id === state.activeId ? null : action.id
  }))
  /*
  on(EmployeeActions.addEmployee, (state, action) =>
    adapter.addOne(action.employee, state)
  ),
  on(EmployeeActions.upsertEmployee, (state, action) =>
    adapter.upsertOne(action.employee, state)
  ),
  on(EmployeeActions.addEmployees, (state, action) =>
    adapter.addMany(action.employees, state)
  ),
  on(EmployeeActions.upsertEmployees, (state, action) =>
    adapter.upsertMany(action.employees, state)
  ),
  on(EmployeeActions.updateEmployee, (state, action) =>
    adapter.updateOne(action.employee, state)
  ),
  on(EmployeeActions.updateEmployees, (state, action) =>
    adapter.updateMany(action.employees, state)
  ),
  on(EmployeeActions.deleteEmployee, (state, action) =>
    adapter.removeOne(action.id, state)
  ),
  on(EmployeeActions.deleteEmployees, (state, action) =>
    adapter.removeMany(action.ids, state)
  ),
  on(EmployeeActions.clearEmployees, state => adapter.removeAll(state))
  */
);

export function reducer(state: State | undefined, action: Action) {
  return employeeReducer(state, action);
}
