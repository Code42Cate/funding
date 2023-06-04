import Image from 'next/image';
import NotificationModal from './NotificationModal';
import { useState } from 'react';

export default function Header() {
  const [showNotificationModal, setShowNotificationModal] = useState(false);
  return (
    <header className="flex items-center justify-between">
      <NotificationModal open={showNotificationModal} setOpen={setShowNotificationModal} />
      <h1 className="text-3xl font-bold text-gray-800">Project Funding 💰</h1>

      <button className="text-gray-600 hover:text-gray-800" onClick={() => setShowNotificationModal(true)}>
        <Image src="/bell-plus.svg" width={24} height={24} priority alt="Get notified" />
      </button>
    </header>
  );
}
