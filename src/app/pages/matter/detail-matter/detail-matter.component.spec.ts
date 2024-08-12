import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailMatterComponent } from './detail-matter.component';

describe('DetailMatterComponent', () => {
  let component: DetailMatterComponent;
  let fixture: ComponentFixture<DetailMatterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailMatterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetailMatterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
