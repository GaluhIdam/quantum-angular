import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoryActivityComponent } from './history-activity.component';

describe('HistoryActivityComponent', () => {
  let component: HistoryActivityComponent;
  let fixture: ComponentFixture<HistoryActivityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HistoryActivityComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HistoryActivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
