import { NextResponse } from "next/server";

import pages from "@/fixtures/pages.json";

export async function GET() {
  return NextResponse.json(pages);
}
