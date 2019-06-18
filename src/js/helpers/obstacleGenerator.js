import { VERTICAL_BOUNDARIES } from './constants';

export const generate = () => {
  return Math.floor(Math.random() * Math.floor(VERTICAL_BOUNDARIES.floor));
  // let needsNewObstaclePosition = true;
  // let nextObstaclePosition;
  //
  // while (needsNewObstaclePosition) {
  //   nextObstaclePosition = Math.floor(Math.random() * Math.floor(VERTICAL_BOUNDARIES.floor));
  //   if (Math.abs(lastObstaclePosition - nextObstaclePosition) > 65) {
  //     needsNewObstaclePosition = false;
  //   }
  // }
  //
  // return nextObstaclePosition;
};