import React from "react";

const FilterDropDown = ({ statuses, filterTasks }) => {
    return(
        // <div className="">
            <select onChange={(e) => filterTasks(e.target.value)}>
                <option value=''>All</option>
                {statuses.map((status) => (
                    <option key={status} value={status}>{status}</option>
                ))}
            </select>
        // </div>
    );
};

export default FilterDropDown;