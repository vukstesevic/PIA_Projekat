import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GostDostaveComponent } from './gost-dostave.component';

describe('GostDostaveComponent', () => {
  let component: GostDostaveComponent;
  let fixture: ComponentFixture<GostDostaveComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GostDostaveComponent]
    });
    fixture = TestBed.createComponent(GostDostaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
