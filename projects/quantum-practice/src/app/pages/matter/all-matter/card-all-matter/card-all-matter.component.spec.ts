import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardAllMatterComponent } from './card-all-matter.component';

describe('CardAllMatterComponent', () => {
  let component: CardAllMatterComponent;
  let fixture: ComponentFixture<CardAllMatterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardAllMatterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CardAllMatterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
