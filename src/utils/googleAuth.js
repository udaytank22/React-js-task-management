import { gapi } from "gapi-script";

const CLIENT_ID =
  "908856912160-l51ijc2iopjen5hl999au393e6kpot34.apps.googleusercontent.com"; // Replace this
const SCOPES = "https://www.googleapis.com/auth/calendar";

export const initGoogleClient = () => {
  return new Promise((resolve) => {
    gapi.load("client:auth2", async () => {
      await gapi.client.init({
        clientId: CLIENT_ID,
        scope: SCOPES,
      });
      resolve();
    });
  });
};

export const signInWithGoogle = async () => {
  const auth = gapi.auth2.getAuthInstance();
  const user = await auth.signIn();
  const accessToken = user.getAuthResponse().access_token;
  console.log("auth", auth);
  console.log("accessToken", accessToken);
  return accessToken;
};

export const createGoogleCalendarEvent = async (accessToken, task) => {
  const event = {
    summary: task.task_name,
    description: `${task.project} - ${task.module} [${task.type}]`,
    start: {
      dateTime: new Date().toISOString(), // optional: replace with your preferred logic
      timeZone: "Asia/Kolkata",
    },
    end: {
      dateTime: new Date(Date.now() + 60 * 60 * 1000).toISOString(), // +1 hour
      timeZone: "Asia/Kolkata",
    },
  };
  console.log("event", event);

  await fetch(
    "https://www.googleapis.com/calendar/v3/calendars/primary/events",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(event),
    }
  );
};
