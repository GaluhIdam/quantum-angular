import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTimesheetFlyoutComponent } from './edit-timesheet-flyout.component';

describe('EditTimesheetFlyoutComponent', () => {
  let component: EditTimesheetFlyoutComponent;
  let fixture: ComponentFixture<EditTimesheetFlyoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditTimesheetFlyoutComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditTimesheetFlyoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
