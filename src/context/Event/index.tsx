import {Dispatch, useReducer} from 'react';
import reducer, {Action} from './dispatch'
import initialState, {State} from './state'

export interface EventReducer {
    state: State
    dispatch: Dispatch<Action>
}

export function useEventReducer(): EventReducer {
    const [state, dispatch] = useReducer(reducer, initialState);
    return {state, dispatch}
}