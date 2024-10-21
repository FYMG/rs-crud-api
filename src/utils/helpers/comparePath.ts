function comparePath(pathname: string, path: string, ...slug: unknown[]) {
  const filteredSlug = slug.filter((item) => typeof item === "string");
  const slugStr = filteredSlug.length > 0 ? filteredSlug.join("/") : "";
  const fullPath = `${path}/${slugStr}`.replaceAll("//", "/");

  return pathname === fullPath || `${pathname}/` === fullPath;
}

export default comparePath;
