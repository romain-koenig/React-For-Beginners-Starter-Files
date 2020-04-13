import React from 'react';
import { formatPrice } from '../helpers';

class Fish extends React.Component {


    render() {

        const { name, price, status, desc, image } = this.props.fish;

        const isAvailable = status === "available" ? true : false;
        const btnText = isAvailable ? 'Ajouter au panier' : 'Rupture de Stock';
        return (
            <li className="menu-fish">
                <img src={image} alt={name}></img>
                <h3 className="fish-name">{name}
                    <span className="price">{formatPrice(price)}</span>
                </h3>
                <p>{desc}</p>

                <button
                    type="submit"
                    disabled={!isAvailable}
                    onClick={() => this.props.addToOrder(this.props.myKey)}>
                {btnText}
                        </button>

            </li >
        );
    }
}

export default Fish;