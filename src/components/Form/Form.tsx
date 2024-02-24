import React, {ChangeEvent, useEffect, useState} from 'react';
import SelectField from "../SelectField/SelectField";
import RadioField from "../RadioField/RadioField";
import Section from "../Section/Section";
import Group from "../Group/Group";
import {useSelector} from "react-redux";
import {FieldData, GroupData, SectionData, loadData, selectGuitarsArray, selectSectionsArray} from "./formSlice";
import {useAppDispatch} from "../../redux/store";
import TextareaField from "../TexteareaField/TexteareaField";
import Loader from "../Loader/Loader";

enum SectionTypes {
    GUITARS = 'guitars',
    FIELDS = 'fields',
}

interface Props {
}

const Form: React.FC<Props> = ({}) => {

    const dispatch = useAppDispatch();

    const [loading, setLoading] = useState(true);
    const guitars = useSelector(selectGuitarsArray);
    const sections = useSelector(selectSectionsArray);

    const getData = (value = '') => {
        setLoading(true);

        dispatch(loadData(value)).finally(() => {
            setLoading(false);
        });
    }

    useEffect(() => {
        getData();
    }, [dispatch]);

    const getField = (field: FieldData, index: string) => {
        let fieldComponent;

        switch (field.type) {
            case 'select':
                fieldComponent = <SelectField key={index} {...field}/>
                break;
            case 'radio':
                fieldComponent = <RadioField key={index} {...field}/>
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
            <div className={"fggc-form-guitar-section"}>
                {
                    guitarsSection && guitarsSection.groups.length > 0 &&
                    <Section key={guitarsSection.id} title={guitarsSection.title}>
                        {guitarsSection.groups.map((group: GroupData) => {
                            return (
                                <Group key={group.id} title={group.title} width={group.width}>
                                    <SelectField id={'model'} label={'Model'} fieldName={'model'} isRequired={true} options={guitars} onChange={handleOnChange}/>
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
            getData(value);
        }
    }

    return (
        <div className="fggc-form">
            {loading && <Loader/>}
            <form>
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

                {!loading && <button type={"submit"} className={"uk-button uk-button-primary uk-margin-top"}>{"Submit"}</button>}
            </form>
        </div>
    );
}

export default Form;