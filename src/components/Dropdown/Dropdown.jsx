import React, { memo, useCallback } from 'react';
import { Dropdown as PrimeDropdown } from 'primereact/dropdown';

const Dropdown = ({ options, placeholder, selectedOption, onOptionChange }) => {
    const handleChange = useCallback((e) => {
        onOptionChange(e.value);
    }, [onOptionChange]);

    return (
        <div>
            <PrimeDropdown
                value={selectedOption}
                options={options.map(option => ({ label: option, value: option }))}
                onChange={handleChange}
                placeholder={placeholder}
                style={{ margin: '20px' }}
            />
        </div>
    );
};

export default memo(Dropdown);
