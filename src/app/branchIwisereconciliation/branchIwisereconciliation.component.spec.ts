import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BranchWiseReconciliationComponent } from './branchIwisereconciliation.component';

describe('ReconciliationComponent', () => {
  let component: BranchWiseReconciliationComponent;
  let fixture: ComponentFixture<BranchWiseReconciliationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BranchWiseReconciliationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BranchWiseReconciliationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
