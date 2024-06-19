import { Router } from "express";

export interface TRoute {
  path: string;
  route: Router;
}
