import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { WorkoutSessionJson } from '../entities/workout.entities';

export const WorkoutActions = createActionGroup({
  source: '[WorkoutSession]',
  events: {
    loadWorkoutSession: emptyProps(),
    addWorkoutSession: props<{ workout: WorkoutSessionJson }>(),
  },
});
