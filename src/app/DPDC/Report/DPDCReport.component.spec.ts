import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DPDCReport } from './DPDCReport.component';


describe('DPDCReport', () => {
  let component: DPDCReport;
  let fixture: ComponentFixture<DPDCReport>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DPDCReport ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DPDCReport);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
