
import * as React from 'react'
import { useCookies } from 'react-cookie'

type Props = {
} 

export const DownloadScreen = (props: Props) => {
  const [cookies, setCookie] = useCookies(['name'])

  function onChange(newName: any) {
    setCookie('name', newName, { path: '/' })
  }

  return (
    <div>
      <NameForm name={cookies.name} onChange={onChange} />
      {cookies.name && <h2>Hello {cookies.name}!</h2>}
    </div>
  )
}


// export const DownloadScreen = (props: Props) => {

//   let [cookies, setCookie] = useCookies(['name'])

//   function onChange(e: any) {
//     let newName = e.target.value
//     console.log(e.target)
//     setCookie('name', newName, { path: '/' })
//     e.preventDefault()
//   }



//   return (
//     <div>
//       <h1>Downloads</h1>
//       <div>
//         <form onSubmit={onChange}>
//           <label>
//             Name: <input type="text" name="name" value={cookies.name} />
//           </label>
//           <input type="submit" value="Go"  />
//         </form>
                
//         {cookies.name && <h1>Hello {cookies.name}!</h1>}
//       </div>
//     </div>
//   )

// }

class NameForm extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event: any) {
    this.setState({value: event.target.value});
    this.props.onChange(event.target.value)
    console.log(event.target.value)
  }

  handleSubmit(event: any) {
    // alert('A name was submitted: ' + this.state.value);
    event.preventDefault();
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
    );
  }
}
