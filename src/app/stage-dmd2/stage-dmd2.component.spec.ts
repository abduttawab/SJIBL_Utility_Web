import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StageDmd2Component } from './stage-dmd2.component';

describe('StageDmd2Component', () => {
  let component: StageDmd2Component;
  let fixture: ComponentFixture<StageDmd2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StageDmd2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StageDmd2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
