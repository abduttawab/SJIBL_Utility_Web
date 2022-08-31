import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NescoPostPiadDatwise } from './NescoPostPiadDatwise.component';


describe('NescoPostPiadDatwise', () => {
  let component: NescoPostPiadDatwise;
  let fixture: ComponentFixture<NescoPostPiadDatwise>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NescoPostPiadDatwise ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NescoPostPiadDatwise);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
