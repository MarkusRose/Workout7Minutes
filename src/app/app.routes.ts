import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('../components/workout-action/workout-action.component').then(m => m.WorkoutActionComponent),
  },
  {
    path: 'session',
    loadComponent: () => import('../components/workout-session/workout-session.component').then(m => m.WorkoutSessionComponent),
  }
];
