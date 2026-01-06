import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BKASHVerifyComponent } from './BKASHVerify.component';

describe('BKASHVerifyComponent', () => {
  let component: BKASHVerifyComponent;
  let fixture: ComponentFixture<BKASHVerifyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BKASHVerifyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BKASHVerifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
