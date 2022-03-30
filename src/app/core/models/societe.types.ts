import {Categorie} from "./categorie.types";

export interface Societe {
  uuid?: string;
  permalink: string;
  nom: string;
  adresse: string;
  ville: string;
  code_postal: string;
  adresse_complement: string;
  lng?: number;
  lat?: number;
  descr: string;
  created_at: Date;
  updated_at: Date;
  categories: Categorie[];
}
