type NavigationFunction = (
  path: string,
  options?: { state?: Record<string, unknown> }
) => void;

export let useCustomNavigation: NavigationFunction = (_path, _options) => {};
export const setCustomNavigation = (navFunc: NavigationFunction) => {
  useCustomNavigation = navFunc;
};

// redirect.ts
export const redirectToLogin = () => {
  window.location.href = "/auth/login";
};
