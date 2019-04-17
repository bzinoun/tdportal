import { IArticle } from 'app/shared/model//article.model';

export interface IMember {
  id?: number;
  firstName?: string;
  lastName?: string;
  email?: string;
  phoneNumber?: string;
  refogID?: string;
  authors?: IArticle[];
}

export const defaultValue: Readonly<IMember> = {};
