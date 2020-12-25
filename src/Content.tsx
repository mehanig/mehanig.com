import * as React from "react";
import ContentCard from "./ContentCard";
import AboutCard from './AboutCard';
import {
    Switch,
    Route,
} from "react-router-dom";

const contentStyle: React.CSSProperties = {
    display: "flex",
    justifyContent: "center",
    minHeight: "calc(100vh - 230px)"
}

const Content = (props: {}) => {
    return (
        <div style={contentStyle}>
            <Switch>
                <Route path="/about">
                    <AboutCard />
                </Route>
                <Route path="/">
                    <div>
                        <ContentCard text={"GitHub"} bgImage={"github"}/>
                        <ContentCard text={"Blog"} bgImage={"blog"}/>
                        <ContentCard text={"LinkedIn"} bgImage={"linkedIn"}/>
                        <ContentCard text={"Instagram"} bgImage={"instagram"}/>
                        <ContentCard text={"Facebook"} bgImage={"facebook"}/>
                        <ContentCard text={"Random Photo Archive"} bgImage={"photoArchive"}/>
                    </div>
                </Route>
            </Switch>
        </div>
    )
}

export default Content;