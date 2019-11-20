/// <reference types="react-scripts" />

import {FunctionComponent, HTMLAttributes} from "react";

declare global {

    type FunctionComponentWithHTMLAttributes<T> = FunctionComponent<HTMLAttributes<HTMLElement> & T>;


}