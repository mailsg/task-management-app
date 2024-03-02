import React from "react";

const FilterDropDown = ({ statuses, onFilterChange }) => {
    const handleFilterChange = (e) => {
        onFilterChange(e.target.value);
    }
    return(
            <select onChange={handleFilterChange}>
                <option value=''>All</option>
                {statuses.map((status) => (
                    <option key={status} value={status}>{status}</option>
                ))}
            </select>
    );
};

export default FilterDropDown;