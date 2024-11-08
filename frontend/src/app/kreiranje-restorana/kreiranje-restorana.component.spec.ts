import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KreiranjeRestoranaComponent } from './kreiranje-restorana.component';

describe('KreiranjeRestoranaComponent', () => {
  let component: KreiranjeRestoranaComponent;
  let fixture: ComponentFixture<KreiranjeRestoranaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [KreiranjeRestoranaComponent]
    });
    fixture = TestBed.createComponent(KreiranjeRestoranaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
