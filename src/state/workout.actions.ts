import { createActionGroup, props } from '@ngrx/store';
import { WorkoutSessionJson } from '../entities/workout.entities';

export const WorkoutActions = createActionGroup({
  source: '[WorkoutSession]',
  events: {
    loadWorkoutSession: props<{ name: string }>(),
    addWorkoutSession: props<{ workout: WorkoutSessionJson }>(),
    chooseWorkoutSession: props<{ name: string }>(),
  },
});
