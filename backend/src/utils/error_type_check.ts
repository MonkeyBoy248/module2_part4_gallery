export const isNodeError = (error: Error | unknown): error is NodeJS.ErrnoException =>
  error instanceof Error