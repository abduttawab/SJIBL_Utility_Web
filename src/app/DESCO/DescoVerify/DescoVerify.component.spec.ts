import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DescoVerifyComponent } from './DescoVerify.component';

describe('DescoVerifyComponent', () => {
  let component: DescoVerifyComponent;
  let fixture: ComponentFixture<DescoVerifyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DescoVerifyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DescoVerifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
