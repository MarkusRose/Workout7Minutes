import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: 'workout-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule],
})
export class SidebarComponent {
  private readonly router = inject(Router)
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
  public menuItems: MenuItem[] = [
    {
      name: 'Workout 1',
      icon: '💪',
    },
    {
      name: 'Workout 2',
      icon: '🧘',
    },
    {
      name: 'Workout 3',
      icon: '🚴',
    },
  ];

  public redirectTo(route: string): void {
    this.router.navigateByUrl(`/${route}`);
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
