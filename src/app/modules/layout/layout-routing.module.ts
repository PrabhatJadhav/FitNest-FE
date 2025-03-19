import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout.component';

const routes: Routes = [
  {
    path: 'dashboard',
    component: LayoutComponent,
    loadChildren: () => import('../dashboard/dashboard.module').then((m) => m.DashboardModule),
  },
  {
    path: 'exercise',
    component: LayoutComponent,
    loadChildren: () => import('../pages/exercise/exercise.module').then((m) => m.ExerciseModule),
  },
  // {
  //   path: 'components',
  //   component: LayoutComponent,
  //   loadChildren: () => import('../uikit/uikit.module').then((m) => m.UikitModule),
  // },
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LayoutRoutingModule {}
