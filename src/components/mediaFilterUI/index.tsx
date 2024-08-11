import React, { useState } from "react";
import FilterCard from "../filterMediaCard";
import Fab from "@mui/material/Fab";
import Drawer from "@mui/material/Drawer";

const styles = {
  root: {
    backgroundColor: "#bfbfbf",
  },
  fab: {
    marginTop: 8,
    position: "fixed",
    top: 10,
    right: 20,
  },
};

interface MediaFilterUIProps {
  onFilterValuesChange: (f: string, s: string) => void;
  onSortOptionChange: (name: string, direction: "asc" | "desc") => void;
  titleFilter: string;
  genreFilter?: string;
  sortOption: { name: string; direction: "asc" | "desc" };
  isActorPage?: boolean;
}

const MediaFilterUI: React.FC<MediaFilterUIProps> = ({
  onFilterValuesChange,
  onSortOptionChange,
  titleFilter,
  genreFilter,
  sortOption,
  isActorPage = false,
}) => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <>
      <Fab
        color='secondary'
        variant='extended'
        onClick={() => setDrawerOpen(true)}
        sx={styles.fab}
      >
        Filter
      </Fab>
      <Drawer
        anchor='left'
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        <FilterCard
          onUserInput={onFilterValuesChange}
          onSortChange={onSortOptionChange}
          titleFilter={titleFilter}
          genreFilter={genreFilter}
          sortOption={sortOption}
          isActorPage={isActorPage}
        />
      </Drawer>
    </>
  );
};

export default MediaFilterUI;
