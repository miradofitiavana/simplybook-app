export interface MessageAPI {
  type?:
    | 'success'
    | 'error'
    | 'warning';
  content?: string;
}
