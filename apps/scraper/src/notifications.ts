import db from '@funding-database/db';

export const checkForNewMatches = async (addedAfter: Date) => {
  const allNotifications = await db.notification.findMany({});
};
