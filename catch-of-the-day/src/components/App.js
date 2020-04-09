import React from "react";

import Header from "./Header"
import Inventory from "./Inventory"
import Order from "./Order"


class App extends React.Component {

    state = {
        fishes: {},
        order: {}
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

    render() {

        return (
            <div className="catch-of-the-day">
                <div className="menu">
                    <Header tagline="Toujours bon, toujours frais" />
                </div>
                <Order />
                <Inventory addFish={this.addFish} />
            </div>
        )

    }
}

export default App;