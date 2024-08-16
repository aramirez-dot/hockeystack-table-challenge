import React, { useCallback, useContext } from "react";

import { tableContext } from "../context";

export const Paginator: React.FC = () => {
  const {
    currentPage,
    totalPages,
    pageSetter: setPage,
  } = useContext(tableContext);

  const handlePreviousPage = useCallback(() => {
    setPage((page) => {
      if (page !== 0) {
        return page - 1;
      }

      return page;
    });
  }, []);

  const handleNextPage = useCallback(() => {
    setPage((page) => {
      if (page + 1 < totalPages) {
        return page + 1;
      }
      return page;
    });
  }, [totalPages]);

  return (
    <div className="select-none flex px-4 py-8">
      <div
        className="flex items-center justify-center cursor-pointer rounded-full bg-slate-300 hover:bg-slate-400 active:bg-slate-300 dark:bg-slate-900 hover:dark:bg-slate-800 active:dark:bg-slate-900 border border-slate-400 dark:border-slate-800 w-8 h-8"
        onClick={handlePreviousPage}
      >
        <span className="material-symbols-rounded">chevron_left</span>
      </div>
      <div className="flex gap-x-2 px-3">
        <div className="w-6 flex items-center justify-center">
          {currentPage + 1}
        </div>
        <div className="flex items-center justify-center">/</div>
        <div className="w-6 flex items-center justify-center">{totalPages}</div>
      </div>
      <div
        className="flex items-center justify-center cursor-pointer rounded-full bg-slate-300 hover:bg-slate-400 active:bg-slate-300 dark:bg-slate-900 hover:dark:bg-slate-800 active:dark:bg-slate-900 border border-slate-400 dark:border-slate-800 w-8 h-8"
        onClick={handleNextPage}
      >
        <span className="material-symbols-rounded">chevron_right</span>
      </div>
    </div>
  );
};
