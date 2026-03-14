import { createFeatureSelector, createSelector } from '@ngrx/store';
import { WorkoutState } from './workout.reducer';
import { WorkoutSession } from '../services/workout-session.service';
import { getWorkoutSessionFromJson } from '../utils/workout.util';

const selectFeature = createFeatureSelector<WorkoutState>('workout');

export const selectActiveWorkout = createSelector(
  selectFeature,
  (state: WorkoutState): WorkoutSession =>
    getWorkoutSessionFromJson(
      state.activeWorkout >= 0 && state.workouts.length > 0
        ? state.workouts[state.activeWorkout]
        : { workout: [] },
    ),
);
