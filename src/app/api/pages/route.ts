import { NextResponse } from "next/server";

import pages from "@/fixtures/pages.json";

type PagesData = typeof pages;

export async function GET() {
  return NextResponse.json(pages);
}
