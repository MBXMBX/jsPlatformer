window.addEventListener(`keydown`, (event) => {
    if (player1.preventInput) {
        keys.jump.pressed = false;
        keys.dash.pressed = false;
        keys.left.pressed = false;
        keys.right.pressed = false;
        keys.down.pressed = false;
        keys.up.pressed = false;
        keys.q.pressed = false;
        keys.w.pressed = false;
        keys.e.pressed = false;
        player1.ycollision = true;
        player1.velocity.x = 0;
        player1.velocity.y = 0;   
        return;
    }
    switch (event.key) {
        case `z`:
            keys.jump.pressed = true;
            break;
        case `Z`:
            keys.jump.pressed = true;
            break;
        case `x`:
            keys.dash.pressed = true;
            break;
        case `X`:
            keys.dash.pressed = true;
            break;
        case `q`:
            keys.q.pressed = true;
            break;
        case `Q`:
            keys.q.pressed = true;
            break;
        case `w`:
            keys.w.pressed = true;
            break;
        case `W`:
            keys.w.pressed = true;
            break;
        case `e`:
            keys.e.pressed = true;
            break;
        case `E`:
            keys.e.pressed = true;
            break;
        case `ArrowLeft`:
            keys.left.pressed = true;
            break;
        case `ArrowRight`:
            keys.right.pressed = true;
            break;
        case `ArrowUp`:
            keys.up.pressed = true;
            break;
        case `ArrowDown`:
            keys.down.pressed = true;
            break;
    }
})

window.addEventListener(`keyup`, (event) => {
    // console.log(event.key);
    switch (event.key) {
        case `z`:
            keys.jump.pressed = false;
            break;
        case `Z`:
            keys.jump.pressed = false;
            break;
        case `x`:
            keys.dash.pressed = false;
            break;
        case `X`:
            keys.dash.pressed = false;
            break;
        case `q`:
            keys.q.pressed = false;
            break;
        case `Q`:
            keys.q.pressed = false;
            break;
        case `w`:
            keys.w.pressed = false;
            break;
        case `W`:
            keys.w.pressed = false;
            break;
        case `e`:
            keys.e.pressed = false;
            break;
        case `E`:
            keys.e.pressed = false;
            break;
        case `ArrowLeft`:
            keys.left.pressed = false;
            break;
        case `ArrowRight`:
            keys.right.pressed = false;
            break;
        case `ArrowUp`:
            keys.up.pressed = false;
            break;
        case `ArrowDown`:
            keys.down.pressed = false;
            break;
    }
})