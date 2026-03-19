import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectActiveWorkout, selectWorkoutList } from '../state/workout.selectors';
import { WorkoutActions } from '../state/workout.actions';
import { WorkoutSession } from '../entities/workout.entities';

@Injectable({ providedIn: 'root' })
export class WorkoutSessionService {
  public currentWorkout$: Observable<WorkoutSession>;
  public workoutList$: Observable<{ name: string; icon: string }[]>;

  private readonly store = inject(Store);

  constructor() {
    this.currentWorkout$ = this.store.select(selectActiveWorkout);
    this.workoutList$ = this.store.select(selectWorkoutList);
    this.init();
  }

  public init(): void {
    this.loadWorkouts(['workout1', 'workout1', 'workout2'])
  }

  private loadWorkouts(nameList: string[]): void {
    nameList.forEach((name) => {
      console.log(name);
      this.store.dispatch(WorkoutActions.loadWorkoutSession({ name }));
    });
  }

  public chooseWorkout(name: string): void {
    this.store.dispatch(WorkoutActions.chooseWorkoutSession({ name }));
  }
}
