import React from 'react';
import Select from 'react-select';

export const CountrySelector = ({value, onChange, className, multi = true}) => (
    <Select
        className={className }
        name="form-field-name"
        onChange={onChange}
        value={value}
        multi={multi}
        options={Object.values(ContentArena.Data.Countries).map((i,k)=>({value : i.name , label : i.name }))}
    />
);

