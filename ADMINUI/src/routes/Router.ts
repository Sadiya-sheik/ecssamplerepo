import { FC } from "react";

export type Router = {
  path: string;
  exact: boolean;
  component: FC;
  isProtected: boolean;
};
