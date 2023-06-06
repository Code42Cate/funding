import Image from 'next/image';
import NotificationModal from './NotificationModal';
import { useState } from 'react';
import { useRouter } from 'next/router';
import classNames from 'classnames';

export default function Header() {
  const [showNotificationModal, setShowNotificationModal] = useState(false);
  const router = useRouter();
  return (
    <header className="flex items-center justify-between">
      <NotificationModal open={showNotificationModal} setOpen={setShowNotificationModal} />
      <h1 className="text-3xl font-bold text-gray-800">Project Funding 💰</h1>

      <button
        className={classNames('text-gray-600', {
          'cursor-not-allowed': router.query.id === undefined,
          'hover:text-gray-800': router.query.id !== undefined,
        })}
        onClick={() => router.query.id && setShowNotificationModal(true)}
      >
        <Image src="/bell-plus.svg" width={24} height={24} priority alt="Get notified" />
      </button>
    </header>
  );
}
