export const flattenObject = (obj, delimiter = ".", prefix = "") => {
  if (!obj || typeof obj !== "object") {
    return obj || {};
  }

  return Object.keys(obj).reduce((acc, k) => {
    const pre = prefix.length ? `${prefix}${delimiter}` : "";
    const key = prefix.length ? `${prefix}${delimiter}${k}` : k;

    if (
      typeof obj[k] === "object" &&
      obj[k] !== null &&
      !Array.isArray(obj[k]) &&
      Object.keys(obj[k]).length > 0
    ) {
      Object.assign(
        acc,
        flattenObject(obj[k], delimiter, pre ? `${pre}${k}` : k)
      );
    } else {
      acc[key] = obj[k];
    }
    return acc;
  }, {});
};
