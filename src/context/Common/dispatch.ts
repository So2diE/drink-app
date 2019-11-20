import {commonActionType} from "./actionType";
import {State} from "./state";
import {ThemeOptions} from "@material-ui/core/styles/createMuiTheme";
import {drawerSection} from "../../components/Layout/Drawer";

export interface Action {
    type: commonActionType
    payload: {
        theme?: ThemeOptions,
        isSearchBarFocus?: boolean,
        drawerSelectedSection?: drawerSection
    }

}


const dispatch = (state: State, action: Action): State => {
    switch (action.type) {
        case commonActionType.COMMON_EDIT_SEARCH_BAR: {
            return {
                ...state,
                ...(action.payload.isSearchBarFocus ? {
                    isSearchBarFocus: action.payload.isSearchBarFocus
                } : {})
            }
        }
        case commonActionType.COMMON_EDIT_SELECTED_DRAWER: {
            return ({
                ...state,
                ...(action.payload.drawerSelectedSection ? {
                    drawerSelectedSection: action.payload.drawerSelectedSection
                } : {})
            })
        }
        default:
            return state
    }
};


export default dispatch

