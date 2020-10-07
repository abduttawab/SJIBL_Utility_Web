import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardReceiveModalComponent } from './card-receive-modal.component';

describe('CardReceiveModalComponent', () => {
  let component: CardReceiveModalComponent;
  let fixture: ComponentFixture<CardReceiveModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardReceiveModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardReceiveModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
