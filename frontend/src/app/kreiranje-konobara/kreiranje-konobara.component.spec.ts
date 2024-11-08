import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KreiranjeKonobaraComponent } from './kreiranje-konobara.component';

describe('KreiranjeKonobaraComponent', () => {
  let component: KreiranjeKonobaraComponent;
  let fixture: ComponentFixture<KreiranjeKonobaraComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [KreiranjeKonobaraComponent]
    });
    fixture = TestBed.createComponent(KreiranjeKonobaraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
