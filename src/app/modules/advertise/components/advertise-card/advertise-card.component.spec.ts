import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvertiseCardComponent } from './advertise-card.component';

describe('AdvertiseCardComponent', () => {
  let component: AdvertiseCardComponent;
  let fixture: ComponentFixture<AdvertiseCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdvertiseCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdvertiseCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
