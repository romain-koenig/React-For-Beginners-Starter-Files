import React from 'react';
import PropTypes from 'prop-types';

class Login extends React.Component {
    
    static propTypes = {
        authenticate: PropTypes.func.isRequired,
    }

    render() {
        return (
            <>
                <nav className="login">
                    <h2>Authentification</h2>
                    <p>Autentification nécessaire pour gérer l'inventaire</p>
                    <button className="twitter" onClick={() => this.props.authenticate('Twitter')}>Login avec Twitter</button>
                </nav>
            </>
        );
    }
}

export default Login;