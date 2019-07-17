import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { first } from 'rxjs/operators';

import { ReviewsService } from 'src/app/_services/reviews.service';
import { Review } from 'src/app/_models/Review';
import { questions } from 'src/app/_helpers/questions';

type Label = 'Save' | 'Update';

@Component({
  selector: 'app-review-form',
  templateUrl: './review-form.component.html',
  styleUrls: ['./review-form.component.sass']
})
export class ReviewFormComponent implements OnInit {
  registerForm: FormGroup;
  loading = false;
  submitted = false;
  label: Label = 'Save';
  id = '';
  @Output()
  success: EventEmitter<Review> = new EventEmitter<Review>();
  @Output()
  error: EventEmitter<any> = new EventEmitter<any>();
  @Input('review')
  set editableReview(review: Review) {
    if (this.registerForm) {
      this.submitted = false;
      review ? this.setEditReviewForm(review) : this.setNewReviewForm();
    }
  }

  setNewReviewForm() {
    this.registerForm.reset();
    this.label = 'Save';
    this.id = '';
  }
  setEditReviewForm(review: Review) {
    this.registerForm.patchValue(review);
    this.label = 'Update';
    this.id = review._id;
  }
  // convenience getter for easy access to form fields
  get formControls() {
    return this.registerForm.controls;
  }

  constructor(
    private formBuilder: FormBuilder,
    private reviewsService: ReviewsService
  ) {}

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      employee: ['', Validators.required],
      questions: new FormArray([]),
      active: true
    });
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }

    this.loading = true;
    this.saveForm()
      .pipe(first())
      .subscribe(
        data => {
          this.loading = false;
          this.registerForm.reset();
          this.success.emit(data as Review);
        },
        error => {
          this.loading = false;
          this.error.emit(error);
        }
      );
  }
  private saveForm() {
    return this.id.length > 0
      ? this.reviewsService.update(this.registerForm.value, this.id)
      : this.reviewsService.add(this.registerForm.value);
  }
}
