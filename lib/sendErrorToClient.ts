export const sendErrorToClient = (message: string) => {
  return {
    message,
    success: false,
  };
}
