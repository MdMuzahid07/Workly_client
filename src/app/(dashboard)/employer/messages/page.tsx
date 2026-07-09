import MessageView from "../../../../view/message/MessageView";
import UpgradeGate from "@/components/ui/UpgradeGate";

export default function EmployerMessagesPage() {
  return (
    <UpgradeGate
      feature="canMessage"
      title="Messaging Available on Growth Plan"
      description="Communicate directly with candidates and respond to job seeker enquiries. Available on Growth and Enterprise plans."
    >
      <MessageView />
    </UpgradeGate>
  );
}
