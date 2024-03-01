import React, { ChangeEventHandler } from "react";
import { FieldData, GroupData, OptionData, SectionData } from "../Form/formSlice";
import Section, { SectionTypes } from "./Section";
import Group from "../Group/Group";
import SelectField from "../Fields/SelectField/SelectField";
import Field from "../Field/Field";

interface Props {
    guitars: OptionData[]
    sections: SectionData[]
    onChange: ChangeEventHandler<HTMLSelectElement>
}

const GuitarsSection: React.FC<Props> = ({ guitars, sections, onChange }) => {
    let guitarsSection = sections.find((section: SectionData) => {
        return section.type === SectionTypes.GUITARS;
    })

    return (
        <div className={"fggc-form-guitar-section"}>
            {
                guitarsSection && guitarsSection.groups.length > 0 &&
                <Section key={guitarsSection.id} title={guitarsSection.title}>
                    {guitarsSection.groups.map((group: GroupData) => {
                        return (
                            <Group key={group.id} {...group}>
                                <SelectField id={'model'} label={'Model'} fieldName={'model'} isRequired={true} options={guitars} onChange={onChange}/>
                                {group.fields.map((field: FieldData) => {
                                    return <Field key={field.id} field={field} index={field.id}/>
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