import { EnvelopeIcon } from '@heroicons/react/24/outline';
import classNames from 'classnames';

type Notification = {
  id: number;
  email: string;
  count: number;
  tags: string[];
};

const notifications: Notification[] = [
  {
    id: 1,
    email: 'ubvja@student.kit.edu',
    count: 1,
    tags: ['EU', 'Foerderdatenbank'],
  },
  {
    id: 2,
    email: 'nicklas-rn@gmail.com',
    count: 1,
    tags: ['EU'],
  },
];

export const LastNotifications = () => {
  return (
    <div className="flex flex-col gap-y-4">
      <div>
        <h3 className="text-lg font-semibold">Last Notifications</h3>
      </div>
      {notifications.map((notification) => (
        <div key={`notification-${notification.id}`} className="flex flex-row gap-x-2">
          <div className="h-fit rounded-full bg-gray-100 p-1 text-gray-800">
            <EnvelopeIcon className="h-4 w-4" strokeWidth={2} />
          </div>
          <div className="flex flex-col">
            <div className="flex flex-col">
              <span className="font-medium text-gray-700">{notification.email}</span>
              <span className="text-sm text-gray-500"> {notification.count} new opportunities</span>
            </div>
            <div className="mt-2 flex flex-row gap-x-1">
              {notification.tags.map((tag) => (
                <div
                  key={`notification-${notification.id}-tag-${tag}`}
                  className={classNames('rounded-full px-1 py-0 text-xs', {
                    'bg-blue-100 text-blue-800': tag === 'EU',
                    'bg-purple-100 text-purple-800': tag === 'Foerderdatenbank',
                  })}
                >
                  {tag}
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default LastNotifications;
