import QueryString from "qs";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const serverFetch = async (
  endPoint,
  query,
  cache = { cache: "force-cache" } //force-cache => Is SSG page
) => {
  let url = BASE_URL;
  if (endPoint) url += endPoint;
  if (query) url += `?${QueryString.stringify(query)}`;

  console.log(url);

  try {
    const res = await fetch(`${url}`, cache);
    const json = await res.json();
    return json;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export default serverFetch;
