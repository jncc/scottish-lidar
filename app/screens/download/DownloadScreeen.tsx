
import * as React from 'react'
import { useCookies } from 'react-cookie'

type Props = {
} 

const BASKET_COOKIE_NAME = 'basket'

export const DownloadScreen = (props: Props) => {
  
  // let basket = new Basket()

  let [cookies, setCookie] = useCookies([BASKET_COOKIE_NAME])

  let setCookieValue = (value: string) => {
    setCookie(BASKET_COOKIE_NAME, value, { path: '/' })
  }

  let cookieValue = cookies[BASKET_COOKIE_NAME]

  return (
    <div>
      <TemporaryForm name={cookieValue} onChange={setCookieValue} />
      {cookieValue &&
        <pre>Hello {cookieValue}</pre>
      }
    </div>
  )
}

class TemporaryForm extends React.Component<any, any> {
  constructor(props: any) {
    super(props)
    this.state = {value: ''}

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(event: any) {
    this.setState({value: event.target.value})
    this.props.onChange(event.target.value)
  }

  handleSubmit(event: any) {
    // alert('A name was submitted: ' + this.state.value)
    event.preventDefault()
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Name:
          <input type="text" value={this.state.value} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    )
  }
}
