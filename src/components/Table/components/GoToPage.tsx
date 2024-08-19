import React, { FormEvent, useCallback, useContext, useState } from "react";

import { tableContext } from "../context";

export const GoToPage: React.FC = () => {
  const {
    currentPage,
    totalPages,
    pageSetter: setPage,
  } = useContext(tableContext);
  const [pageInput, setPageInput] = useState(currentPage);

  const handleChange = useCallback(
    (evt: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = evt.currentTarget;
      const page = Number(value) || 0;

      const clamped = Math.min(Math.max(page - 1, 0), totalPages - 1);
      setPageInput(clamped);
    },
    [totalPages, setPageInput]
  );

  const handleGo = useCallback(() => setPage(pageInput), [pageInput, setPage]);

  const handleSubmit = useCallback(
    (evt: FormEvent) => {
      evt.preventDefault();
      handleGo();
    },
    [handleGo]
  );

  return (
    <div className="flex gap-x-4 pr-4 border-r border-slate-400 dark:border-slate-800">
      <div>Go to page:</div>
      <div>
        <form onSubmit={handleSubmit}>
          <input
            type="number"
            defaultValue={currentPage + 1}
            className="bg-transparent border-none"
            min={1}
            max={totalPages}
            onChange={handleChange}
          />
          <button
            className="cursor-pointer rounded-full text-xs bg-slate-300 hover:bg-slate-400 active:bg-slate-300 dark:bg-slate-900 hover:dark:bg-slate-800 active:dark:bg-slate-900 border border-slate-400 dark:border-slate-800 w-8 h-8"
            onClick={handleGo}
          >
            Go
          </button>
        </form>
      </div>
    </div>
  );
};
