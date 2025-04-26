import React from 'react';
import {Dropdown} from 'primereact/dropdown';

const DropdownMenu = ({options, placeholder, selectedOption, onOptionChange}) => {
    return (
        <div>
            <Dropdown
                value={selectedOption}
                options={options.map(option => ({label: option, value: option}))}
                onChange={(e) => onOptionChange(e.value)}
                placeholder={placeholder}
                style={{ margin: '20px' }}
            />
        </div>
    );
};

export default DropdownMenu;
