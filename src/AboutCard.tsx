import * as React from "react";
import styled from "styled-components";

const MainText = styled.div({
    color: "#f3cdc7"
})

const AboutCard = (props: {viewWidth: number, viewHeight: number}) => {
    const [fontSize, setFontSize] = React.useState(45);
    const [opacity, setOpacity] = React.useState(0);
    const [readyToRender, setReadyToRender] = React.useState(false);

    // This triggers re-calc of optimal font size
    React.useEffect(() => {
        setReadyToRender(false);
    }, [props.viewHeight, props.viewWidth])


    const onRefChange = React.useCallback(node => {
        if (node) {
            if (!readyToRender && props.viewHeight > Math.round((node).getBoundingClientRect().bottom)) {
                setFontSize(fontSize + 5);
            } else {
                if (!readyToRender) {
                    setFontSize(fontSize - 5);
                    setReadyToRender(true);
                    setOpacity(1);
                }
            }
        }
    }, [fontSize, opacity, readyToRender, props.viewHeight]);

    return (
        <MainText ref={onRefChange}>
            <div style={{fontSize, opacity}}>// About:</div>
            <div style={{fontSize, opacity}}>// I am a Software Developer at Microsoft;</div>
            <div style={{fontSize, opacity}}>// I also write plugins for AfterEffects
                and other fun stuff at free time — <a style={{fontSize, opacity}} href={"https://extrabite.io"}>ExtraBite.io;</a></div>
            <div style={{fontSize, opacity}}>// Based in Oslo 🇳🇴</div>
            <div><a style={{fontSize, opacity}} href={"/"}>{"<< Back "}</a></div>
        </MainText>
    );
}

export default AboutCard;