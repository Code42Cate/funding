import { Resend } from 'resend';

const resend = new Resend();

export const sendNotificationEmail = (email: string, query: string, link: string, tile: string) => {
  const TEXT_TEMPLATE = `Hey there!

We found a new funding opportunities matching your query!

Query: ${query}
  
New funding match: ${tile}

You can view the full details here: ${link}

If you want to unsubscribe from these notifications, please answer to this email!

Cheers!
`;

  resend.emails.send({
    from: 'onboarding@resend.dev',
    to: email,
    subject: 'New funding opportunities matching your query have been found! 🎉',
    text: TEXT_TEMPLATE,
  });
};
