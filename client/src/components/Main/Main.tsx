import React from 'react'

import { Calculator } from '../Calculator/Calculator'

import './Main.css'

type Props = {}

type State = {
    showRules: boolean
}

export default class Main extends React.Component<Props, State> {
    state: State = {
        showRules: false,
    }
    render() {
        return (
            <>
                <Calculator />
                <div className="rules__container">
                    <div className="rules">
                        <h1
                            data-testid="rulesH1"
                            onClick={(e) => {
                                this.setState({
                                    showRules: !this.state.showRules,
                                })
                            }}
                        >
                            RULES
                        </h1>
                        {this.state.showRules && (
                            <div className="rules__text">
                                <div>
                                    If the cart value is less than 10€, a small
                                    order surcharge is added to the delivery
                                    price. The surcharge is the difference
                                    between the cart value and 10€. For example
                                    if the cart value is 8.90€, the surcharge
                                    will be 1.10€.
                                </div>
                                <div>
                                    A delivery fee for the first 1000 meters
                                    (=1km) is 2€. If the delivery distance is
                                    longer than that, 1€ is added for every
                                    additional 500 meters that the courier needs
                                    to travel before reaching the destination.
                                    Even if the distance would be shorter than
                                    500 meters, the minimum fee is always 1€.
                                </div>
                                <div>
                                    If the number of items is five or more, an
                                    additional 50 cent surcharge is added for
                                    each item above four
                                </div>
                                <div>
                                    The delivery fee can never be more than 15€,
                                    including possible surcharges.
                                </div>
                                <div>
                                    The delivery is free (0€) when the cart
                                    value is equal or more than 100€.
                                </div>
                                <div>
                                    During the Friday rush (3 - 7 PM UTC), the
                                    delivery fee (the total fee including
                                    possible surcharges) will be multiplied by
                                    1.1x. However, the fee still cannot be more
                                    than the max (15€).
                                </div>
                                <div>
                                    <a
                                        data-testid="assessment"
                                        href="https://github.com/woltapp/engineering-summer-intern-2022"
                                        target="_blank"
                                    >
                                        Assessment
                                    </a>
                                </div>
                            </div>
                        )}
                    </div>
                    {this.state.showRules && (
                        <div
                            className="rules__container__close"
                            onClick={(e) => {
                                this.setState({
                                    showRules: !this.state.showRules,
                                })
                            }}
                        >
                            close [x]
                        </div>
                    )}
                </div>
                <div className="footer">
                    © 2022
                    <a href="https://zero-psy.com" target="_blank">
                        {' '}
                        zero-psy.com{' '}
                    </a>
                </div>
            </>
        )
    }
}
