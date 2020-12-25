import * as React from "react";
import styled from "styled-components";

const ContentWrapper = styled.div<{margin: string}>((props) => {
    return {
        display: "flex",
        justifyContent: "start",
        color: "#f3cdc7",
        margin: props.margin,
        flexDirection: "column"
    }
})

const AboutLinkInHorizontal = styled.a<{viewWidth: number, viewHeight: number}>((props) => {
    return {
        textDecoration: "none",
        cursor: "pointer",
        width: "fit-content",
        paddingRight: Math.round(props.viewWidth / 36),
        fontSize: Math.round(props.viewWidth / 16),
        color: "#1d231c",
        backgroundColor: "#efd64f",
        ":hover": {
            color: "#f3ccc6",
            backgroundColor: "#fe1716"
        }
    }
})

const BracketsLinkInHorizontal = styled.a<{viewWidth: number}>(props => {
    return {
        width: "fit-content",
        color: "#f3ccc6",
        textDecoration: "none",
        cursor: "pointer",
        fontSize: Math.round(props.viewWidth / 16),
    }
})

const AboutLinkInVertical = styled.a<{viewHeight: number, fontSize: number}>(props => {
    return {
        textDecoration: "none",
        cursor: "pointer",
        width: "fit-content",
        paddingRight: Math.round(props.viewHeight / 36),
        fontSize: props.fontSize,
        color: "#1d231c",
        backgroundColor: "#efd64f"
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

    const fontSize = props.viewWidth > props.viewHeight ? Math.round(props.viewWidth / 16)
        : Math.min(Math.round(props.viewHeight/ 10), Math.round(props.viewWidth / 8));


    React.useEffect(() => {
        // Draw blotter effects, raw js
        // BLOTTER - Example 1
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

        const elem = (window as any).document.getElementById("blotterMehanigElement");
        elem.innerText = "";
        const scope = blotter.forText(text);

        scope.appendTo(elem);
    }, [props.viewWidth, props.viewHeight])

    if (props.viewWidth > props.viewHeight) {
        const margin = `${Math.round(props.viewHeight * 0.02) + 28}px ${Math.round(props.viewWidth) * 0.03 + 48}px`

        return (
            <ContentWrapper margin={margin}>
                <div id="blotterMehanigElement" style={{
                    cursor: "pointer",
                    width: "fit-content",
                    marginBottom: -45,
                    fontSize,
                }}>MEHANIG:
                </div>
                <AboutLinkInHorizontal viewWidth={props.viewWidth} viewHeight={props.viewHeight} href={"/about"}>// ABOUT</AboutLinkInHorizontal>
                <BracketsLinkInHorizontal viewWidth={props.viewWidth} href={"/about"}>[<Plus>+</Plus>]</BracketsLinkInHorizontal>
            </ContentWrapper>
        )
    } else {
        const margin = "32px 0 48px 52px";

        return (
            <ContentWrapper margin={margin}>
                <div id="blotterMehanigElement" style={{
                    cursor: "pointer",
                    width: "fit-content",
                    marginBottom: -15,
                    fontSize,
                }}>MEHANIG:
                </div>
                <AboutLinkInVertical viewHeight={props.viewHeight} fontSize={fontSize} href={"/about"}>// ABOUT</AboutLinkInVertical>
                <BracketsLinkInVertical fontSize={fontSize} href={"/about"}>[<Plus>+</Plus>]</BracketsLinkInVertical>
            </ContentWrapper>
        )
    }
}

export default NameAndAboutCard;