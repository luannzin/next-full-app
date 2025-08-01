import { treaty } from "@elysiajs/eden";
import { type App, app } from "../api/[[...slugs]]/route";

const client = treaty<App>(app).api;

export { client };
