import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveredToModalComponent } from './delivered-to-modal.component';

describe('DeliveredToModalComponent', () => {
  let component: DeliveredToModalComponent;
  let fixture: ComponentFixture<DeliveredToModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeliveredToModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeliveredToModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
