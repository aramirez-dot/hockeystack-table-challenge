"use client";
import React, { useCallback, useMemo, useState } from "react";
import classNames from "classnames";

import { Column, ComputedRow, ComputedRows, FieldSort, Rows } from "./types";
import { determineCellValue, formatCellValue } from "./helpers";
import { useSortedData } from "../../hooks/use-sorted-data";

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
  const [page, setPage] = useState<number>(0);

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
  } = useSortedData(computedRows);

  // --- Data setup

  const totalPages = useMemo(
    () => Math.ceil(rows.length / rowsPerPage),
    [rows, rowsPerPage]
  );

  const paginatedRows = useMemo(
    () => sortedRows.slice(rowsPerPage * page, rowsPerPage * (page + 1)),
    [sortedRows, page, field, direction]
  );

  // --- Renderers
  const renderRowCell = useCallback(
    // eslint-disable-next-line react/display-name
    (row: ComputedRow) => (column: Column, index: number) => {
      const value = row[column.name];
      return (
        <td
          key={String(index)}
          className={classNames("break-words first:pl-5 last:pr-5 px-5 py-3", {
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
        className="select-none cursor-pointer uppercase first:pl-5 last:pr-5 px-5 py-4 last:border-none border-r border-slate-200 dark:border-slate-800"
        onClick={() => sortField(column.name)}
      >
        <div
          className={classNames("flex flex-row items-center gap-1", {
            ["justify-start"]: column.align === "left",
            ["justify-end"]: column.align === "right",
          })}
        >
          {column.name === field && (
            <span className="material-symbols-rounded">
              {direction === "DESC"
                ? "keyboard_arrow_up"
                : "keyboard_arrow_down"}
            </span>
          )}
          <span className="text-xs">{column.name}</span>
        </div>
      </th>
    ),
    [sortField]
  );

  return (
    <div>
      <div className="flex flex-row justify-end items-center">
        <div className="flex  gap-x-4">
          <div>Go to page:</div>
          <div>
            <input
              type="number"
              defaultValue={page + 1}
              className="bg-transparent border-none"
              min={1}
              max={totalPages}
              onBlur={(ev) =>
                setPage(
                  Math.min(
                    Math.max(Number(ev.currentTarget.value) - 1, 0),
                    totalPages - 1
                  )
                )
              }
            />
          </div>
        </div>
        <div className="select-none flex px-4 py-8">
          <div
            className="flex items-center justify-center cursor-pointer rounded-full bg-slate-300 hover:bg-slate-400 active:bg-slate-300 dark:bg-slate-900 hover:dark:bg-slate-800 active:dark:bg-slate-900 border border-slate-400 dark:border-slate-800 w-8 h-8"
            onClick={() => setPage((page) => (page !== 0 ? page - 1 : page))}
          >
            <span className="material-symbols-rounded">chevron_left</span>
          </div>
          <div className="flex gap-x-2 px-3">
            <div className="w-6 flex items-center justify-center">
              {page + 1}
            </div>
            <div className="flex items-center justify-center">/</div>
            <div className="w-6 flex items-center justify-center">
              {totalPages}
            </div>
          </div>
          <div
            className="flex items-center justify-center cursor-pointer rounded-full bg-slate-300 hover:bg-slate-400 active:bg-slate-300 dark:bg-slate-900 hover:dark:bg-slate-800 active:dark:bg-slate-900 border border-slate-400 dark:border-slate-800 w-8 h-8"
            onClick={() =>
              setPage((page) => (page + 1 < totalPages ? page + 1 : page))
            }
          >
            <span className="material-symbols-rounded">chevron_right</span>
          </div>
        </div>
      </div>
      <table className="table-auto w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700">
        <thead className="text-sm bg-slate-300 dark:bg-slate-950">
          <tr>{columns.map(renderTableColumn)}</tr>
        </thead>
        <tbody>{paginatedRows.map(renderTableRow)}</tbody>
      </table>
    </div>
  );
};
