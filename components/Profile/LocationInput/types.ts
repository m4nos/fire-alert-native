import { Dispatch } from "react";
import { Coordinates } from "@store/types/map.types";
import { SetLocationAction } from "../profile.reducer";

export type LocationInputProps = {
  value: Coordinates;
  dispatch: Dispatch<SetLocationAction>;
};
