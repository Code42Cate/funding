import LastNotifications from '../components/admin/LastNotifications';
import NotificationsChart from '../components/admin/NotificationsChart';

export const NotificationsPage = () => {
  return (
    <div className="flex max-w-full flex-col gap-y-6 py-6 pl-8">
      <h1 className="text-3xl font-semibold">Notifications</h1>
      TODO:
      <ul className="list-inside list-disc">
        <li>View who enabled notifications for what query and how often notifications have been sent</li>
        <li>View what the last notifications where</li>
        <li>line graph of sent-out notifications</li>
      </ul>
      <NotificationsChart />
      <LastNotifications />
    </div>
  );
};

export default NotificationsPage;
