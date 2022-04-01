import {User} from "../user/user.model";

export interface Login {
  access_token: string;
  token_type: string;
  user: User
}
