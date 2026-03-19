import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { WorkoutSessionJson } from '../entities/workout.entities';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class WorkoutApiService {
  private readonly http = inject(HttpClient);

  public loadWorkout(fileName: string): Observable<WorkoutSessionJson> {
    const fileUrl = `workouts/${fileName}.json`;
    return this.http.get<WorkoutSessionJson>(fileUrl);
  }
}
