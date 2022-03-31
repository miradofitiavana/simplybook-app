import {SettingsWeekDay} from "./settings-week-day.types";

export interface SettingsWeek {
  uuid?: string;
  lundi: SettingsWeekDay;
  mardi: SettingsWeekDay;
  mercredi: SettingsWeekDay;
  jeudi: SettingsWeekDay;
  vendredi: SettingsWeekDay;
  samedi: SettingsWeekDay;
  dimanche: SettingsWeekDay;
}
