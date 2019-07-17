import { Component, OnInit } from '@angular/core';
import { Review } from '../_models/Review';
import { ReviewsService } from '../_services/reviews.service';
import { first } from 'rxjs/operators';
import { AlertService } from '../_services/alert.service';
import { EmployeesService } from '../_services/employees.service';
import { Employee } from '../_models/Employee';
@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.sass']
})
export class ReviewComponent implements OnInit {
  reviews: Review[];
  activeId = '';
  showForm = false;
  editableReview: Review;
  employees: Employee[];
  constructor(
    private reviewsService: ReviewsService,
    private alertService: AlertService,
    private employeesService: EmployeesService
  ) {}

  ngOnInit() {
    this.getReviews();
    this.getEmployees();
  }

  isActive(id: string) {
    return this.activeId === id;
  }

  toggleActivation(review: Review) {
    this.activeId = review._id === this.activeId ? '' : review._id;
    this.editableReview = undefined;
  }

  toggleShowForm() {
    if (!this.showForm) {
      // close list as we are adding a new review
      this.activeId = '';
    }
    this.showForm = !this.showForm;
    this.editableReview = undefined;
    this.alertService.close();
  }

  showEditForm(id: string) {
    this.reviewsService
      .get(id)
      .pipe(first())
      .subscribe((review: Review) => {
        this.showForm = true;
        this.editableReview = review;
      });
  }

  successForm(review: Review) {
    this.alertService.success(
      this.editableReview ? 'Successful update' : 'Review created'
    );
    this.showForm = false;
    this.editableReview = undefined;
    this.getReviews();
  }
  errorForm(error: any) {
    this.alertService.error(error);
  }
  private getReviews() {
    this.reviewsService
      .getAll()
      .pipe(first())
      .subscribe((data: Review[]) => {
        this.reviews = data;
      });
  }
  private getEmployees() {
    this.employeesService
      .getAll()
      .pipe(first())
      .subscribe((data: Employee[]) => {
        this.employees = data;
      });
  }
}
