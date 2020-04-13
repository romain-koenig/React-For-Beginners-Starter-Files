import React from "react";
import { formatPrice } from '../helpers';

class Order extends React.Component {

    renderOrder = key => {

        const fish = this.props.fishes[key];
        const count = this.props.order[key];
        const isAvailable = fish.status === "available";
        if (!isAvailable) {
            return (
            <li key ={key}>Désolé, {fish ? fish.name : "Ce poisson"} n'est plus disponible</li>
            );
        }

        return (
        <li key ={key}>{count} x {fish.name} {formatPrice(count * fish.price)} </ li>
        );
    }

    render() {

        const orderIds = Object.keys(this.props.order);
        const total = orderIds.reduce((prevTotal, key) => {
            const fish = this.props.fishes[key];
            const isAvailable = fish && fish.status === "available";
            const quantity = isAvailable ? this.props.order[key] : 0;
            return prevTotal + quantity * fish.price;
        }, 0)

        return (
            <div className="order-wrap">
                <h2>Commande</h2>

                <ul>
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