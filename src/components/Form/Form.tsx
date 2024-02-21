import React, {ChangeEvent, useEffect, useState} from 'react';
import SelectField, {SelectOption} from "../SelectField/SelectField";
import RadioField, {RadioOption} from "../RadioField/RadioField";
import Section from "../Section/Section";
import Group from "../Group/Group";
import {useSelector} from "react-redux";
import {OptionData, FieldData, GroupData, SectionData, loadData, selectGuitarsArray, selectSectionsArray} from "./formSlice";
import {useAppDispatch} from "../../redux/store";
import TextareaField from "../TexteareaField/TexteareaField";

enum SectionTypes {
    GUITARS = 'guitars',
    FIELDS = 'fields',
}

interface Props {

}

const Form: React.FC<Props> = ({}) => {

    const dispatch = useAppDispatch();

    const guitars = useSelector(selectGuitarsArray);
    const sections = useSelector(selectSectionsArray);

    useEffect(() => {
        dispatch(loadData())
    }, [dispatch]);

    const getField = (field: FieldData, index: string) => {
        let fieldComponent;

        switch (field.type) {
            case 'select':
                fieldComponent = <SelectField key={index} label={field.label} fieldName={field.fieldName} options={field.options}/>
                break;
            case 'radio':
                fieldComponent = <RadioField key={index} label={field.label} fieldName={field.fieldName} options={field.options}/>
                break;
            case 'textarea':
                fieldComponent = <TextareaField key={index} label={field.label} fieldName={field.fieldName}/>
                break;
        }

        return fieldComponent;
    }

    const getGuitarsSection = (sections: SectionData[]) => {
        let guitarsSection = sections.find((section: SectionData) => {
            return section.type === SectionTypes.GUITARS;
        })

        return (
            <div>
                {
                    guitarsSection && guitarsSection.groups.length > 0 &&
                    <Section key={guitarsSection.id} title={guitarsSection.title}>
                        {guitarsSection.groups.map((group: GroupData) => {
                            return (
                                <Group key={group.id} title={group.title} width={group.width}>
                                    <SelectField label={'Model'} fieldName={'model'} options={guitars} onChange={handleOnChange}/>
                                    {group.fields.map((field: FieldData) => {
                                        return (getField(field, field.id));
                                    })}
                                </Group>
                            )
                        })}
                    </Section>
                }
            </div>
        )
    }

    const handleOnChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const target = e.target;
        const name = target.name;
        const value = target.value;

        if ('model' === name) {
            dispatch(loadData(value));
        }
    }

    return (
        <div className="fggc-form">
            {getGuitarsSection(sections)}

            {sections && sections.map((section: SectionData) => {
                return (
                    section.type === SectionTypes.FIELDS && section.groups.length > 0 &&
                    <Section key={section.id} title={section.title}>
                        {section.groups.map((group: GroupData) => {
                            return (
                                <Group key={group.id} title={group.title} width={group.width}>
                                    {group.fields.map((field: FieldData) => {
                                        return (getField(field, field.id));
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