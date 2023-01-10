import {
    Route,
} from "react-router-dom";

import Table from "./Table";
import Add from "./Add";

const Products = () => {
    return (
        <>
            <Route exact path="/app/products" component={Table} />
            <Route exact path="/app/products/add" component={Add} />
            <Route exact path="/app/products/edit/:id" component={Add} />
        </>
    );
}

export default Products;