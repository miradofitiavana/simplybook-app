export interface PlanningDay {
  type: "wday" | "date";
  wday: string;
  date: Date;
  intervals: Array<{ from, to }>;
}
