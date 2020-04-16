import React from "react";
import PropTypes from 'prop-types';
import { getFunName } from "../helpers";

class StorePicker extends React.Component {
    
    static propTypes = {
        history: PropTypes.object,
    }

    myInput = React.createRef();

    //this is the only syntax that allows using "this" in a custom method
    // otherwise, binding everything in constructor
    // goToStore is a property, therefore it's binded
    goToStore = event => {
        // 1. Stop the form from submitting
        event.preventDefault();
        // 2. get the text from that input
        const storeName = this.myInput.current.value;

        // 3. Change the page to /store/whatever-they-entered 
        this.props.history.push(`/store/${storeName}`);
        
    };


    render() {
        return (
            < form className="store-selector" onSubmit={this.goToStore} >
                {/* this is a comment */}
                <h2>Please Enter Your Store</h2>
                <input
                    type="text"
                    ref={this.myInput}
                    required
                    placeholder="Store Name"
                    defaultValue={getFunName()}
                />
                <button type="submit">Visit Store →</button>
            </form >
        );
    }
}

export default StorePicker;
