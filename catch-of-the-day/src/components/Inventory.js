import React from "react";
import AddFishForm from './AddFishForm';
import EditFishForm from './EditFishForm';
import PropTypes from 'prop-types';


class Inventory extends React.Component {

    static propTypes = {
        addFish: PropTypes.func.isRequired,
        loadSampleFishes: PropTypes.func.isRequired,
        fishes: PropTypes.shape({
            name: PropTypes.string,
            price: PropTypes.number,
            status: PropTypes.string,
            desc: PropTypes.string,
            image: PropTypes.string,
        }).isRequired,
        editFish: PropTypes.func.isRequired,
        deleteFish: PropTypes.func.isRequired,
    }

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
                    editFish={this.props.editFish}
                    deleteFish={this.props.deleteFish} />)
                }
                </ul>

                <AddFishForm addFish={this.props.addFish} />
                <button type="submit" onClick={this.props.loadSampleFishes}>Load Sample Fish</button>
            </div>
        )
    }
}

export default Inventory;