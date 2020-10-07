import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardAppDocComponent } from './card-app-doc.component';

describe('CardAppDocComponent', () => {
  let component: CardAppDocComponent;
  let fixture: ComponentFixture<CardAppDocComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardAppDocComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardAppDocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
