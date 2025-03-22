import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout.component';
import {
  DASHBOARD_PAGE_URL,
  EXERCISE_BASE_URL,
  NUTRITION_BASE_URL,
  WORKOUTS_BASE_URL,
} from 'src/app/core/constants/app-routes';

const routes: Routes = [
  {
    path: DASHBOARD_PAGE_URL,
    component: LayoutComponent,
    loadChildren: () => import('../dashboard/dashboard.module').then((m) => m.DashboardModule),
  },
  {
    path: EXERCISE_BASE_URL,
    component: LayoutComponent,
    loadChildren: () => import('../pages/exercise/exercise.module').then((m) => m.ExerciseModule),
  },
  {
    path: WORKOUTS_BASE_URL,
    component: LayoutComponent,
    loadChildren: () => import('../pages/workouts/workouts.module').then((m) => m.WorkoutsModule),
  },
  {
    path: NUTRITION_BASE_URL,
    component: LayoutComponent,
    loadChildren: () => import('../pages/nutrition/nutrition.module').then((m) => m.NutritionModule),
  },
  // {
  //   path: 'components',
  //   component: LayoutComponent,
  //   loadChildren: () => import('../uikit/uikit.module').then((m) => m.UikitModule),
  // },
  { path: '', redirectTo: DASHBOARD_PAGE_URL, pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LayoutRoutingModule {}
