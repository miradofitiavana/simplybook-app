export interface BookingEvent {
  id?: number;
  id_societe: number;
  start?: Date;
  startTime?: number;
  end?: Date;
  endTime?: number;
  title: string;
  color?: string;
  allDay?: number;
  meta?: any;
}
