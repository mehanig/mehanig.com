import * as React from "react";

const footerStyle: React.CSSProperties = {
    display: "flex",
    marginTop: "32px",
    justifyContent: "center",
    height: 115,
    backgroundImage: "linear-gradient(to bottom, #1b6fe7ff, #4fbda980)"
}


const Footer = (props: {}) => {
    return (
        <div style={footerStyle}>
            <div>
                Footer
            </div>
        </div>
    )
}

export default Footer;