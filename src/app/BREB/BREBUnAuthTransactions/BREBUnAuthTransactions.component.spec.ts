import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BREBUnAuthTransactionsComponent } from './BREBUnAuthTransactions.component';

describe('BREBUnAuthTransactionsComponent', () => {
  let component: BREBUnAuthTransactionsComponent;
  let fixture: ComponentFixture<BREBUnAuthTransactionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BREBUnAuthTransactionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BREBUnAuthTransactionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
