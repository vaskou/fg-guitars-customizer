import React, {useEffect, useState} from 'react';
import SelectField, {SelectOption} from "../SelectField/SelectField";
import RadioField from "../RadioField/RadioField";
import Section from "../Section/Section";
import Group from "../Group/Group";

interface Props {

}

const Form: React.FC<Props> = ({}) => {

    let options: SelectOption[] = [
        {
            name: "Orpheus",
            value: 'orpheus'
        },
        {
            name: "Orpheus1",
            value: 'orpheus1'
        },
    ];

    return (
        <div className="fggc-form">
            <Section title={"Choose your guitar"}>
                <Group width={"uk-width-1-2@s"}>
                    <SelectField label={"Model"} fieldName={"model"} options={options}/>
                    <RadioField label={"Left or Right handed"} fieldName={"orientation"} options={options}/>
                </Group>
            </Section>

            <Section title={"Make your choices"}>
                <Group title={"Body"} width={"uk-width-1-3@s"}>
                    <SelectField label={"Model"} fieldName={"model"} options={options}/>
                    <RadioField label={"Left or Right handed"} fieldName={"orientation"} options={options}/>
                </Group>
                <Group title={"Body"} width={"uk-width-1-3@s"}>
                    <SelectField label={"Model"} fieldName={"model"} options={options}/>
                    <RadioField label={"Left or Right handed"} fieldName={"orientation"} options={options}/>
                </Group>
                <Group title={"Body"} width={"uk-width-1-3@s"}>
                    <SelectField label={"Model"} fieldName={"model"} options={options}/>
                    <RadioField label={"Left or Right handed"} fieldName={"orientation"} options={options}/>
                </Group>
            </Section>
        </div>
    );
}

export default Form;