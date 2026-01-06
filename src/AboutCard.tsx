import * as React from "react";
import styled from "styled-components";

const MIN_FONT_SIZE = 14;
const MAX_FONT_SIZE = 48;

function clampFontSize(size: number): number {
    return Math.max(MIN_FONT_SIZE, Math.min(MAX_FONT_SIZE, Math.round(size)));
}

const MainText = styled.div({
    color: "#f3cdc7",
    padding: "24px",
    maxWidth: "100%",
    maxHeight: "100%",
    overflow: "hidden",
    boxSizing: "border-box",
})

const TextLine = styled.div<{fontSize: number}>(props => ({
    fontSize: props.fontSize,
    lineHeight: 1.3,
    marginBottom: "4px",
    wordWrap: "break-word",
}))

// Apple Liquid Glass styled link
const StyledLink = styled.a<{fontSize: number}>(props => ({
    fontSize: props.fontSize,
    color: "#efd64f",
    textDecoration: "none",
    backgroundColor: "rgba(38, 63, 253, 0.65)",
    backdropFilter: "blur(12px) saturate(180%)",
    WebkitBackdropFilter: "blur(12px) saturate(180%)",
    padding: "4px 12px",
    transition: "all 0.2s ease",
    ":hover": {
        color: "#ff1717",
        backgroundColor: "rgba(38, 63, 253, 0.8)",
    }
}))

const BackLink = styled.a<{fontSize: number}>(props => ({
    fontSize: props.fontSize,
    color: "#f3cdc7",
    textDecoration: "none",
    backgroundColor: "rgba(38, 63, 253, 0.65)",
    backdropFilter: "blur(12px) saturate(180%)",
    WebkitBackdropFilter: "blur(12px) saturate(180%)",
    padding: "6px 14px",
    display: "inline-block",
    marginTop: "16px",
    transition: "all 0.2s ease",
    ":hover": {
        color: "#ff1717",
        transform: "translateX(-4px)",
    }
}))

const AboutCard = (props: {viewWidth: number, viewHeight: number}) => {
    // Calculate font size based on available space (5 lines of content)
    const fontSize = clampFontSize(
        Math.min(
            props.viewWidth / 30,
            (props.viewHeight - 80) / 8
        )
    );

    return (
        <MainText>
            <TextLine fontSize={fontSize}>// About:</TextLine>
            <TextLine fontSize={fontSize}>// I am a Software Developer at Microsoft;</TextLine>
            <TextLine fontSize={fontSize}>
                // I also write plugins for AfterEffects and other fun stuff at free time — <StyledLink fontSize={fontSize} href={"https://extrabite.io"}>ExtraBite.io;</StyledLink>
            </TextLine>
            <TextLine fontSize={fontSize}>// Based in Oslo</TextLine>
            <div>
                <BackLink fontSize={fontSize} href={"/"}>{"<< Back"}</BackLink>
            </div>
        </MainText>
    );
}

export default AboutCard;