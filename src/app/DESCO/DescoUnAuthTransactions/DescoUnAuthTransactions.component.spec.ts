import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DescoUnAuthTransactionsComponent } from './DescoUnAuthTransactions.component';

describe('DescoUnAuthTransactionsComponent', () => {
  let component: DescoUnAuthTransactionsComponent;
  let fixture: ComponentFixture<DescoUnAuthTransactionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DescoUnAuthTransactionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DescoUnAuthTransactionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
