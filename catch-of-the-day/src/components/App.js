import React from "react";

import Header from "./Header";
import Inventory from "./Inventory";
import Order from "./Order";
import Fish from "./Fish";

import sampleFishes from "../sample-fishes";

import base from '../base';


class App extends React.Component {

    state = {
        fishes: {},
        order: {}
    };

    componentDidMount() {

        const {params} = { ...this.props.match };
        this.ref = base.syncState(`${params.storeId}/fishes`, {
            context: this,
            state: 'fishes',
        })

    };

    addFish = (fish) => {
        console.log(`Adding a fish from App component`);
        //1. Take a copy of existing state - never modify a state directly
        const fishes = { ...this.state.fishes };
        //2. Add our new fish to fishes variable
        fishes[`fish${Date.now()}`] = fish;
        //3. Set the new fishes object to state
        this.setState({ fishes }); // in ES6 it's the same as this.setState({ fishes: fishes }); because the object and the state have the same name

        console.log(this.state.fishes);


    };

    loadSampleFishes = () => {
        console.log('Loading Fishes 🐟🐠🐡🦈');
        this.setState({ fishes: sampleFishes });
    };

    addToOrder = (key) => {

        console.log(`In App.addToOrder - Key = ${key}`)

        //1. take a copy of existing state
        const order = { ...this.state.order };
        //2. add to order or update order
        order[key] = order[key] + 1 || 1;
        //3. update state
        this.setState({ order });


    }

    render() {

        return (
            <div className="catch-of-the-day">
                <div className="menu">
                    <Header tagline="Toujours bon, toujours frais" />
                    <ul className="fishes">
                        {
                            Object.keys(this.state.fishes).map(key =>
                                <Fish
                                    key={key}
                                    // Key is only for React, connot use it
                                    myKey={key}
                                    fish={this.state.fishes[key]}
                                    addToOrder={this.addToOrder} />)
                        }

                    </ul>
                </div>
                <Order
                    fishes={this.state.fishes}
                    order={this.state.order} />
                <Inventory
                    addFish={this.addFish}
                    loadSampleFishes={this.loadSampleFishes} />
            </div>
        )

    }
}

export default App;