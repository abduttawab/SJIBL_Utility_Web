import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageModComponent } from './message-mod.component';

describe('MessageModComponent', () => {
  let component: MessageModComponent;
  let fixture: ComponentFixture<MessageModComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MessageModComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MessageModComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
