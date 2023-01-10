import {
    Route,
} from "react-router-dom";

import Table from "./Table";
import Add from "./Add";

const CoatRentings = () => {
    return (
        <>
            <Route exact path="/app/workOrders" component={Table} />
            <Route exact path="/app/workOrders/add" component={Add} />
            <Route exact path="/app/workOrders/edit/:id" component={Add} />
        </>
    );
}

export default CoatRentings;