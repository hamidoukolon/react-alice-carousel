# React Alice Carousel

[![npm version](https://badge.fury.io/js/react-alice-carousel.svg)](https://badge.fury.io/js/react-alice-carousel)
[![Build Status](https://travis-ci.com/maxmarinich/react-alice-carousel.svg?branch=master)](https://travis-ci.com/maxmarinich/react-alice-carousel)

React Alice Carousel is a React component for building content galleries, content rotators and any React carousels.

#### Live demo [👉here](https://maxmarinich.github.io/react-alice-carousel/demos)

![demo gif](https://github.com/maxmarinich/react-alice-carousel/raw/master/src/assets/img/react-alice-carousel.gif)

![demo gif](https://github.com/maxmarinich/react-alice-carousel/raw/master/src/assets/img/react-alice-carousel-demo.gif)

## Features of react-alice-carousel

- Auto Height
- Auto Play
- Auto Width
- Custom animation modes
- Custom rendered slides
- Infinite loop
- Mobile friendly
- Multiple items in the slide
- Responsive design
- RTL
- Stage padding
- Show / hide anything (indicators, arrows, slides indexes)
- Swipe to slide
- Touch and Drag support
- TypeScript

## Install
```apacheconfig
npm i react-alice-carousel
```
### Style import
```
# CSS
@import "react-alice-carousel/lib/alice-carousel.css";
```
```
# SCSS
@import "react-alice-carousel/lib/scss/alice-carousel.scss";
```
#### Usage
```javascript
import React from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';


const handleDragStart = (e) => e.preventDefault();

const items = [
  <img src="/path-to-img" onDragStart={handleDragStart} className="yours-custom-class" />,
  <img src="/path-to-img" onDragStart={handleDragStart} className="yours-custom-class" />,
  <img src="/path-to-img" onDragStart={handleDragStart} className="yours-custom-class" />,
];

const Gallery = () => {
  return (
    <AliceCarousel mouseTracking items={items} />
  );
}
```
#####❓Full [documentation](https://maxmarinich.github.io/react-alice-carousel) available at [https://maxmarinich.github.io/react-alice-carouse](https://maxmarinich.github.io/react-alice-carousel)

### Build the project locally
#### Clone
```apacheconfig
git clone https://github.com/maxmarinich/react-alice-carousel
cd react-alice-carousel
```
#### Run
```apacheconfig
npm i
npm start
```
#### Test
```apacheconfig
npm test
```
#### License
MIT
