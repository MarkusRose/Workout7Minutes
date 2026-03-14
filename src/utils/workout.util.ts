import {
  WorkoutAction,
  WorkoutSession,
  WorkoutSessionJson,
  ACTION_TYPE,
  EMPTY_ACTION,
} from '../services/workout-session.service';

export function getWorkoutSessionFromJson(session: WorkoutSessionJson): WorkoutSession {
  const WORKOUT_ACTION_DURATION = 30; // 30 second duration per action
  const WORKOUT_REST_DURATION = 10; // 10 second rest duration
  const WORKOUT_STOPPED = 0; // needs user interaction

  if (session.workout.length === 0) {
    return { workout: [EMPTY_ACTION] };
  }

  const outSession: WorkoutAction[] = [];
  outSession.push({ action: 'START', timer: WORKOUT_STOPPED, type: ACTION_TYPE.START });
  outSession.push({ action: 'GET READY!', timer: WORKOUT_REST_DURATION, type: ACTION_TYPE.BREAK });
  session.workout.forEach((action, i) => {
    outSession.push({ action, timer: WORKOUT_ACTION_DURATION, type: ACTION_TYPE.ACTIVE });
    i < session.workout.length - 1 &&
      outSession.push({ action, timer: WORKOUT_REST_DURATION, type: ACTION_TYPE.BREAK });
  });
  outSession.push({ action: 'COMPLETE', timer: WORKOUT_STOPPED, type: ACTION_TYPE.FINISH });
  return { workout: outSession };
}
