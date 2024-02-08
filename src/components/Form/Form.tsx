import React, {useEffect, useState} from 'react';
import SelectField, {SelectOption} from "../SelectField/SelectField";
import RadioField, {RadioOption} from "../RadioField/RadioField";
import Section from "../Section/Section";
import Group from "../Group/Group";

interface Props {

}

interface OptionData {
    name: string;
    value: string;
}

interface FieldData {
    label: string;
    fieldName: string;
    type: string;
    options: OptionData[];
}

interface GroupData {
    title?: string;
    width: string;
    fields: FieldData[];
}

interface SectionData {
    title: string;
    groups: GroupData[];
}

const Form: React.FC<Props> = ({}) => {

   /* let options: SelectOption[] = [
        {
            name: "Orpheus",
            value: 'orpheus'
        },
        {
            name: "Orpheus1",
            value: 'orpheus1'
        },
    ];*/

    /*let sections: SectionData[] = [
        {
            title: "Choose your guitar",
            groups: [
                {
                    width: "uk-width-1-2@s",
                    fields: [
                        {
                            label: "Model",
                            fieldName: "model",
                            type: "select",
                            options: [
                                {
                                    name: 'Orpheus',
                                    value: 'orpheus'
                                },
                                {
                                    name: "Orpheus1",
                                    value: 'orpheus1'
                                },
                            ]
                        },
                        {
                            label: "Left or Right handed",
                            fieldName: "orientation",
                            type: "radio",
                            options: [
                                {
                                    name: 'Orpheus',
                                    value: 'orpheus'
                                },
                                {
                                    name: "Orpheus1",
                                    value: 'orpheus1'
                                },
                            ]
                        }
                    ]
                }
            ]
        },
        {
            title: "Make your choices",
            groups: [
                {
                    title: "Body",
                    width: "uk-width-1-3@s",
                    fields: [
                        {
                            label: "Body type",
                            fieldName: "body_type",
                            type: "radio",
                            options: [
                                {
                                    name: 'Orpheus',
                                    value: 'orpheus'
                                },
                                {
                                    name: "Orpheus1",
                                    value: 'orpheus1'
                                },
                            ]
                        },
                        {
                            label: "Body wood",
                            fieldName: "body_wood",
                            type: "radio",
                            options: [
                                {
                                    name: 'Orpheus',
                                    value: 'orpheus'
                                },
                                {
                                    name: "Orpheus1",
                                    value: 'orpheus1'
                                },
                            ]
                        }
                    ]
                }
            ]
        }
    ];*/

    return (
        <div className="fggc-form">

            {window.sections && window.sections.map((section: SectionData, index: any) => {
                return (
                    <Section key={index} title={section.title}>
                        {section.groups.map((group, index: any) => {
                            return (
                                <Group key={index} title={group.title} width={group.width}>
                                    {group.fields.map((field, index: any) => {
                                        const getField = (field: FieldData) => {
                                            let fieldComponent;

                                            switch (field.type) {
                                                case 'select':
                                                    fieldComponent = <SelectField key={index} label={field.label} fieldName={field.fieldName} options={field.options}/>
                                                    break;
                                                case 'radio':
                                                    fieldComponent = <RadioField key={index} label={field.label} fieldName={field.fieldName} options={field.options}/>
                                                    break;
                                            }

                                            return fieldComponent;
                                        }
                                        return (getField(field));
                                    })}
                                </Group>
                            )
                        })}
                    </Section>
                );
            })}

           {/* <Section title={"Choose your guitar"}>
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
            </Section>*/}
        </div>
    );
}

export default Form;