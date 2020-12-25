import * as React from "react";
import {
    BrowserRouter as Router, Route, Switch,
} from "react-router-dom";
import LinksCard from "./LinksCard";
import NameAndAboutCard from "./NameAndAboutCard";
import AboutCard from "./AboutCard";
import styled from "styled-components";

function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window;
    return {
        width,
        height
    };
}

const NameAndAboutCardWrapper = styled.div({
    width: "fit-content"
})

const App = () => {

    const [windowDimensions, setWindowDimensions] = React.useState(getWindowDimensions());

    React.useEffect(() => {
        function handleResize() {
            setWindowDimensions(getWindowDimensions());
        }

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const [nameAndAboutCardRef, setNameAndAboutCardRef] = React.useState(null);

    const onRefChange = React.useCallback(node => {
        setNameAndAboutCardRef(node);
    }, []);


    return (
        <Router>
            <Switch>
                <Route path="/about">
                    <AboutCard viewWidth={windowDimensions.width}
                               viewHeight={windowDimensions.height} />
                </Route>
                <Route path="/">
                    <NameAndAboutCardWrapper ref={onRefChange}>
                        <NameAndAboutCard
                            viewWidth={windowDimensions.width}
                            viewHeight={windowDimensions.height}
                        />
                        <div id={"blotterElement"}/>
                    </NameAndAboutCardWrapper>
                    <LinksCard
                        nameAndAboutRef={nameAndAboutCardRef}
                        viewWidth={windowDimensions.width}
                        viewHeight={windowDimensions.height}
                    />
                </Route>
            </Switch>
        </Router>
    );
}

export default App;
