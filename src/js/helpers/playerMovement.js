import { MAX_FALL_SPEED, MAX_THRUST, MAX_VELOCITY, PLAYER_STARTING, VELOCITY } from './constants';

export const movePlayer = ({position, velocity, thrust, jumping}) => {
  let newThrust = thrust;
  let newVelocity = velocity;
  let newPosition = position;

  if (jumping) {
    newThrust = (thrust + 0.25) > MAX_THRUST ? MAX_THRUST : thrust + 0.25;
    newVelocity = velocity - (VELOCITY + newThrust);
    if (newVelocity < -(MAX_VELOCITY)) {
      newVelocity = -MAX_VELOCITY;
    }
    newPosition = position + (newVelocity);
  } else {
    newThrust = 0;
    newVelocity = velocity + VELOCITY;
    if (newVelocity > MAX_FALL_SPEED) {
      newVelocity = MAX_FALL_SPEED;
    }
    newPosition = position + newVelocity;
  }

  if (newPosition <= 0) {
    return { position: 0, velocity: 0, newThrust };
  }

  if (newPosition >= PLAYER_STARTING.vertical) {
    return { position: PLAYER_STARTING.vertical, velocity: 0, newThrust };
  }

  return { position: newPosition, velocity: newVelocity, thrust: newThrust };
};