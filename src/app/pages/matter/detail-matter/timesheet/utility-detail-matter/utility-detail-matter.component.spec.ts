import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UtilityDetailMatterComponent } from './utility-detail-matter.component';

describe('UtilityDetailMatterComponent', () => {
  let component: UtilityDetailMatterComponent;
  let fixture: ComponentFixture<UtilityDetailMatterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UtilityDetailMatterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UtilityDetailMatterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
