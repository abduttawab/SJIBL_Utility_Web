import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NescoPrePiadReceipt } from './NescoPrePiadReceipt.component';


describe('NescoPrePiadReceipt', () => {
  let component: NescoPrePiadReceipt;
  let fixture: ComponentFixture<NescoPrePiadReceipt>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NescoPrePiadReceipt ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NescoPrePiadReceipt);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
