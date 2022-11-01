import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DpdcUnAuthTransactionsComponent } from './DpdcUnAuthTransactions.component';

describe('DpdcUnAuthTransactionsComponent', () => {
  let component: DpdcUnAuthTransactionsComponent;
  let fixture: ComponentFixture<DpdcUnAuthTransactionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DpdcUnAuthTransactionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DpdcUnAuthTransactionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
