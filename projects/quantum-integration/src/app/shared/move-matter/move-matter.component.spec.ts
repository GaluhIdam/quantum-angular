import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoveMatterComponent } from './move-matter.component';

describe('MoveMatterComponent', () => {
  let component: MoveMatterComponent;
  let fixture: ComponentFixture<MoveMatterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MoveMatterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MoveMatterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
