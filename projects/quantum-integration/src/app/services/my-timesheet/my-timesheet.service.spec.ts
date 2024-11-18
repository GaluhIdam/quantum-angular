import { TestBed } from '@angular/core/testing';

import { MyTimesheetService } from './my-timesheet.service';

describe('MyTimesheetService', () => {
  let service: MyTimesheetService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MyTimesheetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
