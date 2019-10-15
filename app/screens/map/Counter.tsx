import React from 'react'
import { useMyStore } from '../../mystore'

export default function Counter() {

  const { state, dispatch } = useMyStore()

  return (
    <section className="counter">
      <div className="value">{state.counter}</div>
      <button onClick={() => dispatch({ type: 'COUNTER_INC' })}>Add</button>
      <button onClick={() => dispatch({ type: 'COUNTER_DEC' })}>Subtract</button>
    </section>
  )
}
