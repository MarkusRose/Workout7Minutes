import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectActiveWorkout } from '../state/workout.selectors';
import { WorkoutActions } from '../state/workout.actions';

const WORKOUT_STOPPED = 0; // needs user interaction

@Injectable({ providedIn: 'root' })
export class WorkoutSessionService {
  public currentWorkout$: Observable<WorkoutSession>;

  private readonly store = inject(Store);

  constructor() {
    this.currentWorkout$ = this.store.select(selectActiveWorkout);
  }

  public loadWorkout(): void {
    this.store.dispatch(WorkoutActions.loadWorkoutSession());
  }
}

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
