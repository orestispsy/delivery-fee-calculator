import React from 'react'
import Main from './Main'
import { fireEvent, render } from '@testing-library/react'
import '@testing-library/jest-dom/'

test('Rules Box Link Renders After Click', () => {
    const component = render(<Main />)
    const rulesH1 = component.getByTestId('rulesH1')
    fireEvent.click(rulesH1)
    const assessment = component.getByTestId('assessment')
    expect(assessment.textContent).toBe('Assessment')
})
