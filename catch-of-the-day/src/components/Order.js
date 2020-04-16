import React from "react";
import PropTypes from 'prop-types';

import { formatPrice } from '../helpers';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

class Order extends React.Component {

    static propTypes = {
        fishes: PropTypes.object.isRequired,
        order: PropTypes.object.isRequired,
        removeFromOrder: PropTypes.func.isRequired,
    }

    renderOrder = key => {

        const fish = this.props.fishes[key];
        const count = this.props.order[key];
        // We have to test if fish exists : order is stored in local storage ; fishes in firebase
        // therefore, order is retrieved faster ; we loop on order and try to get fish data before fishes exists
        // to prevent a bug > we test if it exists first.
        if (!fish) {
            return null;
        }

        const isAvailable = fish.status === "available";
        if (!isAvailable) {
            return (
                <CSSTransition classNames="order" key={key} timeout={{ enter: 500, exit: 500 }}>

                    <li key={key}>Désolé, {fish ? fish.name : "Ce poisson"} n'est plus disponible

                    <button onClick={() => { this.props.removeFromOrder(key) }}>&times;</button>
                    </li>
                </CSSTransition>
            );
        }

        return (
            <CSSTransition classNames="order" key={key} timeout={{ enter: 500, exit: 500 }}>

                <li key={key}>

                    <span>
                        <TransitionGroup component="span" className="count">
                            <CSSTransition classNames="count" key={count} timeout={{ enter: 500, exit: 500 }}>
                                <span>{count}</span>
                            </CSSTransition>
                        </TransitionGroup>

                         &times; {fish.name} {formatPrice(count * fish.price)}
                        <button onClick={() => { this.props.removeFromOrder(key) }}>&times;</button>
                    </span>
                </ li>
            </CSSTransition>
        );
    }

    render() {

        const orderIds = Object.keys(this.props.order);
        const total = orderIds.reduce((prevTotal, key) => {
            const fish = this.props.fishes[key];
            const isAvailable = fish && fish.status === "available";
            const quantity = isAvailable ? this.props.order[key] : 0;

            // We have to test if fish exists : order is stored in local storage ; fishes in firebase
            // therefore, order is retrieved faster ; we loop on order and try to get fish data before fishes exists
            // to prevent a bug > we test if it exists first.
            return fish ? prevTotal + quantity * fish.price : 0;

        }, 0)

        return (
            <div className="order-wrap">
                <h2>Commande</h2>

                <TransitionGroup component="ul" className="order">
                    {orderIds.map(this.renderOrder)}

                </TransitionGroup>

                <div className="total">
                    Total :
                    <strong>{formatPrice(total)}</strong>
                </div>

            </div>
        )
    }
}

export default Order;