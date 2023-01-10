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
    { field: 'customerName', headerName: 'Customer Name' },
    { field: 'contactNumber', headerName: 'Contact Number' },
    { field: 'NIC', headerName: 'NIC' },
    { field: 'date', headerName: 'Date' },
    { field: 'amount', headerName: 'Amount' },
  ]
  return (
    <>
      <PageTitle title="Payments" button={<Button
        component={Link}
        to="payments/add"
        variant="contained"
        size="medium"
        color="secondary"
      >
        Add Payments
      </Button>} />
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Widget title="Payments" upperTitle noBodyPadding disableWidgetMenu bodyClass={classes.tableOverflow}>
            <DataTable
              columns={columns}
              itemsUrl="/payments"
              actions={{
                editRoute: ({ _id }) => `/app/payments/edit/${_id}`,
                delUrl: ({ _id }) => `/payments/${_id}`
              }}
            />
          </Widget>
        </Grid>
      </Grid>
    </>
  );
}
