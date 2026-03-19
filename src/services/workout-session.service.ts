import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectActiveWorkout } from '../state/workout.selectors';
import { WorkoutActions } from '../state/workout.actions';
import { WorkoutSession } from '../entities/workout.entities';

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
