import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BgdclUnAuthTransactionsComponent } from './bgdclUnAuthTransactions.component';

describe('BgdclUnAuthTransactionsComponent', () => {
  let component: BgdclUnAuthTransactionsComponent;
  let fixture: ComponentFixture<BgdclUnAuthTransactionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BgdclUnAuthTransactionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BgdclUnAuthTransactionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
