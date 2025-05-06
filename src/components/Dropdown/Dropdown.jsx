import React, { memo, useCallback } from 'react';
import { Dropdown as PrimeDropdown } from 'primereact/dropdown';

const labelMap = {
    'defeituosa': 'Defeituosa',
    'nao_defeituosa': 'Não Defeituosa',
    'todas': 'Todas',
    'Últimas 24 horas': 'Últimas 24 horas',
    '7dias': '7 Dias',
    '30dias': '30 Dias',
    'macas': 'Maçãs',
    'mangas': 'Mangas'
};

const formatLabel = (value) => labelMap[value] || value;

const Dropdown = ({ options, placeholder, selectedOption, onOptionChange }) => {
    const handleChange = useCallback((e) => {
        onOptionChange(e.value);
    }, [onOptionChange]);

    return (
        <div>
            <PrimeDropdown
                value={selectedOption}
                options={options.map(option => ({
                    label: formatLabel(option),
                    value: option
                }))}
                onChange={handleChange}
                placeholder={placeholder}
                style={{ margin: '20px', width: '200px' }}
            />
        </div>
    );
};

export default memo(Dropdown);
