import type { Entities } from './table-models.ts';

type Get<Model extends { type: Entities }> = {
  [Prop in `get${Capitalize<Model['type']>}`]: (id: number) => Model;
};

type Update<Model extends { type: Entities }> = {
  [Prop in `update${Capitalize<Model['type']>}`]: (id: number, update: Partial<Model>) => Model;
};

type Delete<Model extends { type: Entities }> = {
  [Prop in `delete${Capitalize<Model['type']>}`]: (id: number) => Model;
};

export type Table<Model extends { type: Entities }> = Get<Model> & Update<Model> & Delete<Model>;
