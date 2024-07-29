import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableDetailMatterComponent } from './table-detail-matter.component';

describe('TableDetailMatterComponent', () => {
  let component: TableDetailMatterComponent;
  let fixture: ComponentFixture<TableDetailMatterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableDetailMatterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TableDetailMatterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
