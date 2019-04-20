/**
 * Creates a tuple used for creating both an array of string as well as a union type
 */
export const tuple = <T extends string[]>(...args: T) => args;
