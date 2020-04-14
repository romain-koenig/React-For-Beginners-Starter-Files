import React from "react";
import AddFishForm from './AddFishForm';
import EditFishForm from './EditFishForm';

class Inventory extends React.Component {

    render() {



        return (
            <div className="inventory">
                <h2>Inventaire</h2>
                
                <ul>
                {
                    Object.keys(this.props.fishes).map((key) => 
                    <EditFishForm 
                    key={key} 
                    index={key} 
                    fish={this.props.fishes[key]} 
                    editFish={this.props.editFish} />)
                }
                </ul>

                <AddFishForm addFish={this.props.addFish} />
                <button type="submit" onClick={this.props.loadSampleFishes}>Load Sample Fish</button>
            </div>
        )
    }
}

export default Inventory;