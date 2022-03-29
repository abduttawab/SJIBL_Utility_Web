import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NescoUnAuthTransactionsComponent } from './NescoUnAuthTransactions.component';

describe('NescoUnAuthTransactionsComponent', () => {
  let component: NescoUnAuthTransactionsComponent;
  let fixture: ComponentFixture<NescoUnAuthTransactionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NescoUnAuthTransactionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NescoUnAuthTransactionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
