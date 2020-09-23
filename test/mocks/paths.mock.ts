export const existingPaths = [
  '/tmp',
  '/',
  '..',
  '../',
  '.',
  './',
  `${process.cwd()}/test`,
  `${process.cwd()}/src/`,
  `${process.cwd()}/src/app.ts`,
];

export const nonExistingPaths = [
  '%',
  '...',
  '.../',
  `${process.cwd()}/not-exists`,
  `${process.cwd()}/not-exists-as-well/`
];

export const existingDirectories = [
  '/tmp',
  '/',
  '..',
  '../',
  '.',
  './',
  `${process.cwd()}/test`,
  `${process.cwd()}/src/`
];

export const nonExistingDirectories = [
  '&',
  '...',
  '.../',
  `${process.cwd()}/not-exists`,
  `${process.cwd()}/not-exists-as-well/`,
  `${process.cwd()}/src/app.ts`
];
