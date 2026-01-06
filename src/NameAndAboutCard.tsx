import * as React from "react";
import styled from "styled-components";

const MIN_FONT_SIZE = 24;
const MAX_FONT_SIZE = 72;

function clampFontSize(size: number): number {
    return Math.max(MIN_FONT_SIZE, Math.min(MAX_FONT_SIZE, Math.round(size)));
}

const ContentWrapper = styled.div<{margin: string}>((props) => {
    return {
        display: "flex",
        justifyContent: "start",
        color: "#f3cdc7",
        margin: props.margin,
        flexDirection: "column",
        maxWidth: "100%",
        overflow: "hidden",
    }
})

// Apple Liquid Glass inspired styling for the About link
const AboutLinkInHorizontal = styled.a<{fontSize: number}>((props) => {
    return {
        textDecoration: "none",
        cursor: "pointer",
        width: "fit-content",
        paddingRight: Math.round(props.fontSize * 0.4),
        paddingLeft: "8px",
        fontSize: props.fontSize,
        color: "#1d231c",
        backgroundColor: "rgba(239, 214, 79, 0.9)",
        backdropFilter: "blur(8px) saturate(150%)",
        WebkitBackdropFilter: "blur(8px) saturate(150%)",
        transition: "all 0.2s ease",
        ":hover": {
            color: "#f3ccc6",
            backgroundColor: "rgba(254, 23, 22, 0.9)",
            transform: "translateY(-1px)",
        }
    }
})

const BracketsLinkInHorizontal = styled.a<{fontSize: number}>(props => {
    return {
        width: "fit-content",
        color: "#f3ccc6",
        textDecoration: "none",
        cursor: "pointer",
        fontSize: props.fontSize,
    }
})

const AboutLinkInVertical = styled.a<{fontSize: number}>(props => {
    return {
        textDecoration: "none",
        cursor: "pointer",
        width: "fit-content",
        paddingRight: Math.round(props.fontSize * 0.4),
        paddingLeft: "8px",
        fontSize: props.fontSize,
        color: "#1d231c",
        backgroundColor: "rgba(239, 214, 79, 0.9)",
        backdropFilter: "blur(8px) saturate(150%)",
        WebkitBackdropFilter: "blur(8px) saturate(150%)",
        transition: "all 0.2s ease",
        ":hover": {
            color: "#f3ccc6",
            backgroundColor: "rgba(254, 23, 22, 0.9)",
        }
    }
})

const BracketsLinkInVertical = styled.a<{fontSize: number}>(props => {
    return {
        width: "fit-content",
        color: "#f3ccc6",
        textDecoration: "none",
        fontSize: props.fontSize,
        cursor: "pointer",
    }
})

const Plus = styled.span`
    font-size: inherit;
    color: #f3ccc6;
    ${BracketsLinkInHorizontal}:hover & {
        color: #fe1716;
    }
    ${BracketsLinkInVertical}:hover & {
        color: #fe1716;
    }
`

const NameAndAboutCard = (props: {viewWidth: number, viewHeight: number}) => {
    const isLandscape = props.viewWidth > props.viewHeight;

    // Calculate clamped font size
    const rawFontSize = isLandscape
        ? props.viewWidth / 16
        : Math.min(props.viewHeight / 10, props.viewWidth / 8);
    const fontSize = clampFontSize(rawFontSize);

    React.useEffect(() => {
        // Check if Blotter is available
        if (!(window as any).Blotter) {
            return;
        }

        const text = new (window as any).Blotter.Text("MEHANIG:", {
            family : "'Montserrat', sans-serif",
            size : fontSize,
            fill : "#f3ccc6",
            width: "fit-content",
            cursor: "pointer"
        });

        const material = new (window as any).Blotter.LiquidDistortMaterial();
        material.uniforms.uSpeed.value = 0.125;
        material.uniforms.uVolatility.value = 0.07;
        material.uniforms.uSeed.vale = 0.1;

        const blotter = new (window as any).Blotter(material, {
            texts : text
        });

        const elem = document.getElementById("blotterMehanigElement");
        if (!elem) {
            return;
        }
        elem.innerText = "";
        const scope = blotter.forText(text);

        scope.appendTo(elem);
    }, [fontSize])

    if (isLandscape) {
        // Landscape: constrain margins to prevent overflow
        const marginTop = Math.min(Math.round(props.viewHeight * 0.02) + 28, 60);
        const marginLeft = Math.min(Math.round(props.viewWidth * 0.03) + 48, 80);
        const margin = `${marginTop}px ${marginLeft}px`;

        return (
            <ContentWrapper margin={margin}>
                <div id="blotterMehanigElement" style={{
                    cursor: "pointer",
                    width: "fit-content",
                    marginBottom: -Math.round(fontSize * 0.6),
                    height: fontSize * 1.9,
                    fontSize,
                }}>MEHANIG:
                </div>
                <AboutLinkInHorizontal fontSize={fontSize} href={"/about"}>// ABOUT</AboutLinkInHorizontal>
                <BracketsLinkInHorizontal fontSize={fontSize} href={"/about"}>[<Plus>+</Plus>]</BracketsLinkInHorizontal>
            </ContentWrapper>
        )
    } else {
        // Portrait: use smaller, fixed margins
        const margin = "24px 0 24px 32px";

        return (
            <ContentWrapper margin={margin}>
                <div id="blotterMehanigElement" style={{
                    cursor: "pointer",
                    width: "fit-content",
                    marginBottom: -Math.round(fontSize * 0.3),
                    fontSize,
                }}>MEHANIG:
                </div>
                <AboutLinkInVertical fontSize={fontSize} href={"/about"}>// ABOUT</AboutLinkInVertical>
                <BracketsLinkInVertical fontSize={fontSize} href={"/about"}>[<Plus>+</Plus>]</BracketsLinkInVertical>
            </ContentWrapper>
        )
    }
}

export default NameAndAboutCard;