import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

const WORKOUT_ACTION_DURATION = 30; // 30 second duration per action
const WORKOUT_REST_DURATION = 10; // 10 second rest duration
const WORKOUT_STOPPED = 0; // needs user interaction

@Injectable({ providedIn: 'root' })
export class WorkoutSessionService {
  public currentWorkout$: Observable<WorkoutSession>;
  private readonly http = inject(HttpClient);

  constructor() {
    this.currentWorkout$ = this.getWorkoutSessions();
  }

  private readSessionFromFile(filename: string): Observable<WorkoutSessionJson> {
    const fileUrl = `workouts/${filename}`;
    return this.http.get<WorkoutSessionJson>(fileUrl);
  }

  private getWorkoutSessions(): Observable<WorkoutSession> {
    return this.readSessionFromFile('workout1.json').pipe(
      map((session) => {
        const outSession: WorkoutAction[] = [];
        outSession.push({ action: 'START', timer: WORKOUT_STOPPED, type: ACTION_TYPE.START });
        session.workout.forEach((action, i) => {
          outSession.push({ action, timer: WORKOUT_ACTION_DURATION, type: ACTION_TYPE.ACTIVE });
          i < session.workout.length - 1 &&
            outSession.push({ action, timer: WORKOUT_REST_DURATION, type: ACTION_TYPE.BREAK });
        });
        outSession.push({ action: 'COMPLETE', timer: WORKOUT_STOPPED, type: ACTION_TYPE.FINISH });
        return { workout: outSession };
      }),
    );
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
