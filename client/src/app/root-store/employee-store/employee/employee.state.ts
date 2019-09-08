import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import { Employee } from './employee.model';

export interface State extends EntityState<Employee> {
  // additional entities state properties
  isLoading?: boolean;
  error?: string;
  activeEmployeeId: string;
}

export const adapter: EntityAdapter<Employee> = createEntityAdapter<Employee>({
  selectId: model => model._id,
  sortComparer: (a: Employee, b: Employee): number =>
    b._id.toString().localeCompare(a._id.toString())
});

export const initialState: State = adapter.getInitialState({
  // additional entity state properties
  isLoading: false,
  error: null,
  activeEmployeeId: ''
});
