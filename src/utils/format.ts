interface Years {
  start: number;
  end?: number | undefined;
}

const short = (year: number) => String(year).slice(-2);

/** Role and case-study dates: "2021 - 23", "2025 - now". */
export const formatYears = ({ start, end }: Years) => `${start} - ${end ? short(end) : 'now'}`;

/** Inline dates, as in "Aspira · 2025-26". */
export const formatYearsCompact = ({ start, end }: Years) =>
  end && end !== start ? `${start}-${short(end)}` : String(start);

/** Content dates are calendar days; format in UTC so the day never shifts. */
export const formatDate = (date: Date) =>
  date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC' });

/** Everyone on Planet Malone, per the bearded dragon's census. */
export const countPopulation = (residents: { count: number }[]) =>
  residents.reduce((sum, r) => sum + r.count, 0);
