export const separateCapitalizeName = (name: string): string =>
  name.replace(/([a-z])([A-Z])/g, '$1 $2');

export const capitalizeFirstLetter = (name: string): string => {
  const capitalizedName = name.substring(0, 1).toUpperCase() + name.substring(1);
  return separateCapitalizeName(capitalizedName);
};
