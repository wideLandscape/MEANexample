import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { config } from '../_helpers/config';
import { Review } from '../_models/Review';

@Injectable({
  providedIn: 'root'
})
export class ReviewsService {
  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get(`${config.apiUrl}/reviews/`);
  }

  add(review: Review) {
    return this.http.post(`${config.apiUrl}/reviews/add`, review);
  }

  update(review: Review, id: string) {
    return this.http.post(`${config.apiUrl}/reviews/update/${id}`, review);
  }

  get(id: string) {
    return this.http.get(`${config.apiUrl}/reviews/get/${id}`);
  }
}
