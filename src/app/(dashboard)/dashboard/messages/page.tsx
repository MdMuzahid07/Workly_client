import MessageView from '../../../../view/message/MessageView';
import UpgradeGate from '@/components/ui/UpgradeGate';

export default function DashboardMessagesPage() {
  return (
    <UpgradeGate
      feature="canMessageEmployer"
      title="Messaging Available on Premium"
      description="Send and receive direct messages with hiring managers and employers. Available on Pro and Premium plans."
    >
      <MessageView />
    </UpgradeGate>
  );
}
