import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalDeduplicationstatusComponent } from './modal-deduplicationstatus.component';

describe('ModalDeduplicationstatusComponent', () => {
  let component: ModalDeduplicationstatusComponent;
  let fixture: ComponentFixture<ModalDeduplicationstatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalDeduplicationstatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalDeduplicationstatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
