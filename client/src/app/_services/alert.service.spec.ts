import { TestBed } from '@angular/core/testing';

import { AlertService, Message } from './alert.service';
import { RouterTestingModule } from '@angular/router/testing';

describe('AlertService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({ imports: [RouterTestingModule] })
  );

  it('should be created', () => {
    const service: AlertService = TestBed.get(AlertService);
    expect(service).toBeTruthy();
  });
  it('should send success messages', () => {
    const service: AlertService = TestBed.get(AlertService);
    const messages$ = service.getMessage();
    expect(messages$).toBeTruthy();
    messages$.subscribe((message: Message) => {
      expect(message.text === 'success!!').toBeTruthy();
      expect(message.type === 'success').toBeTruthy();
    });

    service.success('success!!');
  });
  it('should send error messages', () => {
    const service: AlertService = TestBed.get(AlertService);
    const messages$ = service.getMessage();
    expect(messages$).toBeTruthy();
    messages$.subscribe((message: Message) => {
      expect(message.text === 'error!!').toBeTruthy();
      expect(message.type === 'error').toBeTruthy();
    });

    service.error('error!!');
  });

  it('close() should send undefined messages', () => {
    const service: AlertService = TestBed.get(AlertService);
    const messages$ = service.getMessage();
    expect(messages$).toBeTruthy();
    messages$.subscribe((message: Message) => {
      expect(message === undefined).toBeTruthy();
    });
    service.close();
  });
});
