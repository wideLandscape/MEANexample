import { Component, OnInit } from '@angular/core';
import { Assignment } from '../_models/assignment';
import { AssignmentsService } from '../_services/assignments.service';
import { AlertService } from '../_services/alert.service';
import { first } from 'rxjs/operators';
import { AppComponent } from '../app.component';
import { Review } from '../_models/Review';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {
  reviews: Review[];
  showForm = false;
  currentEmployee = this.appComponent.currentEmployee;
  constructor(
    private appComponent: AppComponent,
    private assignmentsService: AssignmentsService,
    private alertService: AlertService
  ) {}

  ngOnInit() {
    this.assignmentsService.current = null;
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
    this.assignmentsService
      .byReviewer(this.currentEmployee._id, todo)
      .pipe(first())
      .subscribe((data: any[]) => {
        this.reviews = data.filter(x => x.review_id).map(x => x.review_id);
      });
  }
}
