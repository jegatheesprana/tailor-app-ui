import {
    Route,
} from "react-router-dom";

import Table from "./Table";
import Add from "./Add";

const Materials = () => {
    return (
        <>
            <Route exact path="/app/materials" component={Table} />
            <Route exact path="/app/materials/add" component={Add} />
            <Route exact path="/app/materials/edit/:id" component={Add} />
        </>
    );
}

export default Materials;