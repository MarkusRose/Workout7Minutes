const WORKOUT_STOPPED = 0; // needs user interaction

export interface WorkoutSessionJson extends WorkoutProperties {
  workout: string[];
};

export interface WorkoutSession extends WorkoutProperties {
  workout: WorkoutAction[];
};

export type WorkoutProperties = {
  name: string;
  icon: string;
  durations?: {
    active: number;
    pause: number;
  };
}

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
} as const;

export const EMPTY_WORKOUT_SESSION: WorkoutSessionJson = {
  workout: [],
  name: '',
  icon: '',
}

