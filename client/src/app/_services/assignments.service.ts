import { Injectable } from '@angular/core';
import { Review } from '../_models/Review';

@Injectable({
  providedIn: 'root'
})
export class AssignmentsService {
  public current: Review;
  constructor() {}
}
