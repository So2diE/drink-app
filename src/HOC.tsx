import * as React from 'react';
import {BrowserRouter} from "react-router-dom";
import ReducerContextProvider from './context'
import {Theme} from "./theme";

export const HOC: React.ComponentType = ({children}) => (
    <ReducerContextProvider>
        <BrowserRouter>
            <Theme>
                {children}
            </Theme>
        </BrowserRouter>
    </ReducerContextProvider>
);
