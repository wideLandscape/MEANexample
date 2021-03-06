import { Injectable } from '@angular/core';
import { Review } from '../_models/Review';
import { config } from '../_helpers/config';
import { HttpClient } from '@angular/common/http';
import { Assignment } from '../_models/assignment';
@Injectable({
  providedIn: 'root'
})
export class AssignmentsService {
  public current: Review;
  constructor(private http: HttpClient) {}

  add(assignment: Assignment) {
    return this.http.post(`${config.apiUrl}/assignments/add`, assignment);
  }

  delete(id: string, from: string) {
    return this.http.get(`${config.apiUrl}/assignments/delete/${id}.${from}`);
  }

  reviewers(id = this.current._id) {
    return this.http.get(`${config.apiUrl}/assignments/reviewers/${id}`);
  }

  byReviewer(id: string, todo: boolean = true) {
    return this.http.get(
      `${config.apiUrl}/assignments/by-reviewer/${id}.${todo}`
    );
  }
}
