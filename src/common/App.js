import React from 'react'
import AliceCarousel from '../lib/react-alice-carousel'

class App extends React.PureComponent {
  render() {
    return (
      <div className="app" id="app">
        <h1 className="h1">React Alice Carousel</h1>
        <AliceCarousel infinite={true} stagePadding={{ paddingLeft: 0}} responsive={{ 100 : { items: 2}}}>
          <div className="item">
            <h1>1</h1>
          </div>
          <div className="item">
            <h1>2</h1>
          </div>
          <div className="item">
            <h1>3</h1>
          </div>
          <div className="item">
            <h1>4</h1>
          </div>
          <div className="item">
            <h1>5</h1>
          </div>
        </AliceCarousel>
        <div style={{ height: 1000 }} />
        <AliceCarousel
          stagePadding={{ paddingLeft: 50}}
          autoHeight={false} autoWidth={true} fadeOutAnimation={false} responsive={{ 100 : { items: 1}}}>
          <div className="item" style={{ width: 200, height: 100, background: 'red' }}>
            <h1>1</h1>
          </div>
          <div className="item" style={{ width: 120, height: 130 ,background: 'green' }}>
            <h1>2</h1>
          </div>
          <div className="item" style={{ width: 140, height: 100, background: 'orange' }}>
            <h1>3</h1>
          </div>
          <div className="item" style={{ width: 180, height: 110, background: 'blue' }}>
            <h1>4</h1>
          </div>
          <div className="item" style={{ width: 80, background: 'grey' }}>
            <h1>5</h1>
          </div>
        </AliceCarousel>
      </div>
    )
  }
}

export default App
