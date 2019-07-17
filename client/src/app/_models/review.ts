import { Employee } from './Employee';

export class Review {
  // tslint:disable-next-line: variable-name
  _id: string;
  employee: Employee;
  questions: string[];
  active: boolean;
}
