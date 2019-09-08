import { adapter, State } from './employee.state';
import {
  MemoizedSelector,
  createFeatureSelector,
  createSelector
} from '@ngrx/store';
import { employeesFeatureKey } from './employee.reducer';
import { Employee } from './employee.model';

export const selectEmployeeState: MemoizedSelector<
  object,
  State
> = createFeatureSelector<State>(employeesFeatureKey);

// SELECTORS AVAILABLE OUT OF THE BOX
export const {
  // selectIds,
  // selectEntities,
  selectAll
  // selectTotal
} = adapter.getSelectors(selectEmployeeState);

export const getError = (state: State): any => state.error;

export const getIsLoading = (state: State): boolean => state.isLoading;

export const getActiveEmployeeId = (state: State): string => state.activeId;

export const getEditable = (state: State): Employee => state.editable;

export const getFormVisibility = (state: State): boolean =>
  state.formVisibility;

export const selectEmployeeError: MemoizedSelector<
  object,
  any
> = createSelector(
  selectEmployeeState,
  getError
);

export const selectEmployeeIsLoading: MemoizedSelector<
  object,
  boolean
> = createSelector(
  selectEmployeeState,
  getIsLoading
);

export const selectEmployeeActiveId: MemoizedSelector<
  object,
  string
> = createSelector(
  selectEmployeeState,
  getActiveEmployeeId
);
export const selectEmployeeEditable: MemoizedSelector<
  object,
  Employee
> = createSelector(
  selectEmployeeState,
  getEditable
);
export const selectEmployeeFormVisibility: MemoizedSelector<
  object,
  boolean
> = createSelector(
  selectEmployeeState,
  getFormVisibility
);
