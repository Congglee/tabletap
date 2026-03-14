import { TableStatus } from "@/constants/type";
import { CircleCheck, CircleDot, CircleX, LucideIcon } from "lucide-react";

export type Option<T = string> = {
  label: string;
  value: T;
  icon?: LucideIcon;
};

export const tableStatusOptions: Option[] = [
  {
    label: "Available",
    value: TableStatus.Available,
    icon: CircleCheck,
  },
  {
    label: "Hidden",
    value: TableStatus.Hidden,
    icon: CircleX,
  },
  {
    label: "Reserved",
    value: TableStatus.Reserved,
    icon: CircleDot,
  },
];
