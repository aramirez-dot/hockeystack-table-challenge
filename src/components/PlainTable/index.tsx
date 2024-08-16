import React, { useCallback } from "react";
import { randomUUID } from "crypto";

import { Column, Row, Rows } from "./types";

type PlainTableProps = {
  columns: Column[];
  rows: Rows;
};

const defaultCellFormatter = (value: unknown) => (value ? String(value) : "-");

// We can either render cell values using a given field from the row object
// and the optional field property from the column object or use the getter
// field from the column object to return computed values.
const determineCellValue = (row: Row, column: Column): unknown => {
  // Using the column's getter
  if ("getter" in column) {
    const { getter } = column;
    if (getter) {
      return getter(row);
    }
  }

  // Using the field property
  if ("field" in column) {
    const { field } = column;
    if (field && field in row) {
      return row[field];
    }
  }

  return;
};

const formatCellValue = (value: unknown, column: Column) => {
  if ("formatter" in column) {
    const { formatter } = column;
    if (formatter) {
      return formatter(value);
    }
  }

  return defaultCellFormatter(value);
};

export const PlainTable: React.FC<PlainTableProps> = ({ columns, rows }) => {
  const renderRowCell = useCallback(
    // eslint-disable-next-line react/display-name
    (row: Row) => (column: Column) => {
      const value = determineCellValue(row, column);
      return (
        <td
          key={randomUUID()}
          className={`first:pl-10 last:pr-10 ${column.className} py-3`}
        >
          {formatCellValue(value, column)}
        </td>
      );
    },
    []
  );

  const renderTableRow = useCallback(
    (row: Row) => (
      <tr
        key={randomUUID()}
        className="hover:bg-slate-100 hover:dark:bg-slate-800 border-t border-slate-200 dark:border-slate-800"
      >
        {columns.map(renderRowCell(row))}
      </tr>
    ),
    [columns, renderRowCell]
  );

  const renderTableColumn = useCallback(
    (column: Column) => (
      <th
        key={randomUUID()}
        className={`first:pl-10 last:pr-10 ${column.className} py-4`}
      >
        {column.name}
      </th>
    ),
    []
  );

  return (
    <table className="table-fixed w-screen bg-slate-50 dark:bg-slate-900">
      <thead className="text-sm bg-slate-300 dark:bg-slate-950">
        <tr>{columns.map(renderTableColumn)}</tr>
      </thead>
      <tbody>{rows.map(renderTableRow)}</tbody>
    </table>
  );
};
