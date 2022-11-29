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

export default function Measurements() {
  const classes = useStyles();

  const columns = [
    { field: 'name', headerName: 'Name' },
    { field: 'value', headerName: 'Value' },
  ]
  return (
    <>
      <PageTitle title="Measurements" button={<Button
        component={Link}
        to="measurements/add"
        variant="contained"
        size="medium"
        color="secondary"
      >
        Add Measurement
      </Button>} />
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Widget title="Measurements" upperTitle noBodyPadding disableWidgetMenu bodyClass={classes.tableOverflow}>
            <DataTable
              columns={columns}
              itemsUrl="/measurements"
              actions={{
                editRoute: ({ _id }) => `/app/measurements/edit/${_id}`,
                delUrl: ({ _id }) => `/measurements/${_id}`
              }}
            />
          </Widget>
        </Grid>
      </Grid>
    </>
  );
}
