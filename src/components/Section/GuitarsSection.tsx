import React, { ChangeEventHandler } from "react";
import { FieldData, GroupData, OptionData, SectionData, selectSelectedGuitarID } from "../Form/formSlice";
import Section, { SectionTypes } from "./Section";
import Group from "../Group/Group";
import Field from "../Field/Field";
import { useSelector } from "react-redux";

interface Props {
    guitars: OptionData[]
    sections: SectionData[]
    onGuitarChange: ChangeEventHandler<HTMLSelectElement>
}

const GuitarsSection: React.FC<Props> = ({ guitars, sections, onGuitarChange }) => {
    const selectedGuitarID = useSelector(selectSelectedGuitarID);

    let guitarsSection = sections.find((section: SectionData) => {
        return section.type === SectionTypes.GUITARS;
    })

    return (
        <div className={"fggc-form-guitar-section"}>
            {
                guitarsSection && guitarsSection.groups.length > 0 &&
                <Section key={guitarsSection.id} title={guitarsSection.title}>
                    {guitarsSection.groups.map((group: GroupData) => {
                        const modelField: FieldData = {
                            id: 'model',
                            label: 'Model',
                            fieldName: 'model',
                            isRequired: true,
                            options: guitars,
                            type: 'select',
                        }
                        return (
                            <Group key={group.id} {...group}>
                                <Field field={modelField} index={'model'} onChange={onGuitarChange}/>
                                {group.fields.map((field: FieldData) => {
                                    return <Field key={field.id} field={field} index={`${selectedGuitarID}-${field.id}`}/>
                                })}
                            </Group>
                        )
                    })}
                </Section>
            }
        </div>
    )
}

export default GuitarsSection;