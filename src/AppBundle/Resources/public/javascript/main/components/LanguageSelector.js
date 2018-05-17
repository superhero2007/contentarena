import React from 'react';
import Select from 'react-select';
import {languages} from "../../../data/languages";

export const LanguageSelector = ({value, onChange}) => (
    <Select
        name="form-field-name"
        onChange={onChange}
        value={value}
        multi={true}
        options={Object.values(languages).map((i,k)=>({value : i.name , label : i.name }))}
    />
);

