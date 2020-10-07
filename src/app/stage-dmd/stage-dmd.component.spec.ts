import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StageDmdComponent } from './stage-dmd.component';

describe('StageDmdComponent', () => {
  let component: StageDmdComponent;
  let fixture: ComponentFixture<StageDmdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StageDmdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StageDmdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
