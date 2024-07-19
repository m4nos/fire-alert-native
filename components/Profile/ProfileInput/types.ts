import { Dispatch } from "react";
import { SetPhoneNumberAction, SetLocationAction } from "../profile.reducer";

export type ProfileInputProps<
  T extends SetPhoneNumberAction | SetLocationAction
> = {
  value?: string;
  actionType: T["type"];
  dispatch: Dispatch<T>;
  placeholder?: string;
  label: string;
};
