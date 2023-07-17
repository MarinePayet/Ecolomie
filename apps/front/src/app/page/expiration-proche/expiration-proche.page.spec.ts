import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ExpirationProchePage } from './expiration-proche.page';

describe('ExpirationProchePage', () => {
  let component: ExpirationProchePage;
  let fixture: ComponentFixture<ExpirationProchePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ExpirationProchePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
