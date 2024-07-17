import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTimesheetFlyoutComponent } from './create-timesheet-flyout.component';

describe('CreateTimesheetFlyoutComponent', () => {
  let component: CreateTimesheetFlyoutComponent;
  let fixture: ComponentFixture<CreateTimesheetFlyoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateTimesheetFlyoutComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateTimesheetFlyoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
