type PagesMap = {
  homepage: string;
  about: string;
  contact: string;
};

type PagesAccess = {
  [Prop in keyof PagesMap]: boolean;
};

export function checkAccess(map: PagesMap): PagesAccess {
  const access = {} as PagesAccess;
  Object.keys(map).forEach((key) => {
    access[key] = true;
  });
  return access;
}
