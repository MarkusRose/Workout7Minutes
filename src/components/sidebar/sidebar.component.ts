import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { toSignal } from "@angular/core/rxjs-interop";
import { Router } from "@angular/router";
import { WorkoutSessionService } from "../../services/workout-session.service";
import { tap } from "rxjs";

@Component({
  selector: 'workout-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule],
})
export class SidebarComponent {
  private readonly router = inject(Router);
  private readonly workoutService = inject(WorkoutSessionService);
  public readonly workoutList = toSignal(this.workoutService.workoutList$.pipe(tap((list) => console.log(list))));


  public modes: ModeItem[] = [
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
  ]

  public redirectTo(route: string): void {
    this.router.navigateByUrl(`/${route}`);
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
interface MenuItem {
  name: string;
  icon: string;
}
