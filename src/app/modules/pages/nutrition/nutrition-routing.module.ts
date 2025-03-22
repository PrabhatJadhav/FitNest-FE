import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  ALL_RECIPES_URL,
  BEST_RESULTS_WORKOUTS_URL,
  CALORIES_MACROS_URL,
  CUSTOM_WORKOUTS_URL,
  FAVOURITE_RECIPES_URL,
  FAVOURITE_WORKOUTS_URL,
  MEAL_PLANNER_URL,
  RECIPES_BASE_URL,
  TRENDING_RECIPES_URL,
  WORKOUTS_BASE_URL,
} from 'src/app/core/constants/app-routes';
import { CommonModule } from '@angular/common';
import { NutritionComponent } from './nutrition.component';
import { CaloriesAndMacrosComponent } from './components/calories-and-macros/calories-and-macros.component';
import { MealPlannerComponent } from './components/meal-planner/meal-planner.component';
import { RecipiesComponent } from './components/recipies/recipies.component';
import { AllRecipiesComponent } from './components/recipies/component/all-recipies/all-recipies.component';
import { FavouriteRecipesComponent } from './components/recipies/component/favourite-recipes/favourite-recipes.component';
import { TrendingRecipesComponent } from './components/recipies/component/trending-recipes/trending-recipes.component';

const routes: Routes = [
  {
    path: '',
    component: NutritionComponent,
    children: [
      { path: '', redirectTo: CALORIES_MACROS_URL, pathMatch: 'full' },
      { path: CALORIES_MACROS_URL, component: CaloriesAndMacrosComponent },
      { path: MEAL_PLANNER_URL, component: MealPlannerComponent },
      {
        path: RECIPES_BASE_URL,
        component: RecipiesComponent,
        children: [
          { path: '', redirectTo: ALL_RECIPES_URL, pathMatch: 'full' },
          { path: ALL_RECIPES_URL, component: AllRecipiesComponent },
          { path: FAVOURITE_RECIPES_URL, component: FavouriteRecipesComponent },
          { path: TRENDING_RECIPES_URL, component: TrendingRecipesComponent },
        ],
      },
    ],
  },
];

@NgModule({
  declarations: [
    NutritionComponent,
    CaloriesAndMacrosComponent,
    MealPlannerComponent,
    RecipiesComponent,
    AllRecipiesComponent,
    FavouriteRecipesComponent,
    TrendingRecipesComponent,
  ],
  imports: [RouterModule.forChild(routes), CommonModule],
  exports: [RouterModule],
})
export class NutritionRoutingModule {}
