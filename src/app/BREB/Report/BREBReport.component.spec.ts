import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BREBReport } from './BREBReport.component';


describe('BREBReport', () => {
  let component: BREBReport;
  let fixture: ComponentFixture<BREBReport>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BREBReport ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BREBReport);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
