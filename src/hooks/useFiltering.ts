import { useState } from "react";

interface Filter {
  name: string;
  value: string;
  condition: (item: any, value: string) => boolean;
}

interface SortOption {
  name: string;
  direction: "asc" | "desc";
}

const useFiltering = (filters: Filter[], initialSortOption: SortOption) => {
  const [filterValues, setFilterValues] = useState(() => {
    return filters.map((f) => ({
      name: f.name,
      value: f.value,
    }));
  });

  const [sortOption, setSortOption] = useState(initialSortOption);

  const filteringConditions = filters.map((f) => f.condition);

  const applyFilterAndSort = (collection: any[]) => {
    const filteredData = filteringConditions.reduce(
      (data, conditionFn, index) => {
        return data.filter((item: any) => {
          return conditionFn(item, filterValues[index].value);
        });
      },
      collection
    );

    const sortedData = [...filteredData].sort((a, b) => {
      const fieldA = a[sortOption.name] || a.title || a.name;
      const fieldB = b[sortOption.name] || b.title || b.name;

      if (fieldA < fieldB) return sortOption.direction === "asc" ? -1 : 1;
      if (fieldA > fieldB) return sortOption.direction === "asc" ? 1 : -1;
      return 0;
    });

    return sortedData;
  };

  return {
    filterValues,
    setFilterValues,
    sortOption,
    setSortOption,
    applyFilterAndSort,
  };
};

export default useFiltering;
