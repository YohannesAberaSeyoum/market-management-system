import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUpdateSubcategoryComponent } from './add-update-subcategory.component';

describe('AddUpdateSubcategoryComponent', () => {
  let component: AddUpdateSubcategoryComponent;
  let fixture: ComponentFixture<AddUpdateSubcategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddUpdateSubcategoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddUpdateSubcategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
