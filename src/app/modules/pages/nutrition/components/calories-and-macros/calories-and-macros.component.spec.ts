import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaloriesAndMacrosComponent } from './calories-and-macros.component';

describe('CaloriesAndMacrosComponent', () => {
  let component: CaloriesAndMacrosComponent;
  let fixture: ComponentFixture<CaloriesAndMacrosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CaloriesAndMacrosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CaloriesAndMacrosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
