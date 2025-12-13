import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable } from 'rxjs'

@Injectable({ providedIn: 'root'})
export class WorkoutSessionService {
  private readonly http = inject(HttpClient);

  public readSessionFromFile(filename: string): Observable<WorkoutSession> {
    const fileUrl = `workouts/${filename}`;
    return this.http.get<WorkoutSession>(fileUrl);
  }
}

export type WorkoutSession = {
  workout: string[];
}
