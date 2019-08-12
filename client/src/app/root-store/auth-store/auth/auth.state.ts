import { Employee } from 'src/app/_models/employee';

export interface State {
  user: Employee | null;
  isLoading: boolean;
  error: string;
}

export const initialState: State = {
  user: null,
  isLoading: false,
  error: null
};
