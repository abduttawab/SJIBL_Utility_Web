import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnAuthTransactionsComponent } from './unAuthTransactions.component';

describe('UnAuthTransactionsComponent', () => {
  let component: UnAuthTransactionsComponent;
  let fixture: ComponentFixture<UnAuthTransactionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnAuthTransactionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnAuthTransactionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
