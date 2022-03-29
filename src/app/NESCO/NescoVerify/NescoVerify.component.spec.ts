import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NescoVerifyComponent } from './NescoVerify.component';

describe('NescoVerifyComponent', () => {
  let component: NescoVerifyComponent;
  let fixture: ComponentFixture<NescoVerifyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NescoVerifyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NescoVerifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
