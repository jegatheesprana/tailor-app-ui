import React from "react";
import { Link } from "react-router-dom";
import { Grid, Button } from "@mui/material";
import { makeStyles } from "@mui/styles";

// components
import PageTitle from "../../components/PageTitle/PageTitle";
import Widget from "../../components/Widget/Widget";
import DataTable from "components/DataTable";


const useStyles = makeStyles(theme => ({
  tableOverflow: {
    overflow: 'auto'
  }
}))

export default function Tailors() {
  const classes = useStyles();

  const columns = [
    { field: 'id', headerName: 'Tailor ID' },
    { field: 'name', headerName: 'Name' },
    { field: 'contactNumber', headerName: 'Contact Number' },
    { field: 'NIC', headerName: 'NIC' },
  ]
  return (
    <>
      <PageTitle title="Tailors" button={<Button
        component={Link}
        to="tailors/add"
        variant="contained"
        size="medium"
        color="secondary"
      >
        Add Tailor
      </Button>} />
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Widget title="Tailors" upperTitle noBodyPadding disableWidgetMenu bodyClass={classes.tableOverflow}>
            <DataTable
              columns={columns}
              itemsUrl="/tailors"
              actions={{
                editRoute: ({ _id }) => `/app/tailors/edit/${_id}`,
                delUrl: ({ _id }) => `/tailors/${_id}`
              }}
            />
          </Widget>
        </Grid>
      </Grid>
    </>
  );
}
