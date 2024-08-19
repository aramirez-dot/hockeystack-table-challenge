import { Table } from "@/components/Table";
import { Column } from "@/components/Table/types";
import { percentageFormatter } from "@/components/Table/helpers";
import { PagesResponse } from "@/app/api/pages/route";
import { computeBounce } from "@/app/helpers";

const COLUMNS: Column[] = [
  {
    name: "URL",
    field: "url",
    align: "left",
    size: 400,
  },
  {
    name: "Scroll",
    field: "avgScrollPercentage",
    formatter: percentageFormatter,
    align: "right",
  },
  {
    name: "Time",
    field: "mythicField",
    align: "right",
  },
  {
    name: "Bounce",
    getter: computeBounce,
    formatter: percentageFormatter,
    align: "right",
  },
  {
    name: "Enters",
    field: "startsWithCount",
    align: "right",
  },
  {
    name: "Exits",
    field: "endsWithCount",
    align: "right",
  },
  {
    name: "Pageviews",
    field: "totalPageviewCount",
    align: "right",
  },
  {
    name: "Visitors",
    field: "totalVisitorCount",
    align: "right",
  },
];

export default async function Home() {
  const pages: PagesResponse = await (
    await fetch("http://localhost:3000/api/pages")
  ).json();

  return <Table columns={COLUMNS} rows={pages} />;
}
