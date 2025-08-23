import { Component, signal, computed, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { interval, tap, filter, Subscription, Subject, takeUntil } from 'rxjs';

const WORKOUT_ACTION_DURATION = 4; // 30 second duration per action
const WORKOUT_REST_DURATION = 15; // 15 second rest duration
const WORKOUT_STOPPED = 0; // needs user interaction
enum ACTION_TYPE {
  ACTIVE='ACTIVE',
  BREAK='BREAK',
  START='START',
  FINISH='FINISH',
};

const PAUSE_WORKOUT_ACTION: WorkoutAction = {
  name: 'Break', timer: WORKOUT_REST_DURATION, type: ACTION_TYPE.BREAK,
}
const ACTIVE_WORKOUT_ACTION: WorkoutAction = {
  name: 'Action',
  timer: WORKOUT_ACTION_DURATION,
  type: ACTION_TYPE.ACTIVE,
}

@Component({
  selector: 'app-root',
  imports: [CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly isPaused = signal(false);
  protected readonly title = '7 Minute Workout';
  protected readonly currentAction = computed(() => this.workoutActions[this.currentActionIndex()]);
  protected readonly nextAction = computed(() => this.setNextAction());
  protected readonly displayTimer = computed(() => {
    const value = this.currentAction().timer - this.tick();
    if (value < 0) {
      return 0;
    }
    return value;
  });

  private actionStartTime: Date;
  private intervalTimerSubscription: Subscription | undefined;

  private readonly timerRanOut = new Subject<void>();
  private readonly tick = signal(0);
  private readonly workoutActions: WorkoutAction[] = [
    { name: 'Start', timer: WORKOUT_STOPPED, type: ACTION_TYPE.START },
    { ...ACTIVE_WORKOUT_ACTION, name: 'Jumping Jacks' },
    PAUSE_WORKOUT_ACTION,
    { ...ACTIVE_WORKOUT_ACTION,  name: 'Push Ups' },
    PAUSE_WORKOUT_ACTION,
    { ...ACTIVE_WORKOUT_ACTION,  name:  'Wall Sit' },
    PAUSE_WORKOUT_ACTION,
    { ...ACTIVE_WORKOUT_ACTION,  name: 'Lunges' },
    PAUSE_WORKOUT_ACTION,
    { ...ACTIVE_WORKOUT_ACTION,  name: 'Chair Dips' },
    PAUSE_WORKOUT_ACTION,
    { ...ACTIVE_WORKOUT_ACTION,  name: 'Plank' },
    PAUSE_WORKOUT_ACTION,
    { ...ACTIVE_WORKOUT_ACTION,  name: 'Burpees' },
    PAUSE_WORKOUT_ACTION,
    { ...ACTIVE_WORKOUT_ACTION,  name: 'Push Up with Rotation' },
    { name: 'Complete!', timer: WORKOUT_STOPPED, type: ACTION_TYPE.FINISH },
  ];
  private readonly soundChime = new Audio();
  private readonly currentActionIndex = signal(0);

  constructor() {
    this.actionStartTime = new Date();
  }

  public ngOnInit(): void {
    this.timerRanOut.asObservable().pipe(tap(() => {
      this.startNextAction();
      this.soundChime.play();
    })).subscribe();

    this.soundChime.src = './chime-sound.mp3';
    this.soundChime.load();
  }

  public startNextAction(): void {
    this.intervalTimerSubscription?.unsubscribe();
    this.currentActionIndex.update(value => (value + 1) % this.workoutActions.length);
    if (this.currentAction().timer > 0) {
      this.runIntervalTimer();
    }
  }

  private setNextAction(): WorkoutAction {
    return this.workoutActions[this.getNextActionIndex(this.currentActionIndex())];
  }


  private getNextActionIndex(index: number): number {
    const nextAction = this.workoutActions[(index + 1) % this.workoutActions.length]
    if (nextAction.type === ACTION_TYPE.BREAK) {
      return this.getNextActionIndex(index + 1);
    }
    return (index + 1) % this.workoutActions.length;
  }

  public pauseToggle(): void {
    this.isPaused.update((value) => !value);
  }

  public reset(): void {
    this.isPaused.set(false);
    this.timerRanOut.next();
    this.currentActionIndex.set(0);
  }

  private runIntervalTimer(): void {
    this.intervalTimerSubscription?.unsubscribe();
    this.tick.set(0);
    this.intervalTimerSubscription = interval(1000).pipe(
      filter(() => !this.isPaused()),
      tap(() => {
        this.tick.update((value) => value + 1);
        if (this.currentAction().timer > 0 && this.tick() > this.currentAction().timer) {
          this.timerRanOut.next();
        }
      }),
      takeUntil(this.timerRanOut.asObservable())
    ).subscribe();
  }
}

interface WorkoutAction {
  name: string;
  timer: number;
  type: ACTION_TYPE;
}

