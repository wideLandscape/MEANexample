import { Component, OnInit } from '@angular/core';
import { Assignment } from '../_models/assignment';
import { AssignmentsService } from '../_services/assignments.service';
import { AlertService } from '../_services/alert.service';
import { Review } from '../_models/Review';
import { Observable } from 'rxjs';
import { Employee } from '../_models/employee';
import { Store } from '@ngrx/store';
import { RootStoreState, ReviewSelectors } from '../root-store';
import { RequestReviewsByReviewer } from '../root-store/root-store.actions';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {
  showForm = false;
  loginItem$: Observable<Employee>;
  reviewItems$: Observable<Review[]>;

  constructor(
    private assignmentsService: AssignmentsService,
    private alertService: AlertService,
    private store$: Store<RootStoreState.State>
  ) {}

  ngOnInit() {
    this.assignmentsService.current = null;
    this.reviewItems$ = this.store$.select(ReviewSelectors.selectReviewItems);
    this.getReviews();
  }

  viewForm(show: boolean = true) {
    this.showForm = show;
    this.alertService.close();
  }

  successForm(assignment: Assignment) {
    this.alertService.success('Thank you!');
    this.showForm = false;
    this.getReviews();
  }
  errorForm(error: any) {
    this.alertService.error(error);
  }

  private getReviews(todo: boolean = true) {
    this.store$.dispatch(new RequestReviewsByReviewer());
  }
}
