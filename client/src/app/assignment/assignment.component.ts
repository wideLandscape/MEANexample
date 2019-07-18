import { Component, OnInit } from '@angular/core';
import { AssignmentsService } from '../_services/assignments.service';
import { Review } from '../_models/Review';
import { Router } from '@angular/router';

@Component({
  selector: 'app-assignment',
  templateUrl: './assignment.component.html',
  styleUrls: ['./assignment.component.sass']
})
export class AssignmentComponent implements OnInit {
  review: Review = this.assignmentsService.current;

  constructor(private assignmentsService: AssignmentsService, router: Router) {
    // redirect to home if already logged in
    if (!this.assignmentsService.current) {
      router.navigate(['/review']);
    }
  }

  ngOnInit() {}
}
