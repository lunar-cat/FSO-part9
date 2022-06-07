export const assertNever = (part: never): never => {
  throw new Error(
    `Unhandled union member of CoursePart: ${JSON.stringify(part)}`
  );
};
