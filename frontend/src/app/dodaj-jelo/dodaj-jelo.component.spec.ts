import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DodajJeloComponent } from './dodaj-jelo.component';

describe('DodajJeloComponent', () => {
  let component: DodajJeloComponent;
  let fixture: ComponentFixture<DodajJeloComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DodajJeloComponent]
    });
    fixture = TestBed.createComponent(DodajJeloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
