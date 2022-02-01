import { useEffect, useRef } from 'react'
import React, { AnimationEvent } from 'react'

import './InputField.css'

const { limitDate } = require('./InputFieldsUtils')

interface Props {
    type: string
    step?: string
    min?: string
    id?: string
    labelText: string
    placeholder?: string
    measureUnitBoolean: boolean
    measureUnit?: string
    refBoolean?: boolean
    animate?: boolean
    clickEvent?: (e: any) => void
    changeEvent?: (e: any) => void
    setDate?: (date: string | null) => void
    setAnimateUnit?: (e: boolean) => void
}

export const InputField: React.FC<Props> = ({
    type,
    step,
    min,
    id,
    labelText,
    placeholder,
    measureUnitBoolean,
    measureUnit,
    refBoolean,
    animate,
    clickEvent,
    changeEvent,
    setDate,
    setAnimateUnit,
}) => {
    const inputDateRef = useRef<HTMLInputElement | null>(null)

    const handleAnimation = (e: AnimationEvent<HTMLDivElement>): void => {
        if (setAnimateUnit) {
            setAnimateUnit(false)
        }
    }

    useEffect(() => {
        if (inputDateRef.current) {
            limitDate(inputDateRef, setDate)
        }
    }, [])

    return (
        <div className="input__container">
            <label htmlFor={id} className="input__container__label">
                {labelText}
            </label>
            <div className="input__container__inputSection">
                <input
                    data-testid={id}
                    ref={(refBoolean && inputDateRef) || null}
                    type={type}
                    step={step}
                    min={min}
                    id={id}
                    placeholder={placeholder}
                    onChange={changeEvent}
                    onClick={clickEvent}
                />
                {measureUnitBoolean && (
                    <div
                        onAnimationEndCapture={handleAnimation}
                        id={(animate && 'animate') || ''}
                    >
                        {measureUnit}
                    </div>
                )}
            </div>
        </div>
    )
}
