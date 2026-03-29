import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { WorkoutSessionService } from '../../services/workout-session.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { tap } from 'rxjs';

@Component({
  selector: 'workout-session',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './workout-session.component.html',
  styleUrl: './workout-session.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WorkoutSessionComponent {
  private readonly formBuilder = inject(FormBuilder);
  private readonly workoutService = inject(WorkoutSessionService);
  public readonly sessionActionsForm = this.formBuilder.array([])
  public readonly currentSession = toSignal(this.workoutService.currentWorkoutSteps$.pipe(tap((session) => {
    this.sessionActionsForm.clear();
    session.workout.forEach((action) => this.sessionActionsForm.push(this.formBuilder.control(action)));
  })));
}
