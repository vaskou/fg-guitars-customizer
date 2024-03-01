import React, { ChangeEvent, useEffect, useState } from 'react';
import Section, { SectionTypes } from "../Section/Section";
import Group from "../Group/Group";
import { useSelector } from "react-redux";
import {
    deleteSelectedOptions,
    FieldData,
    GroupData,
    loadData,
    SectionData,
    selectError,
    selectGuitarsArray,
    selectSectionsArray,
    selectSelectedGuitarID,
    selectSelectedOptions,
    selectTotalPrice,
    setSelectedGuitarID,
    setTotalPrice
} from "./formSlice";
import { useAppDispatch } from "../../redux/store";
import Loader from "../Loader/Loader";
import PriceEstimate from "../PriceEstimate/PriceEstimate";
import './styles.scss';
import Field from "../Field/Field";
import GuitarsSection from "../Section/GuitarsSection";

interface Props {
}

const Form: React.FC<Props> = ({}) => {

    const dispatch = useAppDispatch();

    const [loading, setLoading] = useState(true);
    // const [selectedGuitarID, setSelectedGuitarID] = useState('');
    const [basePrice, setBasePrice] = useState(0);

    const guitars = useSelector(selectGuitarsArray);
    const sections = useSelector(selectSectionsArray);
    const totalPrice = useSelector(selectTotalPrice);
    const selectedGuitarID = useSelector(selectSelectedGuitarID);
    const selectedOptions = useSelector(selectSelectedOptions);
    const error = useSelector(selectError);

    const getData = (value?: string) => {
        setLoading(true);

        dispatch(deleteSelectedOptions());

        dispatch(loadData(value))
            .finally(() => {
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

    const handleOnChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const target = e.target;
        const name = target.name;
        const value = target.value;

        if ('model' === name) {
            getData(value);
            // setSelectedGuitarID(value);
            dispatch(setSelectedGuitarID({ selectedGuitarID: value }))
        }
    }

    return (
        <div className="fggc-form">
            {loading && <Loader/>}
            {error && <div className="fggc-form-error">{error}</div>}
            <form>
                <GuitarsSection guitars={guitars} sections={sections} onChange={handleOnChange}/>

                {sections && sections.map((section: SectionData) => {
                    return (
                        section.type === SectionTypes.FIELDS && section.groups.length > 0 &&
                        <Section key={section.id} title={section.title}>
                            {section.groups.map((group: GroupData) => {
                                return (
                                    <Group key={group.id} {...group}>
                                        {group.fields.map((field: FieldData) => {
                                            return <Field key={field.id} field={field} index={field.id}/>
                                        })}
                                    </Group>
                                )
                            })}
                        </Section>

                    );
                })}

                {!!totalPrice && <PriceEstimate totalPrice={totalPrice}/>}

                <button type={"submit"} className={"uk-button uk-button-primary uk-margin-top"}>{"Submit"}</button>
            </form>
        </div>
    );
}

export default Form;