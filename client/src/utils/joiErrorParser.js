export const parseJoiErrorMessage = (message) => {
  if (!message) return {};

  const msg = message.toLowerCase();

  if (msg.includes("username")) {
    return { username: message };
  } else if (msg.includes("email")) {
    return { email: message };
  } else if (msg.includes("password")) {
    return { password: message };
  } else if (msg.includes("identifier")) {
    return { identifier: message };
  } else {
    return { general: message };
  }
};
