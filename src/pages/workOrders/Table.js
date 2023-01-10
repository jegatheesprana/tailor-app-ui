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

export default function Table() {
  const classes = useStyles();

  const columns = [
    { field: 'id', headerName: 'ID' },
    { field: 'customerName', headerName: 'Customer Name' },
    { field: 'contactNumber', headerName: 'Contact Number' },
    { field: 'NIC', headerName: 'NIC' },
    { field: 'date', headerName: 'Date' },
    { field: 'description', headerName: 'Description' },
  ]
  return (
    <>
      <PageTitle title="Work Orders" button={<Button
        component={Link}
        to="workOrders/add"
        variant="contained"
        size="medium"
        color="secondary"
      >
        Add Work Order
      </Button>} />
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Widget title="Work Orders" upperTitle noBodyPadding disableWidgetMenu bodyClass={classes.tableOverflow}>
            <DataTable
              columns={columns}
              itemsUrl="/workOrders"
              actions={{
                editRoute: ({ _id }) => `/app/workOrders/edit/${_id}`,
                delUrl: ({ _id }) => `/workOrders/${_id}`
              }}
            />
          </Widget>
        </Grid>
      </Grid>
    </>
  );
}
