import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchFilterAddComponent } from './search-filter-add.component';

describe('SearchFilterAddComponent', () => {
  let component: SearchFilterAddComponent;
  let fixture: ComponentFixture<SearchFilterAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchFilterAddComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SearchFilterAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
