import { format } from "date-fns";

export default function formatDate(date: string): string {
  return format(new Date(date), "y-M-d");
}
