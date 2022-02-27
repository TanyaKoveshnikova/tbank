import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AunthetiatedComponent } from './aunthetiated.component';

describe('AunthetiatedComponent', () => {
  let component: AunthetiatedComponent;
  let fixture: ComponentFixture<AunthetiatedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AunthetiatedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AunthetiatedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
