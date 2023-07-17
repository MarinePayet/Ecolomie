import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MesListesPage } from './mes-listes.page';

describe('MesListesPage', () => {
  let component: MesListesPage;
  let fixture: ComponentFixture<MesListesPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(MesListesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
