import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NewproductPage } from './newproduct.page';

describe('NewproductPage', () => {
  let component: NewproductPage;
  let fixture: ComponentFixture<NewproductPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(NewproductPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
