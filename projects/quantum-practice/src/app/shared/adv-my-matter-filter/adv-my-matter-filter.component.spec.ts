import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvMyMatterFilterComponent } from './adv-my-matter-filter.component';

describe('AdvMyMatterFilterComponent', () => {
  let component: AdvMyMatterFilterComponent;
  let fixture: ComponentFixture<AdvMyMatterFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdvMyMatterFilterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdvMyMatterFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
