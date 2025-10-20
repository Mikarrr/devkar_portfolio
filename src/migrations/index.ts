import * as migration_20251004_150536 from './20251004_150536';

export const migrations = [
  {
    up: migration_20251004_150536.up,
    down: migration_20251004_150536.down,
    name: '20251004_150536'
  },
];
