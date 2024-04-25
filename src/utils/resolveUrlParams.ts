const resolveUrlParams = (path?: Array<string>) => {
  let pathStr = "/";

  if (path) {
  pathStr = path.join("/");
  }

  let sitecoreRoutePath = pathStr ? pathStr : "/";
  if (!sitecoreRoutePath.startsWith("/")) {
      sitecoreRoutePath = `/${sitecoreRoutePath}`;
  }
  return { sitecoreRoutePath };
};

export { resolveUrlParams };
