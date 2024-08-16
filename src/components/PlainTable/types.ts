export type Formatter = (value: unknown) => string;

export type Column = {
  name: string;
  field?: string;
  formatter?: Formatter;
};
