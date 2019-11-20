import {eventActionType} from "./actionType";
import {State} from "./state";
import {DrinkEvent} from "../../types/server";

export interface Action {
    type: eventActionType
    payload: {
        events?: Array<DrinkEvent>
    }

}


export const dispatch = (state: State, action: Action): State => {
    switch (action.type) {
        case eventActionType.EVENT_INIT_EVENTS: {
            return ({
                ...state,
                events: action.payload.events || []
            })
        }

        default:
            return state
    }
};


export default dispatch

