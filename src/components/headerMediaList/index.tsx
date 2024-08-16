import React from "react";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { IconButton } from "@mui/material";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";

const styles = {
  root: {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    flexWrap: "wrap",
    marginBottom: 1.5,
  },
  arrowButton: {
    color: "inherit",
  },
};

interface PaginationHeaderProps {
  title: string;
  page: number;
  totalPages: number;
  onPageChange: (newPage: number) => void;
  disableArrows?: boolean;
}

const Header: React.FC<PaginationHeaderProps> = ({
  title,
  page,
  totalPages,
  onPageChange,
  disableArrows = false,
}) => {
  return (
    <Paper component='div' sx={styles.root}>
      <IconButton
        sx={styles.arrowButton}
        onClick={() => onPageChange(page - 1)}
        disabled={disableArrows || page <= 1}
      >
        <ArrowBackIos />
      </IconButton>
      <Typography variant='h4' component='h3'>
        {title}
      </Typography>
      <IconButton
        sx={styles.arrowButton}
        onClick={() => onPageChange(page + 1)}
        disabled={disableArrows || page >= totalPages}
      >
        <ArrowForwardIos />
      </IconButton>
    </Paper>
  );
};

export default Header;
