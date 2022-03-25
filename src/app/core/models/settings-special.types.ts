export interface SettingsSpecial {
  id: string | number;
  type: 'ouverture' | 'fermeture';
  dateFrom: Date;
  dateTo: Date;
  statut: 'active' | 'inactive' | 'draft';
}
