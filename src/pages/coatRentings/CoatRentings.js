import {
    Route,
} from "react-router-dom";

import Table from "./Table";
import Add from "./Add";

const CoatRentings = () => {
    return (
        <>
            <Route exact path="/app/coatRentings" component={Table} />
            <Route exact path="/app/coatRentings/add" component={Add} />
            <Route exact path="/app/coatRentings/edit/:id" component={Add} />
        </>
    );
}

export default CoatRentings;