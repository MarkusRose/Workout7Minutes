import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'workout-session',
  imports: [CommonModule],
  templateUrl: './workout-session.component.html',
  styleUrl: './workout-session.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WorkoutSessionComponent {
}
