export type Getter = (row: Row) => string;

export type Formatter = (value: any) => string;

export type Column = {
  name: string;
  field?: string;
  getter?: Getter;
  formatter?: Formatter;
  className?: string;
};

export type Row<T = any> = T;

export type Rows = Row[];
