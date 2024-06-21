import { Dispatch } from "react";
import { SetPhoneNumberAction } from "../profile.reducer";

export type PhonenumberInputProps = {
  value?: string;
  dispatch: Dispatch<SetPhoneNumberAction>;
};
