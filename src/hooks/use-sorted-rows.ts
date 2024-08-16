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
    if (direction === "ASC") {
      return rows.sort((a, b) => (b[field] as any) - (a[field] as any));
    }

    if (direction === "DESC") {
      return rows.sort((a, b) => (a[field] as any) - (b[field] as any));
    }

    return rows;
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
