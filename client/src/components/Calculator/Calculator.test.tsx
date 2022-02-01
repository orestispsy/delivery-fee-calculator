import React from 'react'
import { Calculator } from './Calculator'
import { fireEvent, render } from '@testing-library/react'
import '@testing-library/jest-dom/'

let value: HTMLElement
let distance: HTMLElement
let items: HTMLElement
let button: HTMLElement
let finalPrice: HTMLElement

const getCalculatorElements = (component: any): any => {
    value = component.getByTestId('value')
    distance = component.getByTestId('distance')
    items = component.getByTestId('items')
    button = component.getByTestId('button')
    finalPrice = component.getByTestId('price')
    return { value, distance, items, button, finalPrice }
}

test('final price when -> value <10, distance <=1000, items<=4', () => {
    const component = render(<Calculator />)
    getCalculatorElements(component)
    fireEvent.change(value, {
        target: {
            value: '7',
        },
    })
    fireEvent.change(distance, {
        target: {
            value: '1000',
        },
    })
    fireEvent.change(items, {
        target: {
            value: '4',
        },
    })
    fireEvent.click(button)
    expect(finalPrice.textContent).toBe('5€')
})

test('final price when -> value <10, distance >1000, items<=4', () => {
    const component = render(<Calculator />)
    getCalculatorElements(component)
    fireEvent.change(value, {
        target: {
            value: '7',
        },
    })
    fireEvent.change(distance, {
        target: {
            value: '1001',
        },
    })
    fireEvent.change(items, {
        target: {
            value: '3',
        },
    })

    fireEvent.click(button)
    expect(finalPrice.textContent).toBe('6€')
})

test('final price when -> value <10, distance >1000, items>4', () => {
    const component = render(<Calculator />)
    getCalculatorElements(component)
    fireEvent.change(value, {
        target: {
            value: '7',
        },
    })
    fireEvent.change(distance, {
        target: {
            value: '1001',
        },
    })
    fireEvent.change(items, {
        target: {
            value: '5',
        },
    })

    fireEvent.click(button)

    expect(finalPrice.textContent).toBe('6.5€')
})

test('final price when -> value >=10, distance >1000, items>4', () => {
    const component = render(<Calculator />)
    getCalculatorElements(component)
    fireEvent.change(value, {
        target: {
            value: '15',
        },
    })
    fireEvent.change(distance, {
        target: {
            value: '3001',
        },
    })
    fireEvent.change(items, {
        target: {
            value: '5',
        },
    })

    fireEvent.click(button)

    expect(finalPrice.textContent).toBe('7.5€')
})

test('final price when -> value >=100, no matter the rest', () => {
    const component = render(<Calculator />)
    getCalculatorElements(component)
    fireEvent.change(value, {
        target: {
            value: '100',
        },
    })
    fireEvent.change(distance, {
        target: {
            value: '5555',
        },
    })
    fireEvent.change(items, {
        target: {
            value: '17',
        },
    })

    fireEvent.click(button)

    expect(finalPrice.textContent).toBe('FREE')
})

test('maximum final price is 15€', () => {
    const component = render(<Calculator />)
    getCalculatorElements(component)
    fireEvent.change(value, {
        target: {
            value: '99',
        },
    })
    fireEvent.change(distance, {
        target: {
            value: '5555',
        },
    })
    fireEvent.change(items, {
        target: {
            value: '35',
        },
    })

    fireEvent.click(button)

    expect(finalPrice.textContent).toBe('15€')
})

test('final price multiplied * 1.1 on friday rush 3 - 7 pm', () => {
    const component = render(<Calculator />)
    getCalculatorElements(component)
    const time: HTMLElement = component.getByTestId('time')
    fireEvent.change(value, {
        target: {
            value: '4.3',
        },
    })
    fireEvent.change(distance, {
        target: {
            value: '1000',
        },
    })
    fireEvent.change(items, {
        target: {
            value: '4',
        },
    })
    fireEvent.change(time, {
        target: {
            value: '2022-02-18T16:20',
        },
    })
    fireEvent.click(button)
    expect(finalPrice.textContent).toBe('8.47€')
})

test('error message when input value is less than 1', () => {
    const component = render(<Calculator />)
    getCalculatorElements(component)
    fireEvent.change(value, {
        target: {
            value: '0',
        },
    })
    const error: HTMLElement = component.getByTestId('error')
    expect(error.textContent).toBe('Values Less Than 1 Are NOT Accepted')
})

test('error message when input is not filled', () => {
    const component = render(<Calculator />)
    getCalculatorElements(component)
    fireEvent.click(button)
    const error: HTMLElement = component.getByTestId('error')
    expect(error.textContent).toBe('Please Fill In All Fields')
})
