export const filters = [
  {
    id: 'source',
    name: 'Data Source',
    options: [
      { value: 'EU', label: 'EU Funding' },
      { value: 'DAAD', label: 'DAAD' },
      { value: 'FOERDERDATENBANK', label: 'Förderdatenbank' },
    ],
  },
  {
    id: 'location',
    name: 'Location',
    options: [
      { value: 'bundesweit', label: 'Bundesweit' },
      { value: 'Mecklenburg-Vorpommern', label: 'Mecklenburg-Vorpommern' },
      { value: 'Sachsen', label: 'Sachsen' },
      { value: 'Nordrhein-Westfalen', label: 'Nordrhein-Westfalen' },
      { value: 'Baden-Württemberg', label: 'Baden-Württemberg' },
      { value: 'Bayern', label: 'Bayern' },
      { value: 'Thüringen', label: 'Thüringen' },
      { value: 'Brandenburg', label: 'Brandenburg' },
      { value: 'Hamburg', label: 'Hamburg' },
      { value: 'Niedersachsen', label: 'Niedersachsen' },
      { value: 'Saarland', label: 'Saarland' },
      { value: 'Hessen', label: 'Hessen' },
      { value: 'Sachsen-Anhalt', label: 'Sachsen-Anhalt' },
      { value: 'Bremen', label: 'Bremen' },
      { value: 'Schleswig-Holstein', label: 'Schleswig-Holstein' },
      { value: 'Rheinland-Pfalz', label: 'Rheinland-Pfalz' },
      { value: 'Berlin', label: 'Berlin' },
    ],
  },
  {
    id: 'funding-type',
    name: 'Funding Type',
    options: [
      { value: 'Zuschuss', label: 'Zuschuss' },
      { value: 'Darlehen', label: 'Darlehen' },
      { value: 'Garantie', label: 'Garantie' },
      { value: 'Beteiligung', label: 'Beteiligung' },
      { value: 'Bürgschaft', label: 'Bürgschaft' },
    ],
  },
  {
    id: 'target-group',
    name: 'Target Group',
    options: [
      { value: 'Existenzgründer/in', label: 'Existenzgründer/in' },
      { value: 'Unternehmen', label: 'Unternehmen' },
      { value: 'Kommune', label: 'Kommune' },
      { value: 'Privatperson', label: 'Privatperson' },
      { value: 'Verband/Vereinigung', label: 'Verband/Vereinigung' },
      { value: 'Öffentliche Einrichtung', label: 'Öffentliche Einrichtung' },
      { value: 'Hochschule', label: 'Hochschule' },
      { value: 'Forschungseinrichtung', label: 'Forschungseinrichtung' },
      { value: 'Bildungseinrichtung', label: 'Bildungseinrichtung' },
    ],
  },
];

export const validateFilters = (userFilters: SelectedFilters) => {
  return Object.entries(userFilters).every(([key, value]) => {
    // check if filter exists
    if (!filters.find((filter) => filter.id === key)) return false;

    // check if value is an array of strings
    if (!Array.isArray(value)) return false;
    if (!value.every((v) => typeof v === 'string')) return false;

    // check if value is a valid option
    if (!value.every((v) => filters.find((filter) => filter.id === key)?.options.find((option) => option.value === v)))
      return false;

    return true;
  });
};

export type SelectedFilters = {
  [key: string]: string[];
};

// sanitizeFilters does not validate the filters, but adds the default values for the filters that are not set
export const sanitizeFilters = (userFilters: SelectedFilters) => {
  const sanitized = { ...userFilters };

  filters.forEach((filter) => {
    if (!sanitized[filter.id]) {
      sanitized[filter.id] = filter.options.map((option) => option.value);
    }
  });

  return sanitized;
};

export default filters;
