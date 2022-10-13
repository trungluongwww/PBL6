const lowercaseAndRemoveDiacritics = (str: string): string => {
  return str
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "");
};

const convertToUsLang = (str: string): string => {
  return lowercaseAndRemoveDiacritics(`${str}`);
};

export default {
  convertToUsLang,
};
