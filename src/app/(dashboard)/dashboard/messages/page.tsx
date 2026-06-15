import DashboardMessagesHeader from "../../../../components/dashboard/dashboard-nav/header/DashboardMessagesHeader";
import MessageView from "../../../../view/message/MessageView";
import UpgradeGate from "@/components/ui/UpgradeGate";

export default function DashboardMessagesPage() {
  return (
    <>
      <DashboardMessagesHeader />
      <UpgradeGate
        feature="canMessageEmployer"
        title="Direct Messaging Locked"
        description="Initiate discussions directly with hiring managers. Upgrade your plan to Pro or Premium to unlock real-time direct messaging."
      >
        <MessageView />
      </UpgradeGate>
    </>
  );
}
