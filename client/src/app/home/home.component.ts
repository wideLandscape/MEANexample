import { Component, OnInit } from '@angular/core';
import { Assignment } from '../_models/assignment';
import { AssignmentsService } from '../_services/assignments.service';
import { AlertService } from '../_services/alert.service';
import { first } from 'rxjs/operators';
import { Review } from '../_models/Review';
import { Observable } from 'rxjs';
import { Employee } from '../_models/employee';
import { Store } from '@ngrx/store';
import { RootStoreState, ReviewSelectors, ReviewActions } from '../root-store';
import { AuthenticationService } from '../_services/authentication.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {
  reviews: Review[];
  showForm = false;
  currentEmployee = this.authenticationSerive.currentEmployeeValue;
  loginItem$: Observable<Employee>;
  reviewItems$: Observable<Review[]>;

  constructor(
    private assignmentsService: AssignmentsService,
    private alertService: AlertService,
    private store$: Store<RootStoreState.State>,
    private authenticationSerive: AuthenticationService
  ) {}

  ngOnInit() {
    this.assignmentsService.current = null;
    // TODO: getReviews with ngrx
    this.reviewItems$ = this.store$.select(ReviewSelectors.selectReviewItems);
    this.getReviews(this.currentEmployee);
  }

  viewForm(show: boolean = true) {
    this.showForm = show;
    this.alertService.close();
  }

  successForm(assignment: Assignment) {
    this.alertService.success('Thank you!');
    this.showForm = false;
    this.getReviews(this.currentEmployee);
  }
  errorForm(error: any) {
    this.alertService.error(error);
  }

  private getReviews(currentEmployee: Employee, todo: boolean = true) {
    this.assignmentsService
      .byReviewer(currentEmployee._id, todo)
      .pipe(first())
      .subscribe((data: any[]) => {
        const reviews = data.filter(x => x.review_id).map(x => x.review_id);
        this.store$.dispatch(new ReviewActions.LoadReviews({ reviews }));
      });
  }
}
