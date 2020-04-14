import React from 'react';

class EditFishForm extends React.Component {

    handleChange = event => {
        console.log(event.currentTarget.value);
        //1. Take a copy of the updated fish

        //[event.currentTarget.name] : new in ES6 - dynamically retrieve the name of the updates value
        // with the tag name="xxx" and update the object with it
        const updatedFish = {
            ...this.props.fish,
            [event.currentTarget.name]: event.currentTarget.value,
        };

        console.log(updatedFish);

        
        this.props.editFish(this.props.index, updatedFish);


    };

    render() {
        const fish = this.props.fish;

        const name = fish.name;
        const price = fish.price;
        const status = fish.status;
        const desc = fish.desc;
        const image = fish.image;


        return (

            <div className="fish-edit">
                <input
                    type="text"
                    name="name"
                    placeholder="Nom"
                    onChange={this.handleChange}
                    value={name} />
                <input
                    type="text"
                    name="price"
                    placeholder="Prix"
                    onChange={this.handleChange}
                    value={price} />
                <select
                    type="text"
                    name="status"
                    placeholder="Disponibilité"
                    onChange={this.handleChange}
                    value={status}>
                    <option value="available">Disponible</option>
                    <option value="unavailable">Rupture de stock</option>
                </select>
                <textarea
                    name="desc"
                    placeholder="Description"
                    onChange={this.handleChange}
                    value={desc} />
                <input
                    type="text"
                    name="image"
                    placeholder="Image"
                    onChange={this.handleChange}
                    value={image} />


            </div>


        );
    }
}

export default EditFishForm;