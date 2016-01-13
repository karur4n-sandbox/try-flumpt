import * as React from 'react'
import {Flux, Component} from 'flumpt'
import {render} from 'react-dom'

class ConuterComponent extends Component {
  constructor() {
    super()
    this.increment = this.increment.bind(this)
    this.decrement = this.decrement.bind(this)
  }

  increment() {
    this.dispatch('increment')
  }

  decrement() {
    this.dispatch('decrement')
  }

  render() {
    return (
      <div>
        <p>count: {this.props.count}</p>
        <div>
          <button onClick={this.increment}>+1</button>
          <button onClick={this.decrement}>-1</button>
        </div>
      </div>
    )
  }
}

class App extends Flux {
  subscribe() {
    this.on('increment', () => {
      this.update(({count}) => {
        return {count: count + 1}
      })
    })

    this.on('decrement', () => {
      this.update(({count}) => {
        return {count: count - 1}
      })
    })
  }

  render(state) {
    return <ConuterComponent {...state}/>
  }
}

const app = new App({
  renderer: el => {
    render(el, document.querySelector('#js-container'))
  },
  initialState: {count: 0},
  middlewares: [
    (state) => {
      console.log(state);
      return state;
    }
  ]
})

app.update(_initialState => (_initialState))
