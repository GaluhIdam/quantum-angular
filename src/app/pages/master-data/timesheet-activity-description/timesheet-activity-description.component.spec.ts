import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimesheetActivityDescriptionComponent } from './timesheet-activity-description.component';

describe('TimesheetActivityDescriptionComponent', () => {
  let component: TimesheetActivityDescriptionComponent;
  let fixture: ComponentFixture<TimesheetActivityDescriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TimesheetActivityDescriptionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TimesheetActivityDescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
