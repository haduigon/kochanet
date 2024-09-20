import { Dispatch, useEffect, useReducer } from "react";
import { ACTIONS } from "../helpers/utils";
import React from "react";
// import { Post } from "../components/PostElement/PostElement";

type Post = {
   body: string;
    id: number;
    title: string;
    userId: number;
}

type Action = { type: ACTIONS.SET_SHOW_MODAL, payload: boolean }
| {type: ACTIONS.SET_SELECTED_POST, payload: Post}

interface Data {
  showModal: boolean,
  selectedPost: Post
}

function reducer(state: Data, action: Action) {
  switch (action.type) {
    case ACTIONS.SET_SHOW_MODAL: {
      return {
        ...state,
        showModal: action.payload,
      }
    }
    case ACTIONS.SET_SELECTED_POST: {
      return {
        ...state,
        selectedPost: action.payload,
      }
    }
  }
}

type State = {
  state: Data,
  dispatch: Dispatch<Action>
}

const initialState: State = {
  state: {
    showModal: false,
    selectedPost: {} as Post
  },
  dispatch: () => {}
}

export const StateContext = React.createContext(initialState);

type Props = {
  children: React.ReactNode;
}

export const AppContextProvider: React.FC<Props> = ({ children }) => {
  
  const [state, dispatch] = useReducer(reducer, initialState.state)
  
  return (
    <StateContext.Provider value={{
      state,
      dispatch,
    }}>
      {children}
    </StateContext.Provider>
  )
}