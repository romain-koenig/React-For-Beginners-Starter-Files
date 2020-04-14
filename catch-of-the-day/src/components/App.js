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

    //  ██████╗ ██████╗ ███╗   ███╗██████╗  ██████╗ ███╗   ██╗███████╗███╗   ██╗████████╗    ██╗     ██╗███████╗███████╗     ██████╗██╗   ██╗ ██████╗██╗     ███████╗
    // ██╔════╝██╔═══██╗████╗ ████║██╔══██╗██╔═══██╗████╗  ██║██╔════╝████╗  ██║╚══██╔══╝    ██║     ██║██╔════╝██╔════╝    ██╔════╝╚██╗ ██╔╝██╔════╝██║     ██╔════╝
    // ██║     ██║   ██║██╔████╔██║██████╔╝██║   ██║██╔██╗ ██║█████╗  ██╔██╗ ██║   ██║       ██║     ██║█████╗  █████╗      ██║      ╚████╔╝ ██║     ██║     █████╗  
    // ██║     ██║   ██║██║╚██╔╝██║██╔═══╝ ██║   ██║██║╚██╗██║██╔══╝  ██║╚██╗██║   ██║       ██║     ██║██╔══╝  ██╔══╝      ██║       ╚██╔╝  ██║     ██║     ██╔══╝  
    // ╚██████╗╚██████╔╝██║ ╚═╝ ██║██║     ╚██████╔╝██║ ╚████║███████╗██║ ╚████║   ██║       ███████╗██║██║     ███████╗    ╚██████╗   ██║   ╚██████╗███████╗███████╗
    //  ╚═════╝ ╚═════╝ ╚═╝     ╚═╝╚═╝      ╚═════╝ ╚═╝  ╚═══╝╚══════╝╚═╝  ╚═══╝   ╚═╝       ╚══════╝╚═╝╚═╝     ╚══════╝     ╚═════╝   ╚═╝    ╚═════╝╚══════╝╚══════╝


    componentDidMount() {

        const { params } = { ...this.props.match };

        const localStorageRef = localStorage.getItem(params.storeId);
        if (localStorageRef) {
            this.setState({ order: JSON.parse(localStorageRef) });
        }

        this.ref = base.syncState(`${params.storeId}/fishes`, {
            context: this,
            state: 'fishes',
        })

    };

    componentDidUpdate() {
        localStorage.setItem(this.props.match.params.storeId, JSON.stringify(this.state.order));
    };

    componentWillUnmount() {
        base.removeBinding(this.ref);
    };


    //  █████╗ ██████╗ ██████╗     ███████╗██╗███████╗██╗  ██╗
    // ██╔══██╗██╔══██╗██╔══██╗    ██╔════╝██║██╔════╝██║  ██║
    // ███████║██║  ██║██║  ██║    █████╗  ██║███████╗███████║
    // ██╔══██║██║  ██║██║  ██║    ██╔══╝  ██║╚════██║██╔══██║
    // ██║  ██║██████╔╝██████╔╝    ██║     ██║███████║██║  ██║
    // ╚═╝  ╚═╝╚═════╝ ╚═════╝     ╚═╝     ╚═╝╚══════╝╚═╝  ╚═╝


    addFish = (fish) => {
        //1. Take a copy of existing state - never modify a state directly
        const fishes = { ...this.state.fishes };
        //2. Add our new fish to fishes variable
        fishes[`fish${Date.now()}`] = fish;
        //3. Set the new fishes object to state
        this.setState({ fishes }); // in ES6 it's the same as this.setState({ fishes: fishes }); because the object and the state have the same name

    };

    // ███████╗██████╗ ██╗████████╗    ███████╗██╗███████╗██╗  ██╗
    // ██╔════╝██╔══██╗██║╚══██╔══╝    ██╔════╝██║██╔════╝██║  ██║
    // █████╗  ██║  ██║██║   ██║       █████╗  ██║███████╗███████║
    // ██╔══╝  ██║  ██║██║   ██║       ██╔══╝  ██║╚════██║██╔══██║
    // ███████╗██████╔╝██║   ██║       ██║     ██║███████║██║  ██║
    // ╚══════╝╚═════╝ ╚═╝   ╚═╝       ╚═╝     ╚═╝╚══════╝╚═╝  ╚═╝


    editFish = (key, updatedFish) => {
        console.log("App : Edit fish")
        //1. Take a copy of existing state - never modify a state directly
        const fishes = { ...this.state.fishes };
        //2. Modify ou fish to fishes variable
        fishes[key] = updatedFish;
        //3. Set the new fishes object to state
        this.setState({ fishes }); // in ES6 it's the same as this.setState({ fishes: fishes }); because the object and the state have the same name

    }

    // ██████╗ ███████╗██╗     ███████╗████████╗███████╗    ███████╗██╗███████╗██╗  ██╗
    // ██╔══██╗██╔════╝██║     ██╔════╝╚══██╔══╝██╔════╝    ██╔════╝██║██╔════╝██║  ██║
    // ██║  ██║█████╗  ██║     █████╗     ██║   █████╗      █████╗  ██║███████╗███████║
    // ██║  ██║██╔══╝  ██║     ██╔══╝     ██║   ██╔══╝      ██╔══╝  ██║╚════██║██╔══██║
    // ██████╔╝███████╗███████╗███████╗   ██║   ███████╗    ██║     ██║███████║██║  ██║
    // ╚═════╝ ╚══════╝╚══════╝╚══════╝   ╚═╝   ╚══════╝    ╚═╝     ╚═╝╚══════╝╚═╝  ╚═╝


    deleteFish = (key) => {
        //1. Take a copy of existing state - never modify a state directly
        const fishes = { ...this.state.fishes };
        //2. Firebase = needs to set the value to delete to null
        fishes[key] = null;
        //delete fishes[key];
        //3. Set the modified fishes object to state
        this.setState({ fishes });
    }


    // ██╗      ██████╗  █████╗ ██████╗     ███████╗ █████╗ ███╗   ███╗██████╗ ██╗     ███████╗    ███████╗██╗███████╗██╗  ██╗
    // ██║     ██╔═══██╗██╔══██╗██╔══██╗    ██╔════╝██╔══██╗████╗ ████║██╔══██╗██║     ██╔════╝    ██╔════╝██║██╔════╝██║  ██║
    // ██║     ██║   ██║███████║██║  ██║    ███████╗███████║██╔████╔██║██████╔╝██║     █████╗      █████╗  ██║███████╗███████║
    // ██║     ██║   ██║██╔══██║██║  ██║    ╚════██║██╔══██║██║╚██╔╝██║██╔═══╝ ██║     ██╔══╝      ██╔══╝  ██║╚════██║██╔══██║
    // ███████╗╚██████╔╝██║  ██║██████╔╝    ███████║██║  ██║██║ ╚═╝ ██║██║     ███████╗███████╗    ██║     ██║███████║██║  ██║
    // ╚══════╝ ╚═════╝ ╚═╝  ╚═╝╚═════╝     ╚══════╝╚═╝  ╚═╝╚═╝     ╚═╝╚═╝     ╚══════╝╚══════╝    ╚═╝     ╚═╝╚══════╝╚═╝  ╚═╝


    loadSampleFishes = () => {
        this.setState({ fishes: sampleFishes });
    };

    //  █████╗ ██████╗ ██████╗     ████████╗ ██████╗      ██████╗ ██████╗ ██████╗ ███████╗██████╗ 
    // ██╔══██╗██╔══██╗██╔══██╗    ╚══██╔══╝██╔═══██╗    ██╔═══██╗██╔══██╗██╔══██╗██╔════╝██╔══██╗
    // ███████║██║  ██║██║  ██║       ██║   ██║   ██║    ██║   ██║██████╔╝██║  ██║█████╗  ██████╔╝
    // ██╔══██║██║  ██║██║  ██║       ██║   ██║   ██║    ██║   ██║██╔══██╗██║  ██║██╔══╝  ██╔══██╗
    // ██║  ██║██████╔╝██████╔╝       ██║   ╚██████╔╝    ╚██████╔╝██║  ██║██████╔╝███████╗██║  ██║
    // ╚═╝  ╚═╝╚═════╝ ╚═════╝        ╚═╝    ╚═════╝      ╚═════╝ ╚═╝  ╚═╝╚═════╝ ╚══════╝╚═╝  ╚═╝


    addToOrder = (key) => {

        //1. take a copy of existing state
        const order = { ...this.state.order };
        //2. add to order or update order
        order[key] = order[key] + 1 || 1;
        //3. update state
        this.setState({ order });
    }

    // ██████╗ ███████╗██╗         ███████╗██████╗  ██████╗ ███╗   ███╗     ██████╗ ██████╗ ██████╗ ███████╗██████╗ 
    // ██╔══██╗██╔════╝██║         ██╔════╝██╔══██╗██╔═══██╗████╗ ████║    ██╔═══██╗██╔══██╗██╔══██╗██╔════╝██╔══██╗
    // ██║  ██║█████╗  ██║         █████╗  ██████╔╝██║   ██║██╔████╔██║    ██║   ██║██████╔╝██║  ██║█████╗  ██████╔╝
    // ██║  ██║██╔══╝  ██║         ██╔══╝  ██╔══██╗██║   ██║██║╚██╔╝██║    ██║   ██║██╔══██╗██║  ██║██╔══╝  ██╔══██╗
    // ██████╔╝███████╗███████╗    ██║     ██║  ██║╚██████╔╝██║ ╚═╝ ██║    ╚██████╔╝██║  ██║██████╔╝███████╗██║  ██║
    // ╚═════╝ ╚══════╝╚══════╝    ╚═╝     ╚═╝  ╚═╝ ╚═════╝ ╚═╝     ╚═╝     ╚═════╝ ╚═╝  ╚═╝╚═════╝ ╚══════╝╚═╝  ╚═╝


    removeFromOrder = (key) => {
        console.log(key);
        const order = { ...this.state.order };

        delete order[key];

        this.setState({ order });


    }


    // ██████╗ ███████╗███╗   ██╗██████╗ ███████╗██████╗ 
    // ██╔══██╗██╔════╝████╗  ██║██╔══██╗██╔════╝██╔══██╗
    // ██████╔╝█████╗  ██╔██╗ ██║██║  ██║█████╗  ██████╔╝
    // ██╔══██╗██╔══╝  ██║╚██╗██║██║  ██║██╔══╝  ██╔══██╗
    // ██║  ██║███████╗██║ ╚████║██████╔╝███████╗██║  ██║
    // ╚═╝  ╚═╝╚══════╝╚═╝  ╚═══╝╚═════╝ ╚══════╝╚═╝  ╚═╝


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
                    order={this.state.order}
                    removeFromOrder={this.removeFromOrder} />
                <Inventory
                    addFish={this.addFish}
                    loadSampleFishes={this.loadSampleFishes}
                    fishes={this.state.fishes}
                    editFish={this.editFish}
                    deleteFish={this.deleteFish} />
            </div>
        )

    }
}

export default App;