import { NextApiRequest, NextApiResponse } from 'next';
import db from '@funding-database/db';

export default async function notify(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.status(405).end();
    return;
  }

  const { email, id } = req.body;
  if (!email || !id || !validateEmail(email)) {
    res.status(400).end();
    return;
  }

  const prevMatch = await db.result.findUnique({
    where: {
      id,
    },
  });

  if (!prevMatch) {
    res.status(404).end();
    return;
  }

  await db.notification.create({
    data: {
      email,
      query: prevMatch.query,
    },
  });

  res.status(204).end();
}

const validateEmail = (email: string) => {
  const re = /\S+@\S+\.\S+/;
  return re.test(email);
};
