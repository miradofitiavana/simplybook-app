export interface SettingsSpecial {
  id: string | number;
  uuid: string;
  type: 'ouverture' | 'fermeture';
  dateFrom: Date;
  dateTo: Date;
  statut: 'active' | 'inactive' | 'draft';
}
