import * as React from "react";
import styled from "styled-components";

const ContentElem = styled.div<{left: number, top: number}>(props => ({
    display: "flex",
    justifyContent: "start",
    flexDirection: "column",
    color: "#f3cdc7",
    margin: "32px 52px",
    position: "absolute",
    left: props.left,
    top: props.top
}));

const LinkBlock =  styled.a<{fontSize: number, marginLeft?: string}>(props => {
    let styleObject: any = {
        textDecoration: "none",
        color: "inherit",
        width: "fit-content",
        cursor: "pointer",
        fontSize: props.fontSize,
        ":hover": {
            color: "#ff1717"
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

const TextBlock =  styled.a<{fontSize: number, marginLeft?: string}>(props => {
    const styleObject = {
        fontSize: props.fontSize,
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

const LinksCard = (props: {nameAndAboutRef: React.RefCallback<HTMLElement> | null, viewWidth: number, viewHeight: number}) => {

    let marginLeft = "160px";

    const [left, setLeft] = React.useState(960);
    const [fontSize, setFontSize] = React.useState(56);
    const [top, setTop] = React.useState(200);

    if (props.nameAndAboutRef) {

        if (props.viewWidth >= props.viewHeight) {
            const newLeftValue = Math.round((props.nameAndAboutRef as any).getBoundingClientRect().right)
            if (left != newLeftValue) {
                setLeft(newLeftValue);
            }

            const newTopValue = props.viewHeight * 0.2;
            if (top != newTopValue) {
                setTop(newTopValue);
            }

            const newFontSizeValue = Math.min(
                Math.round((props.viewHeight - top - 40) / 12),
                Math.round((props.viewWidth - left - 90) / 14 )
            );

            if (fontSize != newFontSizeValue) {
                setFontSize(newFontSizeValue);
            }

        } else {
            const newTopValue = Math.round((props.nameAndAboutRef as any).getBoundingClientRect().bottom);

            if (left != 32) {
                setLeft(32);
            }
            if (top != newTopValue) {
                setTop(newTopValue);
            }

            const newFontSizeValue = Math.round((props.viewHeight - top - 60) / 12);
            if (fontSize != newFontSizeValue) {
                setFontSize(newFontSizeValue);
            }

            marginLeft = "48px";
        }
    }

    return (
        <ContentElem left={left} top={top}>
            <TextBlock fontSize={fontSize}>[</TextBlock>
            <LinkBlock fontSize={fontSize} marginLeft={marginLeft} href={"http://github.com/mehanig"}>GitHub,</LinkBlock>
            <LinkBlock fontSize={fontSize} marginLeft={marginLeft} href={"https://medium.com/@mehanig"}>Blog,</LinkBlock>
            <LinkBlock fontSize={fontSize} marginLeft={marginLeft} href={"https://extrabite.io/"}>ExtraBite.io</LinkBlock>
            <LinkBlock fontSize={fontSize} marginLeft={marginLeft} href={"http://instagram.com/mehanig"}>Instagram,</LinkBlock>
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