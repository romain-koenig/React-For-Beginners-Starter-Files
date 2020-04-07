import React from "react"

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


export default Header;