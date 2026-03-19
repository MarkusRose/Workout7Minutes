import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { WorkoutActions } from './workout.actions';
import { exhaustMap, map } from 'rxjs';
import { WorkoutApiService } from '../services/workout-api.service';

@Injectable()
export class WorkoutEffects {
  private readonly actions$ = inject(Actions);
  private readonly workoutApi = inject(WorkoutApiService);

  loadWorkoutSession$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(WorkoutActions.loadWorkoutSession),
      exhaustMap(() =>
        this.workoutApi
          .loadWorkout()
          .pipe(map((workout) => WorkoutActions.addWorkoutSession({ workout }))),
      ),
    );
  });
}
