import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTagTimesheetFlyoutComponent } from './edit-tag-timesheet-flyout.component';

describe('EditTagTimesheetFlyoutComponent', () => {
  let component: EditTagTimesheetFlyoutComponent;
  let fixture: ComponentFixture<EditTagTimesheetFlyoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditTagTimesheetFlyoutComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EditTagTimesheetFlyoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
