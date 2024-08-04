import React from "react";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { HeaderProps } from "../../types/interfaces";

const styles = {
  root: {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    flexWrap: "wrap",
    marginBottom: 1.5,
  },
};

const Header: React.FC<HeaderProps> = (headerProps) => {
  const title = headerProps.title;

  return (
    <Paper component='div' sx={styles.root}>
      <Typography variant='h4' component='h3'>
        {title}
      </Typography>
    </Paper>
  );
};

export default Header;
