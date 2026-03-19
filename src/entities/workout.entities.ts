const WORKOUT_STOPPED = 0; // needs user interaction

export type WorkoutSessionJson = {
  workout: string[];
};

export type WorkoutSession = {
  workout: WorkoutAction[];
};

export interface WorkoutAction {
  action: string;
  timer: number;
  type: ACTION_TYPE;
}

export enum ACTION_TYPE {
  ACTIVE = 'ACTIVE',
  BREAK = 'BREAK',
  START = 'START',
  FINISH = 'FINISH',
}

export const EMPTY_ACTION: WorkoutAction = {
  action: 'Select Workout',
  timer: WORKOUT_STOPPED,
  type: ACTION_TYPE.START,
};
