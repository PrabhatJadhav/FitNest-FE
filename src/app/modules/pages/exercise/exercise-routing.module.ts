import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExerciseComponent } from './exercise.component';
import { ExerciesGuideComponent } from './components/exercies-guide/exercies-guide.component';
import { MuscleGroupComponent } from './components/muscle-group/muscle-group.component';
import { EXERCISE_GUIDE_URL, MUSCLE_GROUP_URL } from 'src/app/core/constants/app-routes';
import { CommonModule } from '@angular/common';

const routes: Routes = [
  {
    path: '',
    component: ExerciseComponent,
    children: [
      { path: '', redirectTo: EXERCISE_GUIDE_URL, pathMatch: 'full' },
      { path: EXERCISE_GUIDE_URL, component: ExerciesGuideComponent },
      { path: `${MUSCLE_GROUP_URL}/:muscleType`, component: MuscleGroupComponent },
    ],
  },
];

@NgModule({
  declarations: [MuscleGroupComponent, ExerciesGuideComponent],
  imports: [RouterModule.forChild(routes), CommonModule],
  exports: [RouterModule],
})
export class ExerciseRoutingModule {}
