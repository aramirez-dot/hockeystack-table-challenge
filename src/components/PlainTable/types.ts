export type Getter = (row: Row) => string;

export type Formatter = (value: any) => string;

export type Column = {
  name: string;
  field?: string;
  getter?: Getter;
  formatter?: Formatter;
  align?: "left" | "right";
};

export type Row<T = any> = T;

export type Rows = Row[];

export type ComputedRow = Record<string, unknown>;

export type ComputedRows = ComputedRow[];

export type SortDirection = "ASC" | "DESC";

export type FieldSort = Record<string, SortDirection>;
