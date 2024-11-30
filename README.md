# user-input

Package allows client to listen for mouse and touch events on a div element and listen for keyboard events on the main document.

PointerInput class translates mouse and touch events on the div into 'move-pointer', 'tap-pointer', 'double-tap-pointer', 'press-and-hold-pointer', 'swipe-pointer', 'drag-pointer' and 'drag-pointer-end' custom events.  Each custom event dispatches with a detail object containing x and y coordinates of where the event took place.

The Swipe event contains a 'to' and 'from' x/y coordinate object, the angle of the swipe (in radians), the distance of the swipe (in pixels) and the direction of the swipe (up, down, left, right or none);

The KeyboardInput class translates keydown events into custom '<key>-pressed' events, including optionally whether modifier keys (ctrl, shift, alt) have been pressed.

The InputHandler class translates the custom events generated by Pointer and Keyboard Input classes into new custom events specific to your app.  Multiple pointer or keyboard events can trigger a single custom app event.

both PointerInput and KeyboardInput classes can be fully configured, allowing you to fine-tune the sensitivity of the pointer events and control the speed (throttle) at which the custom keyboard events fire.

usage:

```html
<div id="user-input"></div>
```

```javascript
// the speed in milliseconds at which a tap is considered a press and hold event
PointerInput.PRESS_AND_HOLD_SENSITIVITY= 500;

// the speed in milliseconds under which 2 taps fire a double tap event
PointerInput.DOUBLE_TAP_SENSITIVITY = 250;

// how far in pixels the pointer must travel to be considered a swipe
PointerInput.SWIPE_SENSITIVITY = 50;

// control the rate at which keyboard input events fire
KeyboardInput.THROTTLE = 100;

new PointerInput()
    .enable('drag')
    .enable('double-tap')

new KeyboardInput()
    .enableArrowKeys()
    .enable('spacebar')
    .enableShiftKey()

new InputHandler()
    .translate(['left-arrow-pressed', 'drag'], 'previous-item');
    .translate(['right-arrow-pressed', 'drag'], 'next-item');
    .translate(['spacebar-pressed', 'double-tap-pointer'], 'select-item');
    .translate(['shift-spacebar-pressed', 'double-tap-pointer'], 'unselect-item');

document.body.addEventListener('previous-item', (e) => { /** ... */ });
document.body.addEventListener('next-item', (e) => { /** ... */ });
document.body.addEventListener('select-item', (e) => { /** ... */ });
document.body.addEventListener('unselect-item', (e) => { /** ... */ });

```
## custom keyboard event names

- no modifier >	"*custom-name*-pressed"
- ctrl > "***ctrl***-*custom-name*-pressed"
- shift > "***shift***-*custom-name*-pressed"
- alt > "***alt***-*custom-name*-pressed"

**numpad keys**
- numpad-0
- numpad-1			
- numpad-2			
- numpad-3			
- numpad-4			
- numpad-5			
- numpad-6			
- numpad-7			
- numpad-8			
- numpad-9			
- numpad-divide
- numpad-multiply
- numpad-subtract
- numpad-add
- numpad-enter

**cursor-keys**
- pageup
- pagedown
- home
- end
- insert
- delete

**arrow-keys**
- up
- down
- left
- right

**numbers**
- 1
- 2
- 3
- 4
- 5
- 6
- 7
- 8
- 9
- 0

**letters**
- q
- w
- e
- r
- t
- y
- u
- i
- o
- p
- a
- s
- d
- f
- g
- h
- j
- k
- l
- z
- x
- c
- v
- b
- n
- m

**other available keys**
- enter
- spacebar
- escape
- backspace
- comma
- fullstop
- minus
- equal
- left-bracket
- right-bracket