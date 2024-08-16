import React from "react";

import { GoToPage } from "./GoToPage";
import { Paginator } from "./Paginator";

export const Pagination: React.FC = () => (
  <div className="flex flex-row justify-end items-center">
    <GoToPage />
    <Paginator />
  </div>
);
