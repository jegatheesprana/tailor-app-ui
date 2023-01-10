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
    { field: 'id', headerName: 'Id' },
    { field: 'name', headerName: 'Name' },
    { field: 'description', headerName: 'description' },
    { field: 'unitPrice', headerName: 'unitPrice' },
  ]
  return (
    <>
      <PageTitle title="Products" button={<Button
        component={Link}
        to="products/add"
        variant="contained"
        size="medium"
        color="secondary"
      >
        Add Products
      </Button>} />
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Widget title="Products" upperTitle noBodyPadding disableWidgetMenu bodyClass={classes.tableOverflow}>
            <DataTable
              columns={columns}
              itemsUrl="/products"
              actions={{
                editRoute: ({ _id }) => `/app/products/edit/${_id}`,
                delUrl: ({ _id }) => `/products/${_id}`
              }}
            />
          </Widget>
        </Grid>
      </Grid>
    </>
  );
}
