import { useCallback, useMemo, useState } from "react";

import { FieldSort, Rows } from "@/components/Table/types";

export const useSortedRows = (rows: Rows) => {
  const [fieldSort, setFieldSort] = useState<FieldSort>();

  const sorting = useMemo(
    () => (fieldSort ? Object.entries(fieldSort)[0] : []),
    [fieldSort]
  );
  const [field, direction] = sorting;

  const sortedRows = useMemo(() => {
    if (!field) {
      return rows;
    }

    return rows.sort((a, b) => {
      if (typeof a[field] === "string") {
        if (direction === "ASC") {
          return String(b[field]).localeCompare(String(a[field]));
        } else {
          return String(a[field]).localeCompare(String(b[field]));
        }
      }

      if (typeof a[field] === "number") {
        if (direction === "ASC") {
          return b[field] - a[field];
        } else {
          return a[field] - b[field];
        }
      }

      return 0;
    });
  }, [rows, fieldSort]);

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

  return { sorting, sortField, sortedRows };
};
