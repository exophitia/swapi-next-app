export type { People } from "./people";
export type { Films } from "./films";
export type { Planets } from "./planets";
export type { Species } from "./species";
export type { Vehicles } from "./vehicles";
export type { Starships } from "./starships";

import type { People } from "./people";
import type { Films } from "./films";
import type { Planets } from "./planets";
import type { Species } from "./species";
import type { Vehicles } from "./vehicles";
import type { Starships } from "./starships";

/** Union of all SWAPI resource item types (single entity from API). */
export type SwapiResourceItem =
  | People
  | Films
  | Planets
  | Species
  | Vehicles
  | Starships;

/** Resource keys that have a list endpoint and detail endpoint. */
export type SwapiResourceKey =
  | "people"
  | "films"
  | "planets"
  | "species"
  | "vehicles"
  | "starships";
