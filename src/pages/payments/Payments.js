import {
    Route,
} from "react-router-dom";

import Table from "./Table";
import Add from "./Add";

const Payments = () => {
    return (
        <>
            <Route exact path="/app/payments" component={Table} />
            <Route exact path="/app/payments/add" component={Add} />
            <Route exact path="/app/payments/edit/:id" component={Add} />
        </>
    );
}

export default Payments;