import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllMatterComponent } from './all-matter.component';

describe('AllMatterComponent', () => {
  let component: AllMatterComponent;
  let fixture: ComponentFixture<AllMatterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AllMatterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AllMatterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
