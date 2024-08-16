import { NextResponse } from "next/server";

import pages from "@/fixtures/pages.json";

export type PagesResponse = typeof pages;

export async function GET() {
  return NextResponse.json(pages);
}
