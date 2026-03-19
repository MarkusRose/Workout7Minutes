import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkoutSessionService } from '../../services/workout-session.service';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'workout-session',
  imports: [CommonModule],
  templateUrl: './workout-session.component.html',
  styleUrl: './workout-session.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WorkoutSessionComponent {
  private readonly workoutService = inject(WorkoutSessionService);
  public readonly currentSession = toSignal(this.workoutService.currentWorkoutSteps$);
}
