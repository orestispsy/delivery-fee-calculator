import { useEffect, useState, useRef } from 'react'
import React from 'react'

import './Calculator.css'

import { InputField } from '../../common/InputField'

const {
    valueCostsCalc,
    distanceCostsCalc,
    itemCostsCalc,
    fridayRushChecker,
    checkEndPrices,
    errorCheck,
} = require('./CalculatorUtils')

export const Calculator: React.FC<{}> = () => {
    const [value, setValue] = useState<number | null>(null)
    const [valueCosts, setValueCosts] = useState<number>(0)
    const [distance, setDistance] = useState<number | null>(null)
    const [distanceCosts, setDistanceCosts] = useState<number>(0)
    const [itemsAmount, setItemsAmount] = useState<number | null>(null)
    const [itemsAmountCosts, setItemsAmountCosts] = useState<number>(0)
    const [date, setDate] = useState<string | null>(null)
    const [fridayRushMode, setFridayRushMode] = useState<boolean>(false)
    const [finalPrice, setFinalPrice] = useState<number | null>(0)
    const [error, setError] = useState<boolean>(false)
    const [limitError, setLimitError] = useState<boolean>(false)
    const [costsSymbol, setCostsSymbol] = useState<string | null>('€')
    const [animateUnit, setAnimateUnit] = useState<boolean>(false)

    useEffect(
        function () {
            valueCostsCalc(value, setValueCosts)
        },
        [value]
    )

    useEffect(
        function () {
            distanceCostsCalc(distance, setDistanceCosts)
        },
        [distance]
    )

    useEffect(
        function () {
            itemCostsCalc(itemsAmount, setItemsAmountCosts)
        },
        [itemsAmount]
    )

    useEffect(
        function () {
            fridayRushChecker(date, setFridayRushMode)
        },
        [date]
    )

    return (
        <div className="calculator">
            <h1>Delivery Fee Calculator</h1>
            <div className="calculator__midsection">
                <InputField
                    type="number"
                    step="0.1"
                    min="1"
                    id="value"
                    labelText="Cart Value"
                    placeholder="Value"
                    measureUnitBoolean={true}
                    animate={animateUnit}
                    measureUnit="€"
                    changeEvent={(e) => {
                        errorCheck(
                            e.target.value,
                            setLimitError,
                            setFinalPrice,
                            setCostsSymbol
                        )
                        setError(false)
                        setValue(Number(e.target.value))
                    }}
                    clickEvent={(e) => {
                        setError(false)
                    }}
                    setAnimateUnit={setAnimateUnit}
                />
                <InputField
                    type="number"
                    min="1"
                    id="distance"
                    labelText="Delivery Distance"
                    placeholder="Distance"
                    measureUnitBoolean={true}
                    animate={animateUnit}
                    measureUnit="m"
                    changeEvent={(e) => {
                        errorCheck(
                            e.target.value,
                            setLimitError,
                            setFinalPrice,
                            setCostsSymbol
                        )
                        setError(false)
                        setDistance(Number(e.target.value))
                    }}
                    clickEvent={(e) => {
                        setError(false)
                    }}
                    setAnimateUnit={setAnimateUnit}
                />
                <InputField
                    type="number"
                    min="1"
                    id="items"
                    labelText="Amount of Items"
                    placeholder="Items"
                    measureUnitBoolean={false}
                    changeEvent={(e) => {
                        errorCheck(
                            e.target.value,
                            setLimitError,
                            setFinalPrice,
                            setCostsSymbol
                        )
                        setError(false)
                        setItemsAmount(Number(e.target.value))
                    }}
                    clickEvent={(e) => {
                        setError(false)
                    }}
                />
                <InputField
                    refBoolean={true}
                    type="datetime-local"
                    id="time"
                    labelText="Date / Time"
                    measureUnitBoolean={false}
                    changeEvent={(e) => {
                        setDate(e.target.value)
                    }}
                    clickEvent={(e) => {
                        setError(false)
                    }}
                    setDate={(e) => {
                        setDate(e)
                    }}
                />
            </div>
            {!limitError && !error && (
                <div
                    data-testid="button"
                    className="calculator__button"
                    onClick={(e) => {
                        if (!value || !distance || !itemsAmount || !date) {
                            setError(true)
                            setFinalPrice(0)
                        } else {
                            setAnimateUnit(!animateUnit)
                            setError(false)
                            checkEndPrices(
                                value,
                                valueCosts,
                                distanceCosts,
                                itemsAmountCosts,
                                setFinalPrice,
                                setCostsSymbol,
                                fridayRushMode
                            )
                        }
                    }}
                >
                    Calculate Delivery Price
                </div>
            )}
            {limitError && (
                <div data-testid="error" className="calculator__error">
                    Values Less Than 1 Are NOT Accepted
                </div>
            )}
            {error && (
                <div data-testid="error" className="calculator__error">
                    Please Fill In All Fields
                </div>
            )}

            <div className="calculator__total">
                <div className="calculator__total__head">
                    {' '}
                    {(!error && !limitError && 'Total: ') || ''}
                </div>

                {!error && !limitError && (
                    <span
                        id={
                            (finalPrice === 0 &&
                                `calculator__total--zero-price`) ||
                            `calculator__total--full-price`
                        }
                        data-testid="price"
                    >
                        {finalPrice && finalPrice}
                        {costsSymbol && costsSymbol}
                    </span>
                )}
            </div>
        </div>
    )
}
