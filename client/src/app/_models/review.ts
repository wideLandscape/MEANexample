import { Employee } from './employee';
import { Assignment } from './assignment';

export class Review {
  // tslint:disable-next-line: variable-name
  _id: string;
  employee: Employee;
  questions: string[];
  active: boolean;
  assignments?: Assignment[];
}
