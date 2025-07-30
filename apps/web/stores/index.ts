import { atom } from "jotai";
import Settings from "@/config";
import type { ISettings } from "@/config";
import { currentUser } from "@/services/api";

export const globalUserInfo = atom(async () => {
  const response = await currentUser();
  const { data } = response.data;

  return data as API.CurrentUser;
});

const defaultSettings = Settings as ISettings;
const settingsAtom = atom(defaultSettings);

export const globalSettings = atom(
  (get) => get(settingsAtom),
  (get, set, newVal: ISettings) => {
    set(settingsAtom, newVal);
  }
);
