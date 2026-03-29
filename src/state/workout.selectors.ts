import { createFeatureSelector, createSelector } from '@ngrx/store';
import { WorkoutState } from './workout.reducer';
import { WorkoutSessionJson, WorkoutSession, WorkoutProperties, EMPTY_WORKOUT_SESSION } from '../entities/workout.entities';
import { getWorkoutSessionFromJson } from '../utils/workout.util';

const selectFeature = createFeatureSelector<WorkoutState>('workout');

export const selectWorkoutList = createSelector(
  selectFeature,
  (state: WorkoutState): WorkoutProperties[] =>
    state.workouts.map(({ name, icon }) => ({ name, icon }))
);

export const selectActiveWorkoutSteps = createSelector(
  selectFeature,
  (state: WorkoutState): WorkoutSessionJson =>
    state.activeWorkout >= 0 && state.workouts.length > 0
      ? state.workouts[state.activeWorkout]
      : EMPTY_WORKOUT_SESSION,
);

export const selectActiveWorkout = createSelector(
  selectFeature,
  (state: WorkoutState): WorkoutSession =>
    getWorkoutSessionFromJson(
      state.activeWorkout >= 0 && state.workouts.length > 0
        ? state.workouts[state.activeWorkout]
        : EMPTY_WORKOUT_SESSION,
    ),
);
