import React from 'react';

class AddFishForm extends React.Component {

    nameRef = React.createRef();
    priceRef = React.createRef();
    statusRef = React.createRef();
    descRef = React.createRef();
    imageRef = React.createRef();

    createFish = event => {
        // 1. Stop the form from submitting
        event.preventDefault();
        // 2. Create a Fish in the state
        console.log("Making a fish 🐟 in addFishForm");


        const price = isNaN(parseFloat(this.priceRef.current.value)) ? 0 : Math.abs(parseFloat(this.priceRef.current.value))

        const fish = {
            name: this.nameRef.current.value,
            price: price,
            status: this.statusRef.current.value,
            desc: this.descRef.current.value,
            image: this.imageRef.current.value,
        }

        this.props.addFish(fish);

        //Refresh the form

        event.currentTarget.reset();

    }

    render() {
        return (
            <form className="fish-edit" onSubmit={this.createFish}>
                <input name="name" ref={this.nameRef} type="text" placeholder="Name" />
                <input name="price" ref={this.priceRef} type="text" placeholder="Price" />
                <select name="status" ref={this.statusRef}>
                    <option value="available">Frais</option>
                    <option value="unavailable">Rupture de stock</option>
                </select>
                <textarea name="desc" ref={this.descRef} placeholder="Desc" />
                <input name="image" ref={this.imageRef} type="text" placeholder="Image" />
                <button type="submit">+ Ajouter un poisson</button>
            </form>
        );
    }
}

export default AddFishForm;