import React from "react";
import { randomUUID } from "crypto";

import { Column } from "./types";

type PlainTableProps = {
  columns: Column[];
  rows: Array<Record<string, unknown>>;
};

const renderTableColumn = (
  column: Column,
  index: number,
  columns: Column[]
) => <th key={randomUUID()}>{column.name}</th>;

export const PlainTable: React.FC<PlainTableProps> = ({ columns, rows }) => {
  return (
    <table>
      <thead>{columns.map(renderTableColumn)}</thead>
      <tbody></tbody>
    </table>
  );
};
