import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StorageDetailPage } from './storage-detail.page';

describe('StorageDetailPage', () => {
  let component: StorageDetailPage;
  let fixture: ComponentFixture<StorageDetailPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(StorageDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
