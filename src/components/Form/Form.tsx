import React, {useEffect, useState} from 'react';
import SelectField, {SelectOption} from "../SelectField/SelectField";
import RadioField, {RadioOption} from "../RadioField/RadioField";
import Section from "../Section/Section";
import Group from "../Group/Group";
import {useSelector} from "react-redux";
import {loadSections, selectSectionsArray} from "./formSlice";
import {useAppDispatch} from "../../redux/store";

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

    const dispatch = useAppDispatch();

    const sections = useSelector(selectSectionsArray);

    useEffect(() => {
        dispatch(loadSections())
    }, [dispatch]);

    const getField = (field: FieldData, index: any) => {
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

    return (
        <div className="fggc-form">

            {sections && sections.map((section: SectionData, index: any) => {
                return (
                    <Section key={index} title={section.title}>
                        {section.groups.map((group, index: any) => {
                            return (
                                <Group key={index} title={group.title} width={group.width}>
                                    {group.fields.map((field, index: any) => {
                                        return (getField(field, index));
                                    })}
                                </Group>
                            )
                        })}
                    </Section>
                );
            })}

        </div>
    );
}

export default Form;