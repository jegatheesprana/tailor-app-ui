import {
    Route,
} from "react-router-dom";

import Table from "./Table";
import Add from "./Add";

const Measurements = () => {
    return (
        <>
            <Route exact path="/app/measurements" component={Table} />
            <Route exact path="/app/measurements/add" component={Add} />
            <Route exact path="/app/measurements/edit/:id" component={Add} />
        </>
    );
}

export default Measurements;