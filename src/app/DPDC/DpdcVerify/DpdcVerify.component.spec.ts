import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DpdcVerifyComponent } from './DpdcVerify.component';

describe('DpdcVerifyComponent', () => {
  let component: DpdcVerifyComponent;
  let fixture: ComponentFixture<DpdcVerifyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DpdcVerifyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DpdcVerifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
