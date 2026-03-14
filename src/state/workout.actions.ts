import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { WorkoutSessionJson } from '../services/workout-session.service';

export const WorkoutActions = createActionGroup({
  source: '[WorkoutSession]',
  events: {
    loadWorkoutSession: emptyProps(),
    addWorkoutSession: props<{ workout: WorkoutSessionJson }>(),
  },
});
