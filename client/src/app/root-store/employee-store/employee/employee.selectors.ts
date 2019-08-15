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
const {
  // selectIds,
  // selectEntities,
  selectAll
  // selectTotal
} = adapter.getSelectors(selectEmployeeState);

export const getError = (state: State): any => state.error;

export const getIsLoading = (state: State): boolean => state.isLoading;

export const selectEmployeeItems: (state: object) => Employee[] = selectAll;

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
