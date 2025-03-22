import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllRecipiesComponent } from './all-recipies.component';

describe('AllRecipiesComponent', () => {
  let component: AllRecipiesComponent;
  let fixture: ComponentFixture<AllRecipiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AllRecipiesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllRecipiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
