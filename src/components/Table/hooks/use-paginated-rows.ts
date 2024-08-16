import { useMemo, useState } from "react";

import { ComputedRows, SortDirection } from "@/components/Table/types";

export const usePaginatedRows = (
  rows: ComputedRows,
  sortField: string,
  sortDirection: SortDirection,
  rowsPerPage: number = 10
) => {
  const [page, setPage] = useState<number>(0);

  const totalPages = useMemo(
    () => Math.ceil(rows.length / rowsPerPage),
    [rows, rowsPerPage]
  );

  const paginatedRows = useMemo(
    () => rows.slice(rowsPerPage * page, rowsPerPage * (page + 1)),
    [rows, page, sortField, sortDirection]
  );

  return { setPage, currentPage: page, totalPages, paginatedRows };
};
