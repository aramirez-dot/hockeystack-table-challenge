import React, { useContext, useMemo } from "react";
import classNames from "classnames";

import { tableContext } from "../context";
import { Column } from "../types";

type ColumnCellProps = {
  column: Column;
};

export const ColumnCell: React.FC<ColumnCellProps> = ({ column }) => {
  const { fieldSorter, sortField, sortDirection } = useContext(tableContext);
  const sortIcon = useMemo(
    () =>
      sortDirection === "DESC" ? "keyboard_arrow_up" : "keyboard_arrow_down",
    [sortDirection]
  );

  return (
    <th
      className="select-none cursor-pointer uppercase first:pl-5 last:pr-5 px-5 py-4 last:border-none border-r border-slate-200 dark:border-slate-800"
      onClick={() => fieldSorter(column.name)}
    >
      <div
        className={classNames("flex flex-row items-center gap-1", {
          ["justify-start"]: column.align === "left",
          ["justify-end"]: column.align === "right",
        })}
      >
        {column.name === sortField && (
          <span className="material-symbols-rounded">{sortIcon}</span>
        )}
        <span className="text-xs">{column.name}</span>
      </div>
    </th>
  );
};
