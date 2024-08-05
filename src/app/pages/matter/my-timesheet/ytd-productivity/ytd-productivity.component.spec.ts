import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YtdProductivityComponent } from './ytd-productivity.component';

describe('YtdProductivityComponent', () => {
  let component: YtdProductivityComponent;
  let fixture: ComponentFixture<YtdProductivityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [YtdProductivityComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(YtdProductivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
