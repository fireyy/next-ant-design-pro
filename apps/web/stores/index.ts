import { atom, Atom, Getter } from "jotai";
import Settings from "@/config";
import type { ISettings } from "@/config";
import { currentUser } from "@/services/api";
import { atomWithStorage, unwrap } from "jotai/utils";

type Selector<T> = (get: Getter) => T | Promise<T>;

export const selectAtomWithSwr = <T>(
  selector: Selector<T>
): Atom<T | Promise<T>> => {
  const baseAtom = atom((get) => selector(get));
  const unwrappedAtom = unwrap(baseAtom, (prev) => prev);

  return atom((get) => get(unwrappedAtom) ?? get(baseAtom));
};

type IUserInfo = API.CurrentUser | Promise<API.CurrentUser> | null;

const userInfoAtom = atom<IUserInfo>(null);

const fetchUserInfoAtom = selectAtomWithSwr(async () => {
  const userInfo = await currentUser();
  return userInfo;
});

export const globalUserInfo = atom(
  (get) => get(userInfoAtom) ?? get(fetchUserInfoAtom),
  (get, set, newVal: IUserInfo) => {
    set(userInfoAtom, newVal);
  }
);

const defaultSettings = Settings as ISettings;
export const globalSettings = atomWithStorage(
  "settings",
  defaultSettings,
  undefined,
  {
    getOnInit: true,
  }
);
