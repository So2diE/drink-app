import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import React from "react";
import {useCommonLayoutStyles} from "../useCommonLayoutStyles";
import {IconButton} from "@material-ui/core";
import {MenuOutlined} from '@material-ui/icons'
import classNames from 'clsx'
import {HeaderSectionsSearchBar} from "./Sections/SearchBar";

interface Props {
    open: boolean
    handleDrawerOpen: () => void
}

export const PanelHeader: React.FunctionComponent<Props> = (props) => {

    const classes = useCommonLayoutStyles();
    const {handleDrawerOpen, open} = props;
    return <AppBar
        position="fixed"
        className={classNames(classes.appBar, {
            [classes.appBarShift]: open,
        })}
    >
        <Toolbar>
            <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                edge="start"
                className={classNames(classes.menuButton, {
                    [classes.hide]: open,
                })}
            >
                <MenuOutlined/>
            </IconButton>
            <HeaderSectionsSearchBar/>
        </Toolbar>
    </AppBar>

};
