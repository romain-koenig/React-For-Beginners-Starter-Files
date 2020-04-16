import React from "react";
import PropTypes from 'prop-types';

const Header = (props) => (
    <header className="top">
        <h1>La
             <span className="ofThe">
                <span className="of">du</span>
                <span className="the">jour</span>
            </span>
                 Prise</h1>
        <h3 className="tagline"><span>{props.tagline}</span></h3>
    </header>
);

Header.propTypes = {
    tagline: PropTypes.string.isRequired,
}

export default Header;