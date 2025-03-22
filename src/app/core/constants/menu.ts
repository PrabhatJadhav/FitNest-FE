import { MenuItem } from '../models/menu.model';
import { DASHBOARD_PAGE_URL, EXERCISE_BASE_URL, EXERCISE_GUIDE_URL, MUSCLE_GROUP_URL } from './app-routes';

export class Menu {
  public static pages: MenuItem[] = [
    {
      group: 'Home',
      separator: true,
      items: [
        {
          icon: 'assets/icons/heroicons/outline/chart-pie.svg',
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
          icon: 'assets/icons/heroicons/outline/download.svg',
          label: 'Custom',
          route: '/download',
        },
        {
          icon: 'assets/icons/heroicons/outline/gift.svg',
          label: 'Best Results',
          route: '/gift',
        },
        {
          icon: 'assets/icons/heroicons/outline/users.svg',
          label: 'Favourite',
          route: '/users',
        },
      ],
    },
    {
      group: 'Exercise Library',
      separator: true,
      items: [
        {
          icon: 'assets/icons/heroicons/outline/cog.svg',
          label: 'Exercise Guides',
          route: `/${EXERCISE_BASE_URL}/${EXERCISE_GUIDE_URL}`,
        },
        {
          icon: 'assets/icons/heroicons/outline/folder.svg',
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
          icon: 'assets/icons/heroicons/outline/download.svg',
          label: 'Recipes',
          route: '/download',
          children: [
            { label: 'All', route: '/folders/current-files' },
            { label: 'Trending', route: '/folders/download' },
            { label: 'Favourite', route: '/folders/trash' },
          ],
        },
        {
          icon: 'assets/icons/heroicons/outline/gift.svg',
          label: 'Meal Planner',
          route: '/gift',
        },
        {
          icon: 'assets/icons/heroicons/outline/users.svg',
          label: 'Calories & Macros',
          route: '/users',
        },
      ],
    },
  ];
  // public static pages: MenuItem[] = [
  //   {
  //     group: 'Base',
  //     separator: false,
  //     items: [
  //       {
  //         icon: 'assets/icons/heroicons/outline/chart-pie.svg',
  //         label: 'Dashboard',
  //         route: '/dashboard',
  //         children: [
  //           { label: 'Nfts', route: '/dashboard/nfts' },
  //           // { label: 'Podcast', route: '/dashboard/podcast' },
  //         ],
  //       },
  //       {
  //         icon: 'assets/icons/heroicons/outline/lock-closed.svg',
  //         label: 'Auth',
  //         route: '/auth',
  //         children: [
  //           { label: 'Sign up', route: '/auth/sign-up' },
  //           { label: 'Sign in', route: '/auth/sign-in' },
  //           { label: 'Forgot Password', route: '/auth/forgot-password' },
  //           { label: 'New Password', route: '/auth/new-password' },
  //           { label: 'Two Steps', route: '/auth/two-steps' },
  //         ],
  //       },
  //       {
  //         icon: 'assets/icons/heroicons/outline/exclamation-triangle.svg',
  //         label: 'Erros',
  //         route: '/errors',
  //         children: [
  //           { label: '404', route: '/errors/404' },
  //           { label: '500', route: '/errors/500' },
  //         ],
  //       },
  //       {
  //         icon: 'assets/icons/heroicons/outline/cube.svg',
  //         label: 'Components',
  //         route: '/components',
  //         children: [{ label: 'Table', route: '/components/table' }],
  //       },
  //     ],
  //   },
  //   {
  //     group: 'Collaboration',
  //     separator: true,
  //     items: [
  //       {
  //         icon: 'assets/icons/heroicons/outline/download.svg',
  //         label: 'Download',
  //         route: '/download',
  //       },
  //       {
  //         icon: 'assets/icons/heroicons/outline/gift.svg',
  //         label: 'Gift Card',
  //         route: '/gift',
  //       },
  //       {
  //         icon: 'assets/icons/heroicons/outline/users.svg',
  //         label: 'Users',
  //         route: '/users',
  //       },
  //     ],
  //   },
  //   {
  //     group: 'Config',
  //     separator: false,
  //     items: [
  //       {
  //         icon: 'assets/icons/heroicons/outline/cog.svg',
  //         label: 'Settings',
  //         route: '/settings',
  //       },
  //       {
  //         icon: 'assets/icons/heroicons/outline/bell.svg',
  //         label: 'Notifications',
  //         route: '/gift',
  //       },
  //       {
  //         icon: 'assets/icons/heroicons/outline/folder.svg',
  //         label: 'Folders',
  //         route: '/folders',
  //         children: [
  //           { label: 'Current Files', route: '/folders/current-files' },
  //           { label: 'Downloads', route: '/folders/download' },
  //           { label: 'Trash', route: '/folders/trash' },
  //         ],
  //       },
  //     ],
  //   },
  // ];
}
