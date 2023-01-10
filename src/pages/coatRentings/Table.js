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
    { field: 'orderNumber', headerName: 'Order Number' },
    { field: 'customerName', headerName: 'Customer Name' },
    { field: 'contactNumber', headerName: 'Contact Number' },
    { field: 'NIC', headerName: 'NIC' },
    { field: 'coatNumber', headerName: 'Coat Number' },
    { field: 'price', headerName: 'Price' },
    { field: 'returnDate', headerName: 'Return Date' },
  ]
  return (
    <>
      <PageTitle title="Coat Rentings" button={<Button
        component={Link}
        to="coatRentings/add"
        variant="contained"
        size="medium"
        color="secondary"
      >
        Add Coat Rentings
      </Button>} />
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Widget title="Coat Rentings" upperTitle noBodyPadding disableWidgetMenu bodyClass={classes.tableOverflow}>
            <DataTable
              columns={columns}
              itemsUrl="/coatRentings"
              actions={{
                editRoute: ({ _id }) => `/app/coatRentings/edit/${_id}`,
                delUrl: ({ _id }) => `/coatRentings/${_id}`
              }}
            />
          </Widget>
        </Grid>
      </Grid>
    </>
  );
}
