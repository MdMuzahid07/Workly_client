import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ReactNode } from "react";

const HoverHint = ({
  children,
  hint,
}: {
  children: ReactNode;
  hint: string;
}) => {
  return (
    <Tooltip>
      <TooltipTrigger asChild>{children}</TooltipTrigger>
      <TooltipContent className="rounded-full">
        <p>{hint}</p>
      </TooltipContent>
    </Tooltip>
  );
};

export default HoverHint;
