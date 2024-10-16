import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlyoutTimesheetComponent } from './flyout-timesheet.component';

describe('FlyoutTimesheetComponent', () => {
  let component: FlyoutTimesheetComponent;
  let fixture: ComponentFixture<FlyoutTimesheetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FlyoutTimesheetComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FlyoutTimesheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
