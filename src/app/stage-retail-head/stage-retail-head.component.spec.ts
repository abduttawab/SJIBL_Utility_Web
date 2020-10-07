import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StageRetailHeadComponent } from './stage-retail-head.component';

describe('StageRetailHeadComponent', () => {
  let component: StageRetailHeadComponent;
  let fixture: ComponentFixture<StageRetailHeadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StageRetailHeadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StageRetailHeadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
