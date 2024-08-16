import React, { useCallback, useContext } from "react";

import { tableContext } from "../context";

export const GoToPage: React.FC = () => {
  const {
    currentPage,
    totalPages,
    pageSetter: setPage,
  } = useContext(tableContext);

  const handleBlur = useCallback(
    (evt: React.FocusEvent<HTMLInputElement>) => {
      const { value } = evt.currentTarget;
      const page = Number(value) || 0;

      const clamped = Math.min(Math.max(page - 1, 0), totalPages - 1);
      setPage(clamped);
    },
    [totalPages]
  );

  return (
    <div className="flex  gap-x-4">
      <div>Go to page:</div>
      <div>
        <input
          type="number"
          defaultValue={currentPage + 1}
          className="bg-transparent border-none"
          min={1}
          max={totalPages}
          onBlur={handleBlur}
        />
      </div>
    </div>
  );
};
