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
    { field: 'id', headerName: 'Customer ID' },
    { field: 'name', headerName: 'Name' },
    { field: 'contactNumber', headerName: 'Contact Number' },
    { field: 'NIC', headerName: 'NIC' },
  ]
  return (
    <>
      <PageTitle title="Customers" button={<Button
        component={Link}
        to="customers/add"
        variant="contained"
        size="medium"
        color="secondary"
      >
        Add Customer
      </Button>} />
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Widget title="Customers" upperTitle noBodyPadding disableWidgetMenu bodyClass={classes.tableOverflow}>
            <DataTable
              columns={columns}
              itemsUrl="/customers"
              actions={{
                editRoute: ({ _id }) => `/app/customers/edit/${_id}`,
                delUrl: ({ _id }) => `/customers/${_id}`
              }}
            />
          </Widget>
        </Grid>
      </Grid>
    </>
  );
}
