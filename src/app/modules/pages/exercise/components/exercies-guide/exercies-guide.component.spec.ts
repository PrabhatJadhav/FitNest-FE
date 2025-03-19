import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExerciesGuideComponent } from './exercies-guide.component';

describe('ExerciesGuideComponent', () => {
  let component: ExerciesGuideComponent;
  let fixture: ComponentFixture<ExerciesGuideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExerciesGuideComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExerciesGuideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
