import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { bgdclVerifyComponent } from './bgdclVerify.component';

describe('bgdclVerifyComponent', () => {
  let component: bgdclVerifyComponent;
  let fixture: ComponentFixture<bgdclVerifyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ bgdclVerifyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(bgdclVerifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
