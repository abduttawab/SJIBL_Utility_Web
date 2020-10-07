import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardapplicationDetailsreportComponent } from './cardapplication-detailsreport.component';

describe('CardapplicationDetailsreportComponent', () => {
  let component: CardapplicationDetailsreportComponent;
  let fixture: ComponentFixture<CardapplicationDetailsreportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardapplicationDetailsreportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardapplicationDetailsreportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
