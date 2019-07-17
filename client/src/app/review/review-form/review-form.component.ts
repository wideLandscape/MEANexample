import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormArray,
  FormControl,
  ValidatorFn
} from '@angular/forms';
import { first } from 'rxjs/operators';

import { ReviewsService } from 'src/app/_services/reviews.service';
import { Review } from 'src/app/_models/Review';
import { questions, Question } from 'src/app/_helpers/questions';

type Label = 'Save' | 'Update';

@Component({
  selector: 'app-review-form',
  templateUrl: './review-form.component.html',
  styleUrls: ['./review-form.component.sass']
})
export class ReviewFormComponent implements OnInit {
  questions: Question[] = questions;
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
      questions: new FormArray([], this.minimumSelection(1)),
      active: true
    });
    this.addQuestions();
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
    console.log(this.registerForm.value);
    return this.id.length > 0
      ? this.reviewsService.update(this.registerForm.value, this.id)
      : this.reviewsService.add(this.registerForm.value);
  }
  private addQuestions() {
    this.questions.map((o, i) => {
      const control = new FormControl(i === 0); // if first item set to true, else false
      (this.registerForm.controls.questions as FormArray).push(control);
    });
  }
  private minimumSelection(min = 1) {
    const validator: ValidatorFn = (formArray: FormArray) => {
      const totalSelected = this.countChecked(formArray);
      // if the total is not greater than the minimum, return the error message
      console.log(totalSelected);
      return totalSelected >= min ? null : { required: true };
    };

    return validator;
  }

  private countChecked = (formArray: FormArray) =>
    formArray.controls
      // get a list of checkbox values (boolean)
      .map(control => control.value)
      // total up the number of checked checkboxes
      // tslint:disable-next-line: semicolon
      .reduce((prev, next) => (next ? prev + next : prev), 0);
}
