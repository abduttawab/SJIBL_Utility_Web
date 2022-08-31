import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NescoPrePiadReport } from './NescoPrePiadReport.component';


describe('NescoPrePiadReport', () => {
  let component: NescoPrePiadReport;
  let fixture: ComponentFixture<NescoPrePiadReport>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NescoPrePiadReport ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NescoPrePiadReport);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
