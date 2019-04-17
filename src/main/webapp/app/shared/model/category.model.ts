import { IArticle } from 'app/shared/model//article.model';

export interface ICategory {
  id?: number;
  name?: string;
  description?: string;
  imageContentType?: string;
  image?: any;
  categories?: IArticle[];
}

export const defaultValue: Readonly<ICategory> = {};
