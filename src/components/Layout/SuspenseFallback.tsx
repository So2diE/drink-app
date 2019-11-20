import React, {Suspense} from 'react';

const SuspenseFallback: React.ComponentType = ({children}) => (
    <Suspense fallback={<div/>} children={children}/>);
export default SuspenseFallback