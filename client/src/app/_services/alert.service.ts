import { Injectable } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { Observable, Subject } from 'rxjs';

export type messageType = 'success' | 'error';
export interface Message {
  type: messageType;
  text: string;
}
@Injectable({ providedIn: 'root' })
export class AlertService {
  private subject = new Subject<Message>();

  constructor(router: Router) {
    // clear alert message on route change
    router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        // clear alert
        this.subject.next();
      }
    });
  }

  success(message: string) {
    this.subject.next({ type: 'success', text: message });
  }

  error(message: string) {
    this.subject.next({ type: 'error', text: message });
  }

  close() {
    this.subject.next();
  }

  getMessage(): Observable<Message> {
    return this.subject.asObservable();
  }
}
