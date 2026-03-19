import { createReducer, on } from '@ngrx/store';
import { WorkoutSessionJson } from '../entities/workout.entities';
import { WorkoutActions } from './workout.actions';

export interface WorkoutState {
  workouts: WorkoutSessionJson[];
  activeWorkout: number;
}

export const initialState: WorkoutState = {
  workouts: [],
  activeWorkout: -1,
};

const addAndSetWorkoutSession = (
  state: WorkoutState,
  workout: WorkoutSessionJson,
): WorkoutState => ({
  ...state,
  workouts: [...state.workouts, workout],
  activeWorkout: state.workouts.length,
});

export const workoutReducer = createReducer(
  initialState,
  on(WorkoutActions.addWorkoutSession, (state, { workout }) =>
    addAndSetWorkoutSession(state, workout),
  ),
);
