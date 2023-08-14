import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NewproductForListPage } from './newproduct-for-list.page';

describe('NewproductForListPage', () => {
  let component: NewproductForListPage;
  let fixture: ComponentFixture<NewproductForListPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(NewproductForListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
