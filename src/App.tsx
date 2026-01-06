import * as React from "react";
import {
    BrowserRouter as Router, Route, Switch,
} from "react-router-dom";
import LinksCard from "./LinksCard";
import NameAndAboutCard from "./NameAndAboutCard";
import AboutCard from "./AboutCard";
import styled from "styled-components";
import { Warp } from "@paper-design/shaders-react";

// Check if WebGL is supported
function isWebGLSupported(): boolean {
    try {
        const canvas = document.createElement('canvas');
        const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
        return gl !== null;
    } catch (e) {
        return false;
    }
}

function getWindowDimensions() {
    return {
        width: window.innerWidth,
        height: window.innerHeight
    };
}

const NameAndAboutCardWrapper = styled.div({
    width: "fit-content"
})

// Main container - flexbox, no fixed/absolute
const MainContainer = styled.div({
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
    width: "100%",
    position: "relative",
    backgroundColor: "#263ffd",
})

// Background layer - no fixed positioning
const BackgroundWrapper = styled.div({
    position: "absolute",
    inset: 0,
    zIndex: 0,
})

const ContentWrapper = styled.div({
    position: "relative",
    zIndex: 1,
    flex: 1,
    display: "flex",
    flexDirection: "column",
})

const App = () => {

    const [windowDimensions, setWindowDimensions] = React.useState(getWindowDimensions());
    const [shaderReady, setShaderReady] = React.useState(false);
    const [webGLSupported] = React.useState(() => isWebGLSupported());
    const [shaderKey, setShaderKey] = React.useState(0);

    React.useEffect(() => {
        function handleResize() {
            setWindowDimensions(getWindowDimensions());
        }
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    React.useEffect(() => {
        if (!webGLSupported) {
            setShaderReady(true); // Show fallback immediately
            return;
        }

        // More robust Safari WebGL initialization
        let frameCount = 0;
        let frameId: number;

        const initShader = () => {
            frameId = requestAnimationFrame(() => {
                frameCount++;
                // Wait for multiple frames to ensure Safari WebGL is ready
                // Also check that the page is visible
                if (frameCount < 5 || document.visibilityState !== 'visible') {
                    initShader();
                } else {
                    setShaderReady(true);
                    // Force a re-render of the shader after a brief delay
                    setTimeout(() => {
                        setShaderKey(k => k + 1);
                    }, 100);
                }
            });
        };

        // Start initialization when page becomes visible
        if (document.visibilityState === 'visible') {
            initShader();
        } else {
            const handleVisibility = () => {
                if (document.visibilityState === 'visible') {
                    document.removeEventListener('visibilitychange', handleVisibility);
                    initShader();
                }
            };
            document.addEventListener('visibilitychange', handleVisibility);
            return () => document.removeEventListener('visibilitychange', handleVisibility);
        }

        return () => cancelAnimationFrame(frameId);
    }, [webGLSupported]);

    const [nameAndAboutCardRef, setNameAndAboutCardRef] = React.useState(null);

    const onRefChange = React.useCallback(node => {
        setNameAndAboutCardRef(node);
    }, []);


    return (
        <MainContainer>
            <BackgroundWrapper>
                {shaderReady && webGLSupported && (
                    <Warp
                        key={`warp-${shaderKey}`}
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
                )}
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
        </MainContainer>
    );
}

export default App;
