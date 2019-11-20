import React, {useContext, useState} from 'react';
import InputBase from "@material-ui/core/InputBase";
import {makeStyles} from "@material-ui/core";
import {fade} from "@material-ui/core/styles";
import {SearchOutlined} from "@material-ui/icons";
import {reducer} from "../../../../context";
import agent from "../../../../agent";
import actionType from "../../../../context/actionType";
import {red} from "@material-ui/core/colors";

const useStyles = makeStyles(
    theme => ({

        search: {
            position: 'relative',
            borderRadius: theme.shape.borderRadius,
            backgroundColor: fade(theme.palette.common.white, 0.15),
            '&:hover': {
                backgroundColor: fade(theme.palette.common.white, 0.25),
            },
            marginLeft: 0,
            width: '100%',
            [theme.breakpoints.up('sm')]: {
                marginLeft: theme.spacing(1),
                width: 'auto',
            },
        },
        searchIcon: {
            width: theme.spacing(7),
            height: '100%',
            position: 'absolute',
            pointerEvents: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
        inputRoot: {
            color: 'inherit',
        },
        inputInput: {
            padding: theme.spacing(1, 1, 1, 7),
            transition: theme.transitions.create('width'),
            width: '100%',
            [theme.breakpoints.up('sm')]: {
                width: 120,
                '&:focus': {
                    width: 200,
                },
            },
        },
    })
);

interface Props {

}

export const HeaderSectionsSearchBar: FunctionComponentWithHTMLAttributes<Props> = props => {
    const {isSearchBarFocus} = useContext(reducer).commonReducer.state;
    const {eventReducer} =useContext(reducer);
    const [searchItem, setSearchItem] =useState('');
    const onChange:React.ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement> = (e)=>{
        setSearchItem(e.target.value)
          agent.Event.getEvents({
              search:e.target.value
          }).then(
              (res) => {
                  eventReducer.dispatch(
                      {
                          type: actionType.event.EVENT_INIT_EVENTS,
                          payload: {
                              events: res.data
                          }
                      }
                  )
              }
          ).catch(
              (err) => eventReducer.dispatch(
                  {
                      type: actionType.event.EVENT_INIT_EVENTS,
                      payload: {
                          events: []
                      }
                  }
              )
          )
    };
    const classes = useStyles();
    return <div className={classes.search}>
        <div className={classes.searchIcon}>
            <SearchOutlined/>
        </div>
        <InputBase
            autoFocus={isSearchBarFocus}
            onFocus={() => {

            }}
            placeholder="Search…"
            classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
            }}
            onChange={
                onChange
            }
            value={searchItem}
            inputProps={{'aria-label': 'search'}}
        />
    </div>
};