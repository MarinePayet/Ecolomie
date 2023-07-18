import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductStorageUserPage } from './product-storage-user.page';

describe('ProductStorageUserPage', () => {
  let component: ProductStorageUserPage;
  let fixture: ComponentFixture<ProductStorageUserPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ProductStorageUserPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
