import { PlainTable } from "../components/PlainTable";

const COLUMNS = [
  {
    name: "URL",
  },
  {
    name: "Scroll",
  },
  {
    name: "Time",
  },
  {
    name: "Bounce",
  },
  {
    name: "Enters",
  },
  {
    name: "Exits",
  },
  {
    name: "Pageviews",
  },
  {
    name: "Visitors",
  },
];

export default async function Home() {
  const pages = await (await fetch("http://localhost:3000/api/pages")).json();

  return <PlainTable columns={COLUMNS} rows={pages} />;
}
