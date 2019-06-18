export const PLAYER_DIMENSIONS = {
  height: 50,
  width: 50,
};

export const OBSTACLE_DIMENSIONS = {
  height: 50,
  width: 50,
};

export const VERTICAL_BOUNDARIES = {
  floor: 560,
  ceiling: 0,
};

export const HORIZONTAL_BOUNDARIES = {
  left: 0,
  right: 1200,
}

export const PLAYER_STARTING = {
  vertical: VERTICAL_BOUNDARIES.floor - PLAYER_DIMENSIONS.height,
  horizontal: 250,
};

export const SPACEBAR_KEYCODE = 32;

export const VELOCITY = 2;
export const MAX_THRUST = 2;
export const MAX_VELOCITY = 15;
export const MAX_FALL_SPEED = 20;

export const SCROLL_SPEED = 4;
export const MAX_SCROLL_MODIFIER = 5;