import { Dispatch } from "react";
import { Coordinates } from "../../../store/types/map.types";
import { SetLocationAction, UserAction } from "../../../app/(tabs)/profile";

/**
 * @package
 */
export type LocationInputProps = {
  value: Coordinates;
  dispatch: Dispatch<SetLocationAction>;
};
