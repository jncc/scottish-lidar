import React from 'react'

const defaultState = {
  counter: 0,
  //collections
}

export type CounterAction = { type: 'COUNTER_INC' | 'COUNTER_DEC'  }

function reducer(state = defaultState, action: CounterAction) {
  switch (action.type) {
    case 'COUNTER_INC':
      return { ...state, counter: state.counter + 1 }
    case 'COUNTER_DEC':
      return { ...state, counter: state.counter - 1 }
    default:
      return state
  }
}

type MyStoreContextProps = {
  state: typeof defaultState,
  dispatch: React.Dispatch<CounterAction>,
}
let defaultValue = {
  state: defaultState,
  dispatch: (a: CounterAction) => {}
}

const MyStoreContext = React.createContext(defaultValue)

export const MyStoreProvider: React.FunctionComponent<{}> = ({ children }) => {

  const [state, dispatch] = React.useReducer(reducer, defaultState)

  return  <MyStoreContext.Provider value={{ state, dispatch }}>
          {children}
        </MyStoreContext.Provider>
}

export const useMyStore = () => React.useContext(MyStoreContext)
