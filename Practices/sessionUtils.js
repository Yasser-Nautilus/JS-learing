export function createSession(userId) {
  return {
    userId,
    startTime: Date.now(),
  };
}
export default function getSessionDuration(session) {
  const endTime = Date.now();
  return (endTime - session.startTime) / 1000;
}
