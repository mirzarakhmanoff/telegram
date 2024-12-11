import { cn } from "@/lib/utils";
import React, { FC } from "react";
import { Skeleton } from "../skeleton";
interface Props {
  isReceived?: boolean;
}
const MessageLoading: FC<Props> = ({ isReceived }) => {
  return (
    <div
      className={cn(
        "m-2.5 font-medium text-xs flex",
        isReceived ? "justify-start " : "justify-end"
      )}
    >
      <Skeleton
        className={cn(
          "realtive inline p-2.5 pr-12",
          isReceived ? "bg-primary/20" : "bg-secondary/20"
        )}
      >
        <Skeleton className="w-36 h-5" />
        <span className="absolute text-xs right-1 bottom-0 opacity-60">✓</span>
      </Skeleton>
    </div>
  );
};

export default MessageLoading;
