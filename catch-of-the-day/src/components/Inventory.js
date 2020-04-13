import React from "react"
import AddFishForm from './AddFishForm'

class Inventory extends React.Component {

    render() {
        return (
            <div className="inventory">
                <h2>Inventaire</h2>
                <AddFishForm addFish={this.props.addFish} />
                <button type="submit" onClick={this.props.loadSampleFishes}>Load Sample Fish</button>
            </div>
        )
    }
}

export default Inventory;