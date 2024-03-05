import React, { useState } from "react";

const FilterDropDown = ({ statuses, onFilterChange }) => {

    console.log(statuses[0]);
    const [selected, setSelected] = useState(statuses[0]);

    const handleFilterChange = (e) => {
        setSelected(e.target.value);
        onFilterChange(e.target.value);
    }
    return(
            <select onChange={handleFilterChange}>
                {statuses.map((status) => (
                    <option key={status} value={status}>{status}</option>
                ))}
            </select>
    );
};

export default FilterDropDown;