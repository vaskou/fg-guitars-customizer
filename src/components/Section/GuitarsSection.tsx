import React, { ChangeEventHandler } from "react";
import { OptionData, SectionData, selectFieldArray, selectFields, selectGroupArray, selectGroups, selectSelectedGuitarID } from "../Form/formSlice";
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
    const groupsArray = useSelector(selectGroupArray);
    const groups = useSelector(selectGroups);
    const fieldsArray = useSelector(selectFieldArray);
    const fields = useSelector(selectFields);

    let guitarsSection = sections.find((section: SectionData) => {
        return section.type === SectionTypes.GUITARS;
    })

    return (
        <div className={"fggc-form-guitar-section"}>
            {
                guitarsSection && guitarsSection.groupIDs.length > 0 &&
                <Section key={guitarsSection.id} title={guitarsSection.title}>
                    {guitarsSection.groupIDs.map((groupID: string) => {

                        const group = groups[groupID];
                        const modelField = fields['model'];

                        return (
                            <Group key={group.id} {...group}>
                                <Field field={modelField} index={'model'} onChange={onGuitarChange}/>
                                {group.fieldIDs.map((fieldID: string) => {
                                    const field = fields[fieldID];
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