import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Assignment } from '../_models/assignment';
import { AssignmentsService } from '../_services/assignments.service';
import { AlertService } from '../_services/alert.service';
import { Review } from '../_models/Review';
import { Observable } from 'rxjs';
import { Employee } from '../_models/employee';
import { Store } from '@ngrx/store';
import {
  RootStoreState,
  ReviewSelectors,
  RootStoreActions
} from '../root-store';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
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
    // TODO: manage todo flag
    this.store$.dispatch(RootStoreActions.requestReviewsByReviewer());
  }

  viewForm(show: boolean = true) {
    this.showForm = show;
    this.alertService.close();
  }

  successForm(assignment: Assignment) {
    this.alertService.success('Thank you!');
    this.showForm = false;
    this.store$.dispatch(RootStoreActions.refreshReviewsByReviewer());
  }

  errorForm(error: any) {
    this.alertService.error(error);
  }
}
