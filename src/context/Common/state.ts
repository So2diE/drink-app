import {drawerSection} from "../../components/Layout/Drawer";


export interface State {
    drawerSelectedSection: drawerSection,
    isSearchBarFocus: boolean
}


export const state: State = {
    isSearchBarFocus: false,
    drawerSelectedSection: drawerSection.fixture,
};
export default state;

