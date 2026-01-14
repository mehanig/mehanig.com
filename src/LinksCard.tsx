import * as React from "react";
import styled from "styled-components";

const ContentElem = styled.div<{left: number, top: number, maxWidth: number}>(props => ({
    display: "flex",
    justifyContent: "start",
    flexDirection: "column",
    color: "#f3cdc7",
    margin: "16px 24px",
    paddingBottom: "env(safe-area-inset-bottom, 20px)",
    position: "absolute",
    left: props.left,
    top: props.top,
    maxWidth: props.maxWidth > 0 ? props.maxWidth : "calc(100% - 48px)",
    maxHeight: "calc(100% - 80px - env(safe-area-inset-bottom, 0px))",
    overflow: "hidden",
}));

// Apple Liquid Glass inspired styling
const LinkBlock = styled.a<{fontSize: number, marginLeft?: string}>(props => {
    let styleObject: any = {
        textDecoration: "none",
        color: "#f3cdc7",
        width: "fit-content",
        cursor: "pointer",
        fontSize: Math.min(props.fontSize, 48), // Cap max font size
        // Liquid Glass effect
        backgroundColor: "rgba(38, 63, 253, 0.65)",
        backdropFilter: "blur(12px) saturate(180%)",
        WebkitBackdropFilter: "blur(12px) saturate(180%)",
        padding: "6px 14px",
        marginBottom: "4px",
        display: "inline-block",
        border: "1px solid rgba(255, 255, 255, 0.1)",
        boxShadow: "0 4px 16px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)",
        transition: "all 0.2s ease",
        ":hover": {
            color: "#ff1717",
            backgroundColor: "rgba(38, 63, 253, 0.8)",
            transform: "translateY(-1px)",
            boxShadow: "0 6px 20px rgba(0, 0, 0, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.15)",
        }
    }
    if (props.marginLeft) {
        return {
            ...styleObject,
            marginLeft: props.marginLeft
        }
    }
    return styleObject;
});

const TextBlock = styled.span<{fontSize: number, marginLeft?: string}>(props => {
    const styleObject: any = {
        fontSize: Math.min(props.fontSize, 48), // Cap max font size
        display: "flex",
        alignItems: "center",
        flexWrap: "wrap",
    }
    if (props.marginLeft) {
        return {
            ...styleObject,
            marginLeft: props.marginLeft
        }
    }
    return styleObject;
});

const BlinkingText = (props: {fontSize: number, children: any}) => {
    const [tick, setTick] = React.useState<number>(0);

    React.useEffect(() => {
        const intervalId = setInterval(() => {
            if (tick === 0) {
                setTick(1);
            } else {
                setTick(0);
            }
        }, 600);
        return () => clearInterval(intervalId);
    }, [tick]);


    const Blinker = styled.span(() => {
        return {
            fontSize: props.fontSize,
            color: tick ? "#8bfd42" : "#2941fc"
        }
    });
    return <Blinker>{props.children}</Blinker>
}

const MIN_FONT_SIZE = 14;
const MAX_FONT_SIZE = 48;

// Clamp font size to reasonable bounds
function clampFontSize(size: number): number {
    return Math.max(MIN_FONT_SIZE, Math.min(MAX_FONT_SIZE, Math.round(size)));
}

const LinksCard = (props: {nameAndAboutRef: React.RefCallback<HTMLElement> | null, viewWidth: number, viewHeight: number}) => {

    let marginLeft = "80px";
    const isLandscape = props.viewWidth >= props.viewHeight;

    const [left, setLeft] = React.useState(0);
    const [fontSize, setFontSize] = React.useState(32);
    const [top, setTop] = React.useState(100);
    const [maxWidth, setMaxWidth] = React.useState(0);

    React.useEffect(() => {
        if (!props.nameAndAboutRef) {
            return;
        }

        if (isLandscape) {
            const rect = (props.nameAndAboutRef as any).getBoundingClientRect();
            const newLeftValue = Math.round(rect.right);
            const newTopValue = Math.round(props.viewHeight * 0.15);
            const availableWidth = props.viewWidth - newLeftValue - 60;
            const availableHeight = props.viewHeight - newTopValue - 100;

            const newFontSizeValue = clampFontSize(
                Math.min(availableHeight / 11, availableWidth / 12)
            );

            setLeft(newLeftValue);
            setTop(newTopValue);
            setFontSize(newFontSizeValue);
            setMaxWidth(availableWidth);
        } else {
            const rect = (props.nameAndAboutRef as any).getBoundingClientRect();
            const newTopValue = Math.round(rect.bottom) + 10;
            // Safari bottom bar ~90px + safe area
            const availableHeight = props.viewHeight - newTopValue - 160;

            const newFontSizeValue = clampFontSize(availableHeight / 12);

            setLeft(16);
            setTop(newTopValue);
            setFontSize(newFontSizeValue);
            setMaxWidth(props.viewWidth - 48);
        }
    }, [props.nameAndAboutRef, props.viewWidth, props.viewHeight, isLandscape]);

    // Adjust margin based on orientation and font size
    marginLeft = isLandscape ? `${Math.max(40, fontSize * 1.5)}px` : `${Math.max(24, fontSize)}px`;

    return (
        <ContentElem left={left} top={top} maxWidth={maxWidth}>
            <TextBlock fontSize={fontSize}>[</TextBlock>
            <LinkBlock fontSize={fontSize} marginLeft={marginLeft} href={"https://github.com/mehanig"}>GitHub,</LinkBlock>
            <LinkBlock fontSize={fontSize} marginLeft={marginLeft} href={"https://x.com/MehaniG"}>X/Twitter,</LinkBlock>
            <LinkBlock fontSize={fontSize} marginLeft={marginLeft} href={"https://extrabite.io/"}>ExtraBite.io</LinkBlock>
            <LinkBlock fontSize={fontSize} marginLeft={marginLeft} href={"https://instagram.com/mehanig"}>Instagram,</LinkBlock>
            <LinkBlock fontSize={fontSize} marginLeft={marginLeft} href={"https://www.facebook.com/mehanig"}>Facebook,</LinkBlock>
            <LinkBlock fontSize={fontSize} marginLeft={marginLeft} href={"https://www.linkedin.com/in/mehanig/"}>LinkedIn,</LinkBlock>
            <TextBlock fontSize={fontSize} marginLeft={marginLeft}>
                <LinkBlock fontSize={fontSize}>"Photo Archive",</LinkBlock>
                <BlinkingText fontSize={fontSize}>|</BlinkingText>
            </TextBlock>
            <TextBlock fontSize={fontSize}>]</TextBlock>
        </ContentElem>
    )
}

export default LinksCard;