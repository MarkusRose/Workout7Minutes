import { createFeatureSelector, createSelector } from '@ngrx/store';
import { WorkoutState } from './workout.reducer';
import { WorkoutSession } from '../entities/workout.entities';
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
