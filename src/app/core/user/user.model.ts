import {Societe} from "../models/societe.types";

export interface User {
  id: string;
  name: string;
  email: string;
  created_at?: Date;
  updated_at?: Date;
  societes: Societe[];
}
