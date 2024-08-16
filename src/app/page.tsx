import { PlainTable } from "@/components/PlainTable";
import { Column, Row } from "@/components/PlainTable/types";
import { PagesResponse } from "@/app/api/pages/route";

const percentageFormatter = (value: string) => `${value}%`;

const COLUMNS: Column[] = [
  {
    name: "URL",
    field: "url",
  },
  {
    name: "Scroll",
    field: "avgScrollPercentage",
    formatter: percentageFormatter,
  },
  {
    name: "Time",
    field: "mythicField",
  },
  {
    name: "Bounce",
    getter: (row: Row<PagesResponse[number]>) =>
      ((100 / row.totalVisitorCount) * row.bounceCount).toFixed(2),
    formatter: percentageFormatter,
  },
  {
    name: "Enters",
    field: "startsWithCount",
  },
  {
    name: "Exits",
    field: "endsWithCount",
  },
  {
    name: "Pageviews",
    field: "totalPageviewCount",
  },
  {
    name: "Visitors",
    field: "totalVisitorCount",
  },
];

export default async function Home() {
  const pages: PagesResponse = await (
    await fetch("http://localhost:3000/api/pages")
  ).json();

  return <PlainTable columns={COLUMNS} rows={pages.slice(0, 4)} />;
}
