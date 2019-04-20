const assertUnreachable = (x: any): never => {
  throw new Error("Didn't expect to get here");
};

export { assertUnreachable };
