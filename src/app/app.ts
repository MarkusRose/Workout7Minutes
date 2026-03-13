import { Component, signal, computed, inject, } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common';
import { interval, tap, filter, Subscription, Subject, takeUntil, map } from 'rxjs';
import {
  WorkoutSessionService,
  WorkoutAction,
  WorkoutSession,
  ACTION_TYPE,
  EMPTY_ACTION,
} from '../services/workout-session.service';

@Component({
  selector: 'app-root',
  imports: [CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  private readonly workoutSessionService = inject(WorkoutSessionService);
  public readonly isPaused = signal(false);
  public readonly title = '7 Minute Workout';
  public readonly currentAction = computed(() =>
    this.workoutActions()?.length > 0
      ? this.workoutActions()?.[this.currentActionIndex()]
      : EMPTY_ACTION,
  );
  public readonly nextAction = computed(() => this.setNextAction());
  public readonly displayTimer = computed(() => {
    const value = this.currentAction().timer - this.tick();
    if (value < 0) {
      return 0;
    }
    return value;
  });

  private intervalTimerSubscription: Subscription | undefined;

  private workoutActions = toSignal(this.workoutSessionService.currentWorkout$.pipe(
    filter((workout): workout is WorkoutSession => !!workout),
    map((workoutSession) => {
      return workoutSession.workout ?? [EMPTY_ACTION];
    })
  ), { initialValue: [EMPTY_ACTION] });
  private readonly timerRanOut = new Subject<void>();
  private readonly tick = signal(0);
  private readonly soundChime = new Audio();
  private readonly currentActionIndex = signal(0);


  public ngOnInit(): void {
    this.timerRanOut
      .asObservable()
      .pipe(
        tap(() => {
          this.startNextAction();
          this.soundChime.play();
        }),
      )
      .subscribe();

    this.soundChime.src = './chime-sound.mp3';
    this.soundChime.load();
  }

  public startNextAction(): void {
    if (this.workoutActions().length === 0) {
      return;
    }
    this.currentActionIndex.update((value) => (value + 1) % this.workoutActions().length);
    this.isPaused.set(false);
    if (this.currentAction().timer > 0) {
      this.runIntervalTimer();
    }
  }

  private setNextAction(): WorkoutAction {
    return this.workoutActions()[this.getNextActionIndex(this.currentActionIndex())];
  }

  private getNextActionIndex(index: number): number {
    const nextAction = this.workoutActions()[(index + 1) % this.workoutActions().length];
    if (nextAction.type === ACTION_TYPE.BREAK) {
      return this.getNextActionIndex(index + 1);
    }
    return (index + 1) % this.workoutActions().length;
  }

  public pauseToggle(): void {
    this.isPaused.update((value) => !value);
  }

  public reset(): void {
    this.isPaused.set(false);
    this.intervalTimerSubscription?.unsubscribe();
    this.currentActionIndex.set(0);
  }

  private runIntervalTimer(): void {
    this.intervalTimerSubscription?.unsubscribe();
    this.tick.set(0);
    this.intervalTimerSubscription = interval(1000)
      .pipe(
        filter(() => !this.isPaused()),
        tap(() => {
          this.tick.update((value) => value + 1);
          if (this.currentAction().timer > 0 && this.tick() > this.currentAction().timer) {
            this.timerRanOut.next();
          }
        }),
        takeUntil(this.timerRanOut.asObservable()),
      )
      .subscribe();
  }
}
