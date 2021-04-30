const customMediaQuery = (maxWidth: number): string => {
  return `@media (max-width: ${maxWidth}px)`;
};

export const media = {
  custom: customMediaQuery,
  desktop: customMediaQuery(1000),
  tablet: customMediaQuery(735),
  phone: customMediaQuery(640),
};
