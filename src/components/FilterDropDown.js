import React from "react";

const FilterDropDown = ({ statuses, filterTasks }) => {
    return(
        <select onChange={(e) => filterTasks(e.target.value)}>
            <option value=''>All</option>
            {statuses.map((status) => (
                <option key={status} value={status}>{status}</option>
            ))}
        </select>
    );
};

export default FilterDropDown;