export const getErrorMessage = (
  obj: Record<string, any>,
  propertyPath: string
) => {
  let value = obj;

  if (value[propertyPath]) {
    value = value[propertyPath];
  } else {
    return undefined;
  }
  return value.message;
};
