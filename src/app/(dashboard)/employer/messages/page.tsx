import MessageView from "../../../../view/message/MessageView";
import UpgradeGate from "@/components/ui/UpgradeGate";

export default function EmployerMessagesPage() {
  return (
    <UpgradeGate
      feature="canMessage"
      title="Direct Messaging Locked"
      description="Connect and chat directly with top talent. Upgrade your plan to Growth or Enterprise to unlock real-time direct messaging."
    >
      <MessageView />
    </UpgradeGate>
  );
}
