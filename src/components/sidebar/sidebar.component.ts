import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import { WorkoutSessionService } from '../../services/workout-session.service';
import { tap, map } from 'rxjs';

@Component({
  selector: 'workout-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
})
export class SidebarComponent {
  public readonly modes: ModeItem[] = [
    {
      name: 'Work out',
      icon: '▶️',
      route: '',
    },
    {
      name: 'Edit',
      icon: '🖋️',
      route: 'session',
    },
  ] as const;

  private readonly router = inject(Router);
  private readonly workoutService = inject(WorkoutSessionService);
  public readonly workoutList = toSignal(
    this.workoutService.workoutList$.pipe(tap((list) => console.log(list))),
  );
  public readonly selectedWorkoutName = toSignal(
    this.workoutService.currentWorkout$.pipe(map((workout) => workout.name)),
  );
  public readonly activeModeName = signal(this.modes[0].name);

  public redirectTo(mode: ModeItem): void {
    this.activeModeName.set(mode.name);
    this.router.navigateByUrl(`/${mode.route}`);
  }

  public chooseWorkout(name: string): void {
    this.workoutService.chooseWorkout(name);
  }
}

interface ModeItem {
  name: string;
  icon: string;
  route: string;
}
