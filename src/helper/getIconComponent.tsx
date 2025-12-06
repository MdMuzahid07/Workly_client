import { Briefcase, Hotel, type LucideIcon } from "lucide-react";
import IconRegistry from "../constants/IconRegistry";

interface IconResult {
  icon: LucideIcon;
  color: string;
}

const getIconComponent = (iconName: string | null | undefined): IconResult => {
  if (!iconName) {
    return {
      icon: Hotel,
      color: "bg-emerald-500",
    };
  }

  const foundIcon = IconRegistry.find(
    (item) => item.name.toLowerCase() === iconName.toLowerCase(),
  );

  return {
    icon: foundIcon?.icon || Briefcase,
    color: foundIcon?.color || "bg-emerald-500",
  };
};

export default getIconComponent;
