import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BKASHUnAuthTransactionsComponent } from './BKASHUnAuthTransactions.component';

describe('BKASHUnAuthTransactionsComponent', () => {
  let component: BKASHUnAuthTransactionsComponent;
  let fixture: ComponentFixture<BKASHUnAuthTransactionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BKASHUnAuthTransactionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BKASHUnAuthTransactionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
