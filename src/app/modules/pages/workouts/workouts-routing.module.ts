import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  BEST_RESULTS_WORKOUTS_URL,
  CUSTOM_WORKOUTS_URL,
  FAVOURITE_WORKOUTS_URL,
  WORKOUTS_BASE_URL,
} from 'src/app/core/constants/app-routes';
import { CommonModule } from '@angular/common';
import { WorkoutsComponent } from './workouts.component';
import { CustomWorkoutComponent } from './components/custom-workout/custom-workout.component';
import { FavouritesComponent } from './components/favourites/favourites.component';
import { BestResultsComponent } from './components/best-results/best-results.component';

const routes: Routes = [
  {
    path: '',
    component: WorkoutsComponent,
    children: [
      { path: '', redirectTo: CUSTOM_WORKOUTS_URL, pathMatch: 'full' },
      { path: CUSTOM_WORKOUTS_URL, component: CustomWorkoutComponent },
      { path: FAVOURITE_WORKOUTS_URL, component: FavouritesComponent },
      { path: BEST_RESULTS_WORKOUTS_URL, component: BestResultsComponent },
    ],
  },
];

@NgModule({
  declarations: [CustomWorkoutComponent, FavouritesComponent, BestResultsComponent],
  imports: [RouterModule.forChild(routes), CommonModule],
  exports: [RouterModule],
})
export class WorkoutsRoutingModule {}
