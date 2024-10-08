import React, { ChangeEvent, FormEvent, FormEventHandler, MouseEventHandler, useEffect, useState } from 'react';
import Section, { SectionTypes } from "../Section/Section";
import Group from "../Group/Group";
import { useSelector } from "react-redux";
import {
    deleteSelectedOptions,
    loadData,
    SectionData,
    selectError,
    selectFieldArray,
    selectFields,
    selectGroupArray,
    selectGroups,
    selectGuitarsArray,
    selectNewSectionsArray,
    selectOptionArray,
    selectOptions,
    selectSectionsArray,
    selectSelectedGuitarID,
    selectSelectedOptions,
    selectTotalPrice,
    setTotalPrice,
    upsertField
} from "./formSlice";
import { useAppDispatch } from "../../redux/store";
import Loader from "../Loader/Loader";
import PriceEstimate from "../PriceEstimate/PriceEstimate";
import './styles.scss';
import Field from "../Field/Field";
import GuitarsSection from "../Section/GuitarsSection";
import { clearFormSubmitData, removeOneFieldData, selectItemsArray } from "./formSubmitSlice";
import SubmitMessage from "../SubmitMessage/SubmitMessage";

interface Props {
}

const Form: React.FC<Props> = ({}) => {

    const dispatch = useAppDispatch();

    const [loading, setLoading] = useState(true);
    const [basePrice, setBasePrice] = useState(0);
    const [submitMessage, setSubmitMessage] = useState('');
    const [submitIsSuccess, setSubmitIsSuccess] = useState(false);
    const [isInvalid, setIsInvalid] = useState(false);

    const guitars = useSelector(selectGuitarsArray);
    const sections = useSelector(selectSectionsArray);
    const totalPrice = useSelector(selectTotalPrice);
    const selectedGuitarID = useSelector(selectSelectedGuitarID);
    const selectedOptions = useSelector(selectSelectedOptions);
    const error = useSelector(selectError);
    const newSections = useSelector(selectNewSectionsArray);
    const groupsArray = useSelector(selectGroupArray);
    const groups = useSelector(selectGroups);
    const fieldsArray = useSelector(selectFieldArray);
    const fields = useSelector(selectFields);
    const optionsArray = useSelector(selectOptionArray);
    const options = useSelector(selectOptions);

    const formData = useSelector(selectItemsArray);

    const getData = (value?: string) => {
        setLoading(true);
        setSubmitMessage('');

        // dispatch(deleteSelectedOptions());
        // dispatch(clearData());
        // dispatch(clearAllData());

        dispatch(loadData(value))
            .finally(() => {
                dispatch(deleteSelectedOptions());
                dispatch(clearFormSubmitData());
                setLoading(false);
            });
    }

    useEffect(() => {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const model = urlParams.get('model') as string | undefined;

        getData(model);
    }, []);

    useEffect(() => {
        const selectedGuitar = guitars.find((guitar) => {
            return guitar.value == selectedGuitarID;
        });

        const _basePrice = Number(selectedGuitar && selectedGuitar.basePrice ? selectedGuitar.basePrice : 0);

        setBasePrice(_basePrice);

        dispatch(setTotalPrice({ totalPrice: _basePrice }));

    }, [selectedGuitarID]);

    useEffect(() => {
        const allIDs = selectedOptions.ids;
        const allSelectedOptions = selectedOptions.entities;

        let addedPrice = 0;

        allIDs.forEach((id) => {
            if (allSelectedOptions[id].option?.price) {
                addedPrice += Number(allSelectedOptions[id].option.price);
            }
        })

        const _totalPrice = Number(basePrice) + Number(addedPrice);

        dispatch(setTotalPrice({ totalPrice: _totalPrice }));

    }, [basePrice, selectedOptions]);

    useEffect(() => {
        const allIDs = selectedOptions.ids;
        const allSelectedOptions = selectedOptions.entities;
        const selectedOptionFieldID = (optionID: string) => {
            let fieldID;
            allIDs.forEach((id) => {
                if (allSelectedOptions[id]?.option?.id == optionID) {
                    fieldID = id;
                }
            })

            return fieldID;
        }

        fieldsArray.forEach((field) => {
            if (field.connectedToOptions) {
                for (let connectedOption of field.connectedToOptions) {
                    const fieldID = selectedOptionFieldID(connectedOption);

                    if (fieldID) {
                        dispatch(upsertField({
                            ...field,
                            hidden: false
                        }));
                        break;
                    } else {
                        dispatch(upsertField({
                            ...field,
                            hidden: true
                        }));
                        dispatch(removeOneFieldData(field.id));
                    }
                }
            }
        })


    }, [selectedOptions]);

    const isOptionSelected = (optionID: string) => {
        const allIDs = selectedOptions.ids;
        const allSelectedOptions = selectedOptions.entities;

        let isSelected = false;

        allIDs.forEach((id) => {
            if (allSelectedOptions[id].option?.id === optionID) {
                isSelected = true;
            }
        })

        return isSelected;
    }

    const handleOnGuitarChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const target = e.target;
        const name = target.name;
        const value = target.value;

        if ('model' === name) {
            getData(value);
            // dispatch(setSelectedGuitarID({ selectedGuitarID: value }))
        }
    }

    const handleOnFormChange: FormEventHandler<HTMLFormElement> = (e: ChangeEvent<HTMLFormElement>) => {
        const target = e.target;
        const name = target.name;
        const value = target.value;


    }

    const handleOnInvalid: FormEventHandler<HTMLFormElement> = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const target = e.target as HTMLFormElement;

        if (target?.name && !isInvalid) {
            const elem = document.getElementsByName(target.name)
            const top = elem[0].offsetTop - 200;

            window.scroll({ behavior: "smooth", top: top });

            setIsInvalid(true);
        }
    }

    const handleOnSubmitClick: MouseEventHandler<HTMLButtonElement> = (e) => {
        setIsInvalid(false);
    }

    const handleOnSubmit: FormEventHandler<HTMLFormElement> = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        formSubmit();
    }

    const formSubmit = async () => {
        const requestAction = fggc_customizer_data.form_submit_action;
        const security = fggc_customizer_data.security;
        const adminURL = fggc_customizer_data.url;

        const url = `${adminURL}`

        setLoading(true);
        setSubmitMessage('');

        const data = new URLSearchParams();
        data.append('security', security);
        data.append('action', requestAction);
        data.append('data', JSON.stringify(formData.entities));

        const requestParams: RequestInit = {
            body: data,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            method: "POST",
        }

        try {
            const response = await fetch(url, requestParams);

            if (response.status >= 400 && response.status < 500) {
                throw new Error()
            } else {
                const data = await response.json();
                console.log(data) //TODO: remove

                setSubmitIsSuccess(!!data.success);
                setSubmitMessage(data.message);
                setLoading(false);
            }
        } catch (error) {
            const message = fggc_customizer_data.error_message

            setSubmitIsSuccess(false);
            setSubmitMessage(message);
            setLoading(false);
        }
    }

    return (
        <div className="fggc-form">
            {loading && <Loader/>}

            {error && <div className="fggc-form-error">{error}</div>}

            <form onChange={handleOnFormChange} onSubmit={handleOnSubmit} onInvalid={handleOnInvalid}>
                <GuitarsSection guitars={guitars} sections={newSections} onGuitarChange={handleOnGuitarChange}/>

                {newSections && newSections.map((section: SectionData) => {
                    return (
                        section.type === SectionTypes.FIELDS && section.groupIDs.length > 0 &&
                        <Section key={section.id} title={section.title}>
                            {section.groupIDs.map((groupID: string) => {
                                const group = groups[groupID];
                                return (
                                    <Group key={group.id} {...group}>
                                        {group.fieldIDs.map((fieldID: string) => {
                                            const field = fields[fieldID];

                                            if (field.hidden) {
                                                return;
                                            }

                                            return <Field key={field.id} field={field} index={`${selectedGuitarID}-${field.id}`}/>
                                        })}
                                    </Group>
                                )
                            })}
                        </Section>

                    );
                })}

                {!!totalPrice && <PriceEstimate totalPrice={totalPrice.toString()}/>}

                <button type={"submit"} className={"uk-button uk-button-primary uk-margin-top"} onClick={handleOnSubmitClick}>{"Submit"}</button>
            </form>

            <SubmitMessage submitMessage={submitMessage} isSuccess={submitIsSuccess}/>
        </div>
    );
}

export default Form;