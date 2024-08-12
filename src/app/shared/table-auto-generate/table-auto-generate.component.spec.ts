import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableAutoGenerateComponent } from './table-auto-generate.component';

describe('TableAutoGenerateComponent', () => {
  let component: TableAutoGenerateComponent;
  let fixture: ComponentFixture<TableAutoGenerateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableAutoGenerateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TableAutoGenerateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
