import React from "react";

import { Column, SortDirection } from "./types";

type StateSetter<T> = (state: T) => T;

export type TableContext = {
  columns: Column[];
  currentPage: number;
  totalPages: number;
  sortField?: string;
  sortDirection?: SortDirection;

  fieldSorter: (field: string) => void;
  pageSetter: (setter: number | StateSetter<number>) => void;
};

export const tableContext = React.createContext<TableContext>(
  {} as TableContext
);
