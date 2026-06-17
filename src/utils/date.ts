export const formatDate = (value?: string, locale = 'es-CO') => {
  if (!value) return '-';
  return new Date(value).toLocaleDateString(locale);
};
