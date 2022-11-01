import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BREBVerifyComponent } from './BREBVerify.component';

describe('BREBVerifyComponent', () => {
  let component: BREBVerifyComponent;
  let fixture: ComponentFixture<BREBVerifyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BREBVerifyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BREBVerifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
