import {
    Route,
} from "react-router-dom";

import Table from "./Table";
import Add from "./Add";

const Customers = () => {
    return (
        <>
            <Route exact path="/app/customers" component={Table} />
            <Route exact path="/app/customers/add" component={Add} />
            <Route exact path="/app/customers/edit/:id" component={Add} />
        </>
    );
}

export default Customers;