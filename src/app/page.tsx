import { PlainTable } from "@/components/PlainTable";
import { Column, Row } from "@/components/PlainTable/types";
import { PagesResponse } from "@/app/api/pages/route";

const percentageFormatter = (value: string) => `${value}%`;

const COLUMNS: Column[] = [
  {
    name: "URL",
    field: "url",
    className: "text-left",
  },
  {
    name: "Scroll",
    field: "avgScrollPercentage",
    formatter: percentageFormatter,
    className: "text-right",
  },
  {
    name: "Time",
    field: "mythicField",
    className: "text-right",
  },
  {
    name: "Bounce",
    getter: (row: Row<PagesResponse[number]>) =>
      ((100 / row.totalVisitorCount) * row.bounceCount).toFixed(2),
    formatter: percentageFormatter,
    className: "text-right",
  },
  {
    name: "Enters",
    field: "startsWithCount",
    className: "text-right",
  },
  {
    name: "Exits",
    field: "endsWithCount",
    className: "text-right",
  },
  {
    name: "Pageviews",
    field: "totalPageviewCount",
    className: "text-right",
  },
  {
    name: "Visitors",
    field: "totalVisitorCount",
    className: "text-right",
  },
];

export default async function Home() {
  const pages: PagesResponse = await (
    await fetch("http://localhost:3000/api/pages")
  ).json();

  return <PlainTable columns={COLUMNS} rows={pages.slice(0, 4)} />;
}
