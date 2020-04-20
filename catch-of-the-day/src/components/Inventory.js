import React from "react";
import PropTypes from 'prop-types';
import firebase from 'firebase';

import AddFishForm from './AddFishForm';
import EditFishForm from './EditFishForm';
import Login from './Login';
import base, { firebaseApp } from "../base";


class Inventory extends React.Component {

    static propTypes = {
        storeName: PropTypes.string.isRequired,
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

    state = {
        uid: null,
        owner: null,
    }

    componentDidMount = () => {
        firebase.auth().onAuthStateChanged(user => {
            this.authHandler({user});
        })
    }

    authHandler = async (authData) => {
        //1. Lookup for the store in the database
        const store = await base.fetch(this.props.storeName, { context: this, });
        console.log(store);

        //2. Claim the store ifno owner
        if (!store.owner) {
            // save it as our own
            await base.post(`${this.props.storeName}/owner`, {
                data: authData.user.uid,
            })
        }

        //3. Set the state of inventory component
        this.setState({
            uid: authData.user.uid,
            owner: (store.owner || authData.user.uid)
        });

        console.log(authData)
    }

    authenticate = (provider) => {
        const authProvider = new firebase.auth[`${provider}AuthProvider`]();
        firebaseApp
            .auth()
            .signInWithPopup(authProvider)
            .then(this.authHandler);
    };

    logout = async () => {
        console.log("Logging out!");
        await firebase.auth().signOut();
        this.setState({
            uid: null,
        })
    };


    render() {

        //0. Prepare the logout button

        const logout = <button onClick={this.logout}>Déconnexion</button>

        //1. Check if user logged in

        if (!this.state.uid) {
            return (
                <Login authenticate={this.authenticate}></Login>
            )

        }

        //2. Check if the user is the owner
        if (this.state.uid !== this.state.owner) {
            return (
            <div>
                <p>Désolé, vous n'êtes pas le propriétaire de ce magasin.</p>
                {logout}
            </div>
            )
        }
        return (
            <div className="inventory">
                <h2>Inventaire</h2>
                    {logout}
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
                <button type="submit" onClick={this.props.loadSampleFishes}>Charger les poissons par défaut</button>
            </div>
        )

    }
}

export default Inventory;