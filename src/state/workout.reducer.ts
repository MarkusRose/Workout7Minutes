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
  workouts: [...state.workouts.filter((wkout) => wkout.name !== workout.name), workout],
  activeWorkout: 0,
});

export const workoutReducer = createReducer(
  initialState,
  on(WorkoutActions.addWorkoutSession, (state, { workout }) =>
    addAndSetWorkoutSession(state, workout),
  ),
  on(WorkoutActions.chooseWorkoutSession, (state, { name }) => {
    const index = state.workouts.findIndex((workout) => workout.name === name);
    return {
      ...state,
      activeWorkout: index > -1 ? index : 0,
    }
  }),
);
