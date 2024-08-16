"use client";
import React, { useCallback, useMemo } from "react";

import { Column, ComputedRow, ComputedRows, Rows } from "./types";
import { determineCellValue } from "./helpers";
import { useSortedRows } from "../../hooks/use-sorted-rows";
import { usePaginatedRows } from "../../hooks/use-paginated-rows";
import { tableContext } from "./context";
import { TableRow } from "./components/TableRow";
import { ColumnCell } from "./components/ColumnCell";
import { Pagination } from "./components/Pagination";

type TableProps = {
  columns: Column[];
  rows: Rows;
  rowsPerPage?: number;
};

export const Table: React.FC<TableProps> = ({
  columns,
  rows,
  rowsPerPage = 10,
}) => {
  // --- Data setup
  // We compute rows with derived values for correct
  // sorting.
  const computedRows = useMemo(() => {
    const newRows: ComputedRows = [];
    rows.forEach((row) => {
      const newRow: ComputedRow = {};
      columns.forEach(
        (column) => (newRow[column.name] = determineCellValue(row, column))
      );
      newRows.push(newRow);
    });
    return newRows;
  }, [rows, columns]);

  const {
    sorting: [field, direction],
    sortField,
    sortedRows,
  } = useSortedRows(computedRows);

  const { setPage, currentPage, totalPages, paginatedRows } = usePaginatedRows(
    sortedRows,
    field,
    direction,
    rowsPerPage
  );

  // --- Renderers
  const renderTableRow = useCallback(
    (row: ComputedRow, index: number) => (
      <TableRow key={String(index)} row={row} />
    ),
    []
  );

  const renderTableColumn = useCallback(
    (column: Column, index: number) => (
      <ColumnCell key={String(index)} column={column} />
    ),
    []
  );

  return (
    <tableContext.Provider
      value={{
        columns,
        currentPage,
        totalPages,
        sortField: field,
        sortDirection: direction,
        fieldSorter: sortField,
        pageSetter: setPage,
      }}
    >
      <Pagination />
      <table className="table-auto w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700">
        <thead className="text-sm bg-slate-300 dark:bg-slate-950">
          <tr>{columns.map(renderTableColumn)}</tr>
        </thead>
        <tbody>{paginatedRows.map(renderTableRow)}</tbody>
      </table>
      <Pagination />
    </tableContext.Provider>
  );
};
