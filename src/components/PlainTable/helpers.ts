"use client";

import { Row, Column } from "./types";

// --- Value formatters
export const percentageFormatter = (value: string) => `${value}%`;

export const defaultCellFormatter = (value: unknown) =>
  value ? String(value) : "-";

// We can either render cell values using a given field from the row object
// and the optional field property from the column object or use the getter
// field from the column object to return computed values.
export const determineCellValue = (row: Row, column: Column): unknown => {
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

export const formatCellValue = (value: unknown, column: Column) => {
  if ("formatter" in column) {
    const { formatter } = column;
    if (formatter) {
      return formatter(value);
    }
  }

  return defaultCellFormatter(value);
};
