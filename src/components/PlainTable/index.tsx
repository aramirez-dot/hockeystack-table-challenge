"use client";
import React, { useCallback, useMemo, useState } from "react";
import classNames from "classnames";

import {
  Column,
  ComputedRow,
  ComputedRows,
  FieldSort,
  Row,
  Rows,
} from "./types";

type PlainTableProps = {
  columns: Column[];
  rows: Rows;
  rowsPerPage?: number;
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

export const PlainTable: React.FC<PlainTableProps> = ({
  columns,
  rows,
  rowsPerPage = 10,
}) => {
  const [fieldSort, setFieldSort] = useState<FieldSort>();

  const [field, direction] = useMemo(
    () => (fieldSort ? Object.entries(fieldSort)[0] : []),
    [fieldSort]
  );

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

  const sortedRows = useMemo(() => {
    if (!field) {
      return computedRows;
    }
    if (direction === "ASC") {
      return computedRows.sort((a, b) => (b[field] as any) - (a[field] as any));
    }

    if (direction === "DESC") {
      return computedRows.sort((a, b) => (a[field] as any) - (b[field] as any));
    }

    return computedRows;
  }, [computedRows, fieldSort]);

  const sortField = useCallback(
    (field: string) => {
      if (!fieldSort) {
        setFieldSort({ [field]: "ASC" });
        return;
      }

      if (field in fieldSort) {
        const sort = fieldSort[field];
        if (sort === "ASC") {
          setFieldSort({ [field]: "DESC" });
        } else {
          setFieldSort(undefined);
        }
      } else {
        setFieldSort({ [field]: "ASC" });
      }
    },
    [fieldSort]
  );

  const renderRowCell = useCallback(
    // eslint-disable-next-line react/display-name
    (row: ComputedRow) => (column: Column, index: number) => {
      const value = row[column.name];
      return (
        <td
          key={String(index)}
          className={classNames("first:pl-10 last:pr-10 py-3", {
            ["text-left"]: column.align === "left",
            ["text-right"]: column.align === "right",
          })}
        >
          {formatCellValue(value, column)}
        </td>
      );
    },
    []
  );

  const renderTableRow = useCallback(
    (row: ComputedRow, index: number) => (
      <tr
        key={String(index)}
        className="hover:bg-slate-100 hover:dark:bg-slate-800 border-t border-slate-200 dark:border-slate-800"
      >
        {columns.map(renderRowCell(row))}
      </tr>
    ),
    [columns, renderRowCell]
  );

  const renderTableColumn = useCallback(
    (column: Column, index: number) => (
      <th
        key={String(index)}
        className="select-none cursor-pointer first:pl-10 last:pr-10 py-4"
        onClick={() => sortField(column.name)}
      >
        <div
          className={classNames("flex flex-row items-center gap-1", {
            ["justify-start"]: column.align === "left",
            ["justify-end"]: column.align === "right",
          })}
        >
          {fieldSort && column.name in fieldSort && (
            <span className="material-symbols-rounded text-sm">
              {fieldSort[column.name] === "ASC"
                ? "arrow_upward"
                : "arrow_downward"}
            </span>
          )}
          {column.name}
        </div>
      </th>
    ),
    [sortField]
  );

  return (
    <table className="table-fixed w-screen bg-slate-50 dark:bg-slate-900">
      <thead className="text-sm bg-slate-300 dark:bg-slate-950">
        <tr>{columns.map(renderTableColumn)}</tr>
      </thead>
      <tbody>{sortedRows.map(renderTableRow)}</tbody>
    </table>
  );
};
