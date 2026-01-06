import * as React from "react";
import {
    BrowserRouter as Router, Route, Switch,
} from "react-router-dom";
import LinksCard from "./LinksCard";
import NameAndAboutCard from "./NameAndAboutCard";
import AboutCard from "./AboutCard";
import styled from "styled-components";
import { Warp } from "@paper-design/shaders-react";

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

const BackgroundWrapper = styled.div({
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    zIndex: -1,
})

const ContentWrapper = styled.div({
    position: "relative",
    zIndex: 1,
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
        <>
            <BackgroundWrapper>
                <Warp
                    style={{ width: "100%", height: "100%" }}
                    colors={["#14120f", "#263ffd", "#efd752", "#fafafa"]}
                    proportion={0.24}
                    softness={1}
                    distortion={0.21}
                    swirl={0.57}
                    swirlIterations={10}
                    shape="edge"
                    shapeScale={0.75}
                    speed={1.8}
                    scale={2}
                />
            </BackgroundWrapper>
            <ContentWrapper>
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
            </ContentWrapper>
        </>
    );
}

export default App;
