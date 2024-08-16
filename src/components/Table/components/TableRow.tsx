import React, { useCallback, useContext } from "react";

import { Column, ComputedRow } from "../types";
import { RowCell } from "./RowCell";
import { tableContext } from "../context";

type TableRowProps = {
  row: ComputedRow;
};

export const TableRow: React.FC<TableRowProps> = ({ row }) => {
  const { columns } = useContext(tableContext);

  const renderRowCell = useCallback(
    (row: ComputedRow) => (column: Column, index: number) =>
      <RowCell key={String(index)} row={row} column={column} />,
    []
  );

  return (
    <tr className="hover:bg-slate-100 hover:dark:bg-slate-800 border-t border-slate-200 dark:border-slate-800">
      {columns.map(renderRowCell(row))}
    </tr>
  );
};
