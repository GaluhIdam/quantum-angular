import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MyTimesheetComponent } from './my-timesheet.component';
import { PageEmptyComponent } from '../../../shared/page-empty/page-empty.component';
import { ProductivityComponent } from './productivity/productivity.component';
import { YtdProductivityComponent } from './ytd-productivity/ytd-productivity.component';
import { HistoryActivityComponent } from './history-activity/history-activity.component';

describe('MyTimesheetComponent', () => {
  let component: MyTimesheetComponent;
  let fixture: ComponentFixture<MyTimesheetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MyTimesheetComponent,
        PageEmptyComponent,
        ProductivityComponent,
        YtdProductivityComponent,
        HistoryActivityComponent
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyTimesheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have initial period as "month"', () => {
    expect(component.period).toBe('month');
  });

  it('should change period to "year" when typeChanger is called with "year"', () => {
    component.typeChanger('year');
    expect(component.period).toBe('year');
  });

  it('should change period to "appraisalYear" when typeChanger is called with "appraisalYear"', () => {
    component.typeChanger('appraisalYear');
    expect(component.period).toBe('appraisalYear');
  });

  it('should call typeChanger method and update the period', () => {
    spyOn(component, 'typeChanger');
    const newPeriod: 'month' | 'year' | 'appraisalYear' = 'year';
    component.typeChanger(newPeriod);
    expect(component.typeChanger).toHaveBeenCalledWith(newPeriod);
    expect(component.period).toBe(newPeriod);
  });
});
