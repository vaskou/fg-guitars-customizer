import React, { ChangeEvent, ChangeEventHandler, useEffect, useState } from "react";
import { OptionData, SectionData, selectFieldArray, selectFields, selectGroupArray, selectGroups, selectOptions, selectSelectedGuitarID } from "../Form/formSlice";
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
    const options = useSelector(selectOptions);

    const [guitarImage, setGuitarImage] = useState('');

    useEffect(() => {
        setGuitarImage(options[selectedGuitarID]?.image || '');
    }, [selectedGuitarID, guitarImage, options])

    let guitarsSection = sections.find((section: SectionData) => {
        return section.type === SectionTypes.GUITARS;
    })

    const handleOnGuitarChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const target = e.target;
        const name = target.name;
        const value = target.value;

        if ('model' === name) {
            setGuitarImage(options[value]?.image || '');
        }
        onGuitarChange(e);
    }

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
                                <Field field={modelField} index={'model'} onChange={handleOnGuitarChange}/>
                                {group.fieldIDs.map((fieldID: string) => {
                                    const field = fields[fieldID];
                                    return <Field key={field.id} field={field} index={`${selectedGuitarID}-${field.id}`}/>
                                })}
                            </Group>
                        )
                    })}

                    {guitarImage &&
                        <div className="fggc-form__group uk-width-auto@s">
                            <div className="fggc-form__group__content" style={{ textAlign: 'center' }}>
                                <img src={guitarImage} style={{ maxHeight: '150px' }} alt="Guitar"/>
                            </div>
                        </div>
                    }
                </Section>
            }
        </div>
    )
}

export default GuitarsSection;