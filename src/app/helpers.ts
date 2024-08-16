"use client";

import { Row } from "@/components/PlainTable/types";
import { PagesResponse } from "@/app/api/pages/route";

export const computeBounce = (row: Row<PagesResponse[number]>) =>
  ((100 / row.totalCount) * row.bounceCount).toFixed(2);
