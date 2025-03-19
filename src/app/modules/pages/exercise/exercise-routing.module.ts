import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExerciseComponent } from './exercise.component';
import { ExerciesGuideComponent } from './components/exercies-guide/exercies-guide.component';
import { MuscleGroupComponent } from './components/muscle-group/muscle-group.component';

const routes: Routes = [
  {
    path: '',
    component: ExerciseComponent,
    children: [
      { path: '', redirectTo: 'exercise-guide', pathMatch: 'full' },
      { path: 'exercise-guide', component: ExerciesGuideComponent },
      { path: 'muscle-group', component: MuscleGroupComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExerciseRoutingModule {}
