import * as React from "react";
import {
    Link
} from "react-router-dom";

const headerStyle: React.CSSProperties = {
    display: "flex",
    justifyContent: "center",
    alignItems: "baseline",
    height: 115,
    backgroundImage: "linear-gradient(to bottom, #1b6fe7ff, #4fbda980)"
}

const mainContent: React.CSSProperties = {
    width: 1195,
    color: "rgba(236, 250, 255, 1)",
    lineHeight: "34px",
    marginTop: 40
}

const logoStyle: React.CSSProperties = {
    fontSize: 30,
    cursor: "pointer",
    color: "rgba(236, 250, 255, 1)",
    textDecoration: "none"
}

const aboutStyle: React.CSSProperties = {
    fontSize: 20,
    marginLeft: 20,
    cursor: "pointer",
    color: "rgba(236, 250, 255, 1)",
    textDecoration: "none"
}

const Header = (props: {}) => {
    return (
        <div style={headerStyle}>
            <div style={mainContent}>
                <Link to="/" style={logoStyle}>Mehanig</Link>
                <Link to="/about" style={aboutStyle}>About</Link>
            </div>
        </div>
    )
}

export default Header;