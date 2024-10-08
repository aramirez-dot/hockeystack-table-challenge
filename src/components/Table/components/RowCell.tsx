import React from "react";
import classNames from "classnames";

import { Column, ComputedRow } from "../types";
import { formatCellValue } from "../helpers";

type RowCellProps = {
  row: ComputedRow;
  column: Column;
};

export const RowCell: React.FC<RowCellProps> = ({ row, column }) => {
  const value = row[column.name];

  return (
    <td
      tabIndex={0}
      className={classNames(
        "break-words first:pl-5 last:pr-5 px-5 py-3 outline-none focus:border focus:border-blue-600",
        {
          ["text-left"]: column.align === "left",
          ["text-right"]: column.align === "right",
        }
      )}
    >
      {formatCellValue(value, column)}
    </td>
  );
};
