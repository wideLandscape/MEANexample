import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { AlertService, Message } from '../../_services/alert.service';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.sass']
})
export class AlertComponent implements OnInit, OnDestroy {
  private subscription: Subscription;
  message: Message;

  constructor(private alertService: AlertService) {}

  ngOnInit() {
    this.subscription = this.alertService
      .getMessage()
      .subscribe((message: Message) => {
        this.message = message;
      });
  }
  close() {
    this.message = undefined;
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
