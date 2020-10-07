import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StageBoardSecretaryComponent } from './stage-board-secretary.component';

describe('StageCardOperationComponent', () => {
  let component: StageBoardSecretaryComponent;
  let fixture: ComponentFixture<StageBoardSecretaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StageBoardSecretaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StageBoardSecretaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
