import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DESCOReport } from './DESCOReport.component';


describe('DESCOReport', () => {
  let component: DESCOReport;
  let fixture: ComponentFixture<DESCOReport>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DESCOReport ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DESCOReport);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
