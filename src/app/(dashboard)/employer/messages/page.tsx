import DashboardEmployerMessagesHeader from "../../../../components/dashboard/dashboard-nav/header/DashboardEmployerMessagesHeader";
import MessageView from "../../../../view/message/MessageView";
import UpgradeGate from "@/components/ui/UpgradeGate";

export default function EmployerMessagesPage() {
  return (
    <>
      <DashboardEmployerMessagesHeader />
      <UpgradeGate
        feature="canMessage"
        title="Direct Messaging Locked"
        description="Connect and chat directly with top talent. Upgrade your plan to Growth or Enterprise to unlock real-time direct messaging."
      >
        <MessageView />
      </UpgradeGate>
    </>
  );
}
