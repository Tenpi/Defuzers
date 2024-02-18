import React, {useEffect, useContext, useReducer, useState} from "react"
import {EnableDragContext, TabContext} from "../Context"
import TitleBar from "../components/TitleBar"
import SideBar from "../components/Sidebar"
import Generate from "../components/Generate"
import Preview from "../components/Preview"
import Settings from "../components/Settings"
import Train from "../components/Train"
import DragAndDrop from "../components/DragAndDrop"
import Draw from "../components/Draw"
import ExpandDialog from "../components/ExpandDialog"
import View from "../components/View"
import SavedPrompts from "../components/SavedPrompts"
import Watermark from "../components/Watermark"

const MainPage: React.FunctionComponent = (props) => {
    const [ignored, forceUpdate] = useReducer(x => x + 1, 0)
    const {enableDrag, setEnableDrag} = useContext(EnableDragContext)
    const {tab, setTab} = useContext(TabContext)

    useEffect(() => {
        document.title = "Diffusers UI"
    }, [])

    useEffect(() => {
        const savedTab = localStorage.getItem("tab")
        if (savedTab) setTab(savedTab)
    }, [])

    useEffect(() => {
        localStorage.setItem("tab", String(tab))
    }, [tab])

    const getTab = () => {
        if (tab === "generate") {
            return <Generate/>
        } else if (tab === "train") {
            return <Train/>
        } else if (tab === "settings") {
            return <Settings/>
        } else if (tab === "view") {
            return <View/>
        } else if (tab === "saved prompts") {
            return <SavedPrompts/>
        } else if (tab === "watermark") {
            return <Watermark/>
        }
    }

    return (
        <div>
        <DragAndDrop/>
        <ExpandDialog/>
        <Draw/>
        <Preview/>
        <TitleBar rerender={forceUpdate}/>
        <div className="body">
            <SideBar/>
            {getTab()}
        </div>
        </div>
    )
}

export default MainPage