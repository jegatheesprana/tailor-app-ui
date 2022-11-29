import {
    Route,
} from "react-router-dom";

import Table from "./Table";
import Add from "./Add";

const Tailors = () => {
    return (
        <>
            <Route exact path="/app/tailors" component={Table} />
            <Route exact path="/app/tailors/add" component={Add} />
            <Route exact path="/app/tailors/edit/:id" component={Add} />
        </>
    );
}

export default Tailors;