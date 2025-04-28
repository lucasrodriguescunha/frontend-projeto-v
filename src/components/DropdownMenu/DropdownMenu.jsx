import React, {memo, useCallback} from 'react';
import {Dropdown} from 'primereact/dropdown';

const DropdownMenu = ({options, placeholder, selectedOption, onOptionChange}) => {
    const handleChange = useCallback((e) => {
        onOptionChange(e.value);
    }, [onOptionChange]);

    return (
        <div>
            <Dropdown
                value={selectedOption}
                options={options.map(option => ({label: option, value: option}))}
                onChange={handleChange}
                placeholder={placeholder}
                style={{margin: '20px'}}
            />
        </div>
    );
};

export default memo(DropdownMenu);
