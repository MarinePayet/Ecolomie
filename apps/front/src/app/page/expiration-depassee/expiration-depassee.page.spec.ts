import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ExpirationDepasseePage } from './expiration-depassee.page';

describe('ExpirationDepasseePage', () => {
  let component: ExpirationDepasseePage;
  let fixture: ComponentFixture<ExpirationDepasseePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ExpirationDepasseePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
