import {CalendarEventAction} from 'angular-calendar';
import {endOfDay, startOfDay} from 'date-fns';

export class CalendarEvent {
  id: number | string;
  start: Date;
  end?: Date;
  title: string;
  color: {
    primary: string;
    secondary: string;
  };
  actions?: CalendarEventAction[];
  allDay?: boolean;
  cssClass?: string;
  resizable?: {
    beforeStart?: boolean;
    afterEnd?: boolean;
  };
  draggable?: boolean;
  meta?: {
    location: string,
    notes: string
  };

  /**
   * Constructor
   *
   * @param data
   */
  constructor(data?) {
    data = data || {};
    this.id = data.id || null;
    this.start = new Date(data.start) || startOfDay(new Date());
    this.end = new Date(data.end) || endOfDay(new Date());
    this.title = data.title || '';
    this.color = {
      primary: data.color && data.color.primary || '#1e90ff',
      secondary: data.color && data.color.secondary || '#D1E8FF'
    };
    this.draggable = data.draggable;
    this.resizable = {
      beforeStart: data.resizable && data.resizable.beforeStart || true,
      afterEnd: data.resizable && data.resizable.afterEnd || true
    };
    this.actions = data.actions || [];
    this.allDay = this.isAllDay(data.allDay);
    this.cssClass = data.cssClass || '';
    this.meta = {
      location: data.meta && data.meta.location || '',
      notes: data.meta && data.meta.notes || ''
    };
  }

  isAllDay(allDay): boolean {
    if (typeof allDay == "boolean") {
      return allDay;
    } else if (typeof allDay == "number") {
      return allDay == 1;
    } else {
      return false;
    }
    return false;
  }
}
