import React from "react";
import { formatPrice } from '../helpers';

class Order extends React.Component {

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
                <li key={key}>Désolé, {fish ? fish.name : "Ce poisson"} n'est plus disponible

                    <button onClick={() => { this.props.removeFromOrder(key) }}>&times;
            </button>
                </li>
            );
        }

        return (
            <li key={key}>{count} x {fish.name} {formatPrice(count * fish.price)}
                    <button onClick={() => { this.props.removeFromOrder(key) }}>&times;
            </button>
            </ li>
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

                <ul className="order">
                    {orderIds.map(this.renderOrder)}

                </ul>

                <div className="total">
                    Total :
                    <strong>{formatPrice(total)}</strong>
                </div>

            </div>
        )
    }
}

export default Order;