import React from "react";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

const styles = {
  root: {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    flexWrap: "wrap",
    marginBottom: 1.5,
  },
};

interface HeaderProps {
  title: string;
}

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
