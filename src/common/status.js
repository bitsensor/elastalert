import Enum from './enum';

export const Status = Enum({
  SETUP: 0,
  READY: 1,
  ERROR: 2,
  STARTING: 3,
  CLOSING: 4,
  FIRST_RUN: 5,
  IDLE: 6
});
