import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeAunthetiatedComponent } from './home-aunthetiated.component';

describe('HomeAunthetiatedComponent', () => {
  let component: HomeAunthetiatedComponent;
  let fixture: ComponentFixture<HomeAunthetiatedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeAunthetiatedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeAunthetiatedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
