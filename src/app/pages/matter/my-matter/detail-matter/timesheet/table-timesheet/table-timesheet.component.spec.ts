import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableTimesheetComponent } from './table-timesheet.component';

describe('TableTimesheetComponent', () => {
  let component: TableTimesheetComponent;
  let fixture: ComponentFixture<TableTimesheetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableTimesheetComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TableTimesheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
