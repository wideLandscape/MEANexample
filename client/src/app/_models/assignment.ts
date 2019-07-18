export interface ReviewResult {
  question: string;
  value: number;
}

export class Assignment {
  /* tslint:disable */
  _id?: string;
  review_id: string;
  employee_id: string;
  /* tslint:ensable */
  results?: ReviewResult[];
  done?: boolean;
}
