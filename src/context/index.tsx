import React, {Context, createContext} from "react";
import {CommonReducer, useCommonReducer} from "./Common";
import {state as commonInitState} from "./Common/state";
import {EventReducer, useEventReducer} from "./Event";


interface ContextReducer {
    commonReducer: CommonReducer,
    eventReducer: EventReducer

}

export const initReducer = <T extends {}>(initState: T = {} as T) => ({
    state: initState,
    dispatch: (args: any) => {
    }
});

export const reducer: Context<ContextReducer> = createContext(
    {
        commonReducer: initReducer(commonInitState),
        eventReducer: initReducer(),
    });

const ReducerContextProvider: React.ComponentType = ({children}) => {

    const value = {
        commonReducer: useCommonReducer(),
        eventReducer: useEventReducer(),
    };

    return <reducer.Provider value={value} children={children}/>
};


export default ReducerContextProvider