## Documentation

#### Options

- `activeIndex` : Number, default `0` - Set carousel at the specified position.
- `animationDuration`: Number, default `400` - Set duration of animation.
- `animationEasingFunction`: String | [Function](https://developer.mozilla.org/ru/docs/Web/CSS/animation-timing-function), default `ease` - Property sets how an animation progresses through the duration of each cycle.
- `animationType`: String(`slide` | `fadeout`), default `slide` - Set type of animation.
- `autoHeight`: Boolean, default `false` - Set auto height mode.
- `autoWidth`: Boolean, default `false` - Set auto width mode.
- `autoPlay`: Boolean, default `false` - Set autoplay mode.
- `autoPlayDirection`: String(`ltr` | `rtl`), default `ltr` - Set autoplay direction value.
- `autoPlayInterval`: Number, default `400` - Set autoplay interval value.
- `cancelAutoPlayOnAction`: Boolean, default `false` - Cancel autoplay mode if a user action was detected.
- `cancelAutoPlayOnHover`: Boolean, default `false` - Cancel autoplay mode if hover action was detected.
- `controlsStrategy`: String (`default` | `responsive`), default `default` - Set a strategy for gallery controls. Dots navigation will be hidden if _responsive_ property is set and the number of gallery elements is equal to the number of items in the slide.
- `disableButtonsControls`: Boolean, default `false` - Disable buttons controls.
- `disableDotsControls`: Boolean, default `false` - Disable dots controls.
- `disablePlayButtonControls`: Boolean, default `true` - Disable `play/pause` button.
- `disableSlideInfo`: Boolean, default `true` - Disable information about current slide.
- `infinite`: Boolean, default `false` - Set infinite mode.
- `items`: Array, default `undefined`  - Set gallery items, preferable to use this property instead of children.
- `mouseTracking`: Boolean, default `false`  - Enable mouse drag animation.
- `paddingLeft`: Number, default `0`  - Set the gallery offset from the left.
- `paddingRight`: Number, default `0`  - Set the gallery offset from the right.
- `responsive`: Object, default `undefined` - Set number of items in the slide. The key is the breakpoint (default is the result of: () => window.innerWidth).
- `swipeDelta`: Number, default `20`  - Set minimum distance to the start of the swiping (px).
- `swipeExtraPadding`: Number, default `200`  - Set maximum distance from initial place before swipe action will be stopped (px).
- `touchTracking`: Boolean, default `true`  - Enable touch move animation.
- `touchMoveDefaultEvents`: Boolean, default `true`  - Enable touch move default events on swiping.
- `onInitialized`: Function - Fired when the event object is changing / return `EventObject`.
- `onResized`: Function - Fired as callback after the gallery was resized / returns `EventObject`.
- `onResizeEvent`: Function - Fired during `resize` event to determine whether the event handler should be called / return `boolean`.
- `onSlideChange`: Function - Fired while the event object is changing / returns `EventObject`.
- `onSlideChanged`: Function - Fired after the event object was changed / returns `EventObject`.

    `EventObject` example:
    ```typescript
      {
          item: number;  // index of the current item`s position
          slide: number;  // index of the current slide`s position
          itemsInSlide: number;   // number of elements in the slide
          isPrevSlideDisabled: bool; // indicator to control the visibility of dots navigation
          isNextSlideDisabled: bool;
      }
    ```

#### Methods
- `slideTo(activeIndex?: number): void` : Go to the specified slide.
- `slidePrev(e: any): void` : Go to the specified slide.
- `slideNext(e: any): void` : Go to the specified slide.
