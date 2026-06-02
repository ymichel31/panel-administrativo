import { IRoute } from "types/navigation";

// NextJS Requirement
export const isWindowAvailable = () => typeof window !== "undefined";

export const findCurrentRoute = (
  routes: IRoute[],
  pathname?: string | null,
): IRoute | undefined => {
  const path =
    pathname ??
    (isWindowAvailable() ? window.location.pathname : null);

  if (!path) return undefined;

  return routes.find(
    (route) => path.includes(route.layout + route.path),
  );
};

export const getActiveRoute = (
  routes: IRoute[],
  pathname?: string | null,
): string => {
  const route = findCurrentRoute(routes, pathname);
  return route?.name || "Default Brand Text";
};
