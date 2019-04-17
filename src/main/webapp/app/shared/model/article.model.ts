import { Moment } from 'moment';

export interface IArticle {
  id?: number;
  title?: string;
  description?: string;
  content?: any;
  imageContentType?: string;
  image?: any;
  creationDate?: Moment;
  modificationDate?: Moment;
  categoryId?: number;
  memberId?: number;
}

export const defaultValue: Readonly<IArticle> = {};
