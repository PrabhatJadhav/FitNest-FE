import { MenuItem } from '../models/menu.model';
import {
  ALL_RECIPES_URL,
  BEST_RESULTS_WORKOUTS_URL,
  CALORIES_MACROS_URL,
  CUSTOM_WORKOUTS_URL,
  DASHBOARD_PAGE_URL,
  EXERCISE_BASE_URL,
  EXERCISE_GUIDE_URL,
  FAVOURITE_RECIPES_URL,
  FAVOURITE_WORKOUTS_URL,
  MEAL_PLANNER_URL,
  MUSCLE_GROUP_URL,
  NUTRITION_BASE_URL,
  RECIPES_BASE_URL,
  TRENDING_RECIPES_URL,
  WORKOUTS_BASE_URL,
} from './app-routes';

export class Menu {
  public static pages: MenuItem[] = [
    {
      group: 'Home',
      separator: true,
      items: [
        {
          icon: 'ph-chart-donut',
          label: 'Dashboard',
          route: `/${DASHBOARD_PAGE_URL}`,
        },
      ],
    },
    {
      group: 'Workouts',
      separator: true,
      items: [
        {
          icon: 'ph-barbell',
          label: 'Custom',
          route: `/${WORKOUTS_BASE_URL}/${CUSTOM_WORKOUTS_URL}`,
        },
        {
          icon: 'ph-lockers',
          label: 'Best Results',
          route: `/${WORKOUTS_BASE_URL}/${FAVOURITE_WORKOUTS_URL}`,
        },
        {
          icon: 'ph-heart-straight',
          label: 'Favourite',
          route: `/${WORKOUTS_BASE_URL}/${BEST_RESULTS_WORKOUTS_URL}`,
        },
      ],
    },
    {
      group: 'Exercise Library',
      separator: true,
      items: [
        {
          icon: 'ph-notebook',
          label: 'Exercise Guides',
          route: `/${EXERCISE_BASE_URL}/${EXERCISE_GUIDE_URL}`,
        },
        {
          icon: 'ph-book',
          label: 'Muscle Group',
          route: `/${EXERCISE_BASE_URL}/${MUSCLE_GROUP_URL}`,
          children: [
            { label: 'Shoulder', route: `/${EXERCISE_BASE_URL}/${MUSCLE_GROUP_URL}/shoulder` },
            { label: 'Chest', route: `/${EXERCISE_BASE_URL}/${MUSCLE_GROUP_URL}/chest` },
            { label: 'Back', route: `/${EXERCISE_BASE_URL}/${MUSCLE_GROUP_URL}/back` },
            { label: 'Biceps', route: `/${EXERCISE_BASE_URL}/${MUSCLE_GROUP_URL}/biceps` },
            { label: 'Triceps', route: `/${EXERCISE_BASE_URL}/${MUSCLE_GROUP_URL}/triceps` },
            { label: 'Legs', route: `/${EXERCISE_BASE_URL}/${MUSCLE_GROUP_URL}/legs` },
          ],
        },
      ],
    },
    {
      group: 'Nutrition',
      separator: false,
      items: [
        {
          icon: 'ph-jar-label',
          label: 'Calories & Macros',
          route: `/${NUTRITION_BASE_URL}/${CALORIES_MACROS_URL}`,
        },
        {
          icon: 'ph-bowl-steam',
          label: 'Meal Planner',
          route: `/${NUTRITION_BASE_URL}/${MEAL_PLANNER_URL}`,
        },
        {
          icon: 'ph-cooking-pot',
          label: 'Recipes',
          route: `/${NUTRITION_BASE_URL}/${RECIPES_BASE_URL}`,
          children: [
            { label: 'All', route: `/${NUTRITION_BASE_URL}/${RECIPES_BASE_URL}/${ALL_RECIPES_URL}` },
            { label: 'Trending', route: `/${NUTRITION_BASE_URL}/${RECIPES_BASE_URL}/${TRENDING_RECIPES_URL}` },
            { label: 'Favourite', route: `/${NUTRITION_BASE_URL}/${RECIPES_BASE_URL}/${FAVOURITE_RECIPES_URL}` },
          ],
        },
      ],
    },
  ];
}
