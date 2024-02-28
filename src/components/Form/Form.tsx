import React, {ChangeEvent, useEffect, useState} from 'react';
import SelectField from "../Fields/SelectField/SelectField";
import RadioField from "../Fields/RadioField/RadioField";
import Section from "../Section/Section";
import Group from "../Group/Group";
import {useSelector} from "react-redux";
import {FieldData, GroupData, SectionData, loadData, setTotalPrice, selectGuitarsArray, selectSectionsArray, selectTotalPrice, selectSelectedOptions} from "./formSlice";
import {useAppDispatch} from "../../redux/store";
import TextareaField from "../Fields/TexteareaField/TexteareaField";
import Loader from "../Loader/Loader";
import EmailField from "../Fields/EmailField/EmailField";
import TextField from "../Fields/TextField/TextField";
import PriceEstimate from "../PriceEstimate/PriceEstimate";

enum SectionTypes {
    GUITARS = 'guitars',
    FIELDS = 'fields',
}

interface Props {
}

const Form: React.FC<Props> = ({}) => {

    const dispatch = useAppDispatch();

    const [loading, setLoading] = useState(true);
    const [selectedGuitarID, setSelectedGuitarID] = useState('');
    const [basePrice, setBasePrice] = useState(0);

    const guitars = useSelector(selectGuitarsArray);
    const sections = useSelector(selectSectionsArray);
    const totalPrice = useSelector(selectTotalPrice);
    const selectedOptions = useSelector(selectSelectedOptions);

    const getData = (value = '') => {
        setLoading(true);

        dispatch(loadData(value)).finally(() => {
            setLoading(false);
        });
    }

    useEffect(() => {
        getData();
    }, [dispatch]);

    useEffect(() => {
        const selectedGuitar = guitars.find((guitar) => {
            return guitar.value == selectedGuitarID;
        });

        const _basePrice = selectedGuitar && selectedGuitar.basePrice ? selectedGuitar.basePrice : 0;

        setBasePrice(_basePrice);

        dispatch(setTotalPrice({totalPrice: _basePrice}));

    }, [selectedGuitarID]);

    useEffect(() => {
        const allIDs = selectedOptions.ids;
        const allSelectedOptions = selectedOptions.entities;

        let addedPrice = 0;

        allIDs.forEach((id) => {
            if (allSelectedOptions[id].option) {
                addedPrice += Number(allSelectedOptions[id].option.price);
            }
        })

        const _totalPrice = Number(basePrice) + Number(addedPrice);

        dispatch(setTotalPrice({totalPrice: _totalPrice}));

    }, [selectedOptions]);

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
                fieldComponent = <TextareaField key={index} {...field}/>
                break;
            case 'email':
                fieldComponent = <EmailField key={index} {...field}/>
                break;
            case 'text':
                fieldComponent = <TextField key={index} {...field}/>
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
                                <Group key={group.id} {...group}>
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
            setSelectedGuitarID(value);
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
                                    <Group key={group.id} {...group}>
                                        {group.fields.map((field: FieldData) => {
                                            return (getField(field, field.id));
                                        })}
                                    </Group>
                                )
                            })}
                        </Section>

                    );
                })}

                {!!totalPrice && <PriceEstimate totalPrice={totalPrice}/>}

                {!loading && <button type={"submit"} className={"uk-button uk-button-primary uk-margin-top"}>{"Submit"}</button>}
            </form>
        </div>
    );
}

export default Form;