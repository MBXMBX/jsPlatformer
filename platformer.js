let canvas = document.querySelector(`canvas`);
const c = canvas.getContext(`2d`);
const choice = document.getElementById(`centering2`);
const timeContainer = document.getElementById(`time`);
const fullscreenButton = document.getElementById(`fullscreen`);

let player;
let playerNumber = 2;
let sizeMultiplier = 2;
let oldSize = sizeMultiplier;

canvas.width = 48*16*sizeMultiplier; 
canvas.height = 48*9*sizeMultiplier;

let parsedCollisions;
let collisionBlocks;
let spikeBlocks;
let backgroundLevel;
let doors;

let finale = false;
let finalDoor = false;
let stopMainMenu = false;
let stopAnimate = false;

fullscreenButton.addEventListener(`click`, () => {
    if (document.canvas) {
        // sizeMultiplier = 2;
        // levels[level].init()
        document.exitFullscreen();
    } else {
        // window.requestAnimationFrame(animate1);

        // sizeMultiplier = 3;
        // levels[level].init()
        canvas.requestFullscreen();
    }
});

// document.addEventListener(`fullscreenchange`, fullscreenchanged);

// function fullscreenchanged(event) {
//     if (document.canvas) {
//         console.log(oldSize)
//         sizeMultiplier = 2;
//     } else {
//         oldSize = sizeMultiplier;
//         sizeMultiplier = 3;
//         console.log(oldSize)
//     }
// };



const player1 = new Player({
    gravity: 0.3,
    imageSrc: `./sprites/player1/GamePlayer1IdleRight_PNG${sizeMultiplier}.png`,
    frameRate: 178,
    animations: {
        idleRight: {
            frameRate: 178,
            frameBuffer: 2,
            frameLoop: 0,
            frameStart: 0,
            changeSprite: true,
            loop: true,
            imageSrc: `./sprites/player1/GamePlayer1IdleRight_PNG${sizeMultiplier}.png`
        },
        idleLeft: {
            frameRate: 43,
            frameBuffer: 2,
            frameLoop: 0,
            frameStart: 0,
            changeSprite: true,
            loop: true,
            imageSrc: `./sprites/player1/GamePlayer1IdleLeft_PNG${sizeMultiplier}.png`
        },
        runRight: {
            frameRate: 14,
            frameBuffer: 2,
            frameLoop: 0,
            frameStart: 0,
            changeSprite: true,
            loop: true,
            imageSrc: `./sprites/player1/GamePlayer1RunRight_PNG${sizeMultiplier}.png`
        },
        runLeft: {
            frameRate: 14,
            frameBuffer: 2,
            frameLoop: 0,
            frameStart: 0,
            changeSprite: true,
            loop: true,
            imageSrc: `./sprites/player1/GamePlayer1RunLeft_PNG${sizeMultiplier}.png`
        },
        jumpRight: {
            frameRate: 1,
            frameBuffer: 2,
            frameLoop: 0,
            frameStart: 0,
            changeSprite: true,
            loop: true,
            imageSrc: `./sprites/player1/GamePlayer1JumpRight_PNG${sizeMultiplier}.png`
        },
        jumpLeft: {
            frameRate: 1,
            frameBuffer: 2,
            frameLoop: 0,
            frameStart: 0,
            changeSprite: true,
            loop: true,
            imageSrc: `./sprites/player1/GamePlayer1JumpLeft_PNG${sizeMultiplier}.png`
        },
        fallRight: {
            frameRate: 1,
            frameBuffer: 2,
            frameLoop: 0,
            frameStart: 0,
            changeSprite: true,
            loop: true,
            imageSrc: `./sprites/player1/GamePlayer1FallRight_PNG${sizeMultiplier}.png`
        },
        fallLeft: {
            frameRate: 1,
            frameBuffer: 2,
            frameLoop: 0,
            frameStart: 0,
            changeSprite: true,
            loop: true,
            imageSrc: `./sprites/player1/GamePlayer1FallLeft_PNG${sizeMultiplier}.png`
        },
        dashRight: {
            frameRate: 1,
            frameBuffer: 2,
            frameLoop: 0,
            frameStart: 0,
            changeSprite: true,
            loop: true,
            imageSrc: `./sprites/player1/GamePlayer1DashRight_PNG${sizeMultiplier}.png`
        },
        dashLeft: {
            frameRate: 1,
            frameBuffer: 2,
            frameLoop: 0,
            frameStart: 0,
            changeSprite: true,
            loop: true,
            imageSrc: `./sprites/player1/GamePlayer1DashLeft_PNG${sizeMultiplier}.png`
        },
        doorRight: {
            frameRate: 19,
            frameBuffer: 2,
            frameLoop: 18,
            frameStart: 0,
            changeSprite: true,
            loop: false,
            imageSrc: `./sprites/player1/GamePlayer1DoorRight_PNG${sizeMultiplier}.png`,
            onComplete: () => {
                console.log(`sex`);
                gsap.to(overlay, {
                    opacity: 1,
                    duration: 0.35,
                    onComplete: () => {
                        level++;
                        if (level > 13) level = 1;
                        levels[level].init();
                        player.imageSrc = `./sprites/player1/GamePlayer1IdleRight_PNG${sizeMultiplier}.png`;
                        player.preventInput = false;
                        player.currentAnimation.isActive = false;
                        gsap.to(overlay, {
                            opacity: 0,
                            duration: 0.35
                        })
                    }
                }) 
            },
        },
        doorLeft: {
            frameRate: 19,
            frameBuffer: 2,
            frameLoop: 18,
            frameStart: 0,
            changeSprite: true,
            loop: false,
            imageSrc: `./sprites/player1/GamePlayer1DoorLeft_PNG${sizeMultiplier}.png`,
            onComplete: () => {
                console.log(`sex`);
                gsap.to(overlay, {
                    opacity: 1,
                    duration: 0.35,
                    onComplete: () => {
                        level++;
                        if (level > 13) level = 1;
                        levels[level].init();
                        player.imageSrc = `./sprites/player1/GamePlayer1IdleLeft_PNG${sizeMultiplier}.png`;
                        player.preventInput = false;
                        player.currentAnimation.isActive = false;
                        gsap.to(overlay, {
                            opacity: 0,
                            duration: 0.35
                        })
                    }
                }) 
            },
        },
        death: {
            frameRate: 1,
            frameBuffer: 2,
            frameLoop: 0,
            frameStart: 0,
            changeSprite: true,
            loop: false,
            imageSrc: `./sprites/player1/GamePlayer1Death_PNG${sizeMultiplier}.png`,
            onComplete: () => {
                console.log(`sex`);
                gsap.to(overlay, {
                    opacity: 1,
                    duration: 0.35,
                    onComplete: () => {
                        levels[level].init();
                        if (player.lastDirection === `left`) player.imageSrc = `./sprites/player1/GamePlayer1IdleLeft_PNG${sizeMultiplier}.png`;
                        else player.imageSrc = `./sprites/player1/GamePlayer1IdleRight_PNG${sizeMultiplier}.png`;
                        player.preventInput = false;
                        player.currentAnimation.isActive = false;
                        gsap.to(overlay, {
                            opacity: 0,
                            duration: 0.35
                        })
                    }
                }) 
            },
        },
        finalRight: {
            frameRate: 3,
            frameBuffer: 2,
            frameLoop: 2,
            frameStart: 0,
            changeSprite: true,
            loop: false,
            imageSrc: `./sprites/player1/GamePlayer1FinalRight_PNG${sizeMultiplier}.png`,
            onComplete: () => {
                stopTimer();
                finale = true;
                gsap.to(overlay, {
                    opacity: 1,
                    duration: 2.5,
                    onComplete: () => {
                        level++;
                        if (level > 13) level = 1;
                        levels[level].init();
                        player.imageSrc = ``;
                        player.preventInput = false;
                        player.currentAnimation.isActive = false;
                        gsap.to(overlay, {
                            opacity: 0,
                            duration: 2.5,
                            onComplete: () => {
                                finale = false;
                                finalDoor = false;
                                player1.preventInput = true;
                            }
                        })
                    }
                }) 
            },
        },
        finalLeft: {
            frameRate: 3,
            frameBuffer: 2,
            frameLoop: 2,
            frameStart: 0,
            changeSprite: true,
            loop: false,
            imageSrc: `./sprites/player1/GamePlayer1FinalLeft_PNG${sizeMultiplier}.png`,
            onComplete: () => {
                stopTimer();
                finale = true;
                gsap.to(overlay, {
                    opacity: 1,
                    duration: 2.5,
                    onComplete: () => {
                        level++;
                        if (level > 13) level = 1;
                        levels[level].init();
                        player.imageSrc = ``;
                        player.preventInput = false;
                        player.currentAnimation.isActive = false;
                        gsap.to(overlay, {
                            opacity: 0,
                            duration: 2.5,
                            onComplete: () => {
                                finale = false;
                                finalDoor = false;
                                player.preventInput = true;
                            }
                        })
                    }
                }) 
            },
        },
    }
});


const player2 = new Player({
    gravity: 0.26,
    imageSrc: `./sprites/player1/GamePlayer1IdleRight_PNG${sizeMultiplier}.png`,
    frameRate: 178,
    animations: {
        idleRight: {
            frameRate: 178,
            frameBuffer: 2,
            frameLoop: 0,
            frameStart: 0,
            changeSprite: true,
            loop: true,
            imageSrc: `./sprites/player1/GamePlayer1IdleRight_PNG${sizeMultiplier}.png`
        },
        idleLeft: {
            frameRate: 43,
            frameBuffer: 2,
            frameLoop: 0,
            frameStart: 0,
            changeSprite: true,
            loop: true,
            imageSrc: `./sprites/player1/GamePlayer1IdleLeft_PNG${sizeMultiplier}.png`
        },
        runRight: {
            frameRate: 14,
            frameBuffer: 2,
            frameLoop: 0,
            frameStart: 0,
            changeSprite: true,
            loop: true,
            imageSrc: `./sprites/player1/GamePlayer1RunRight_PNG${sizeMultiplier}.png`
        },
        runLeft: {
            frameRate: 14,
            frameBuffer: 2,
            frameLoop: 0,
            frameStart: 0,
            changeSprite: true,
            loop: true,
            imageSrc: `./sprites/player1/GamePlayer1RunLeft_PNG${sizeMultiplier}.png`
        },
        jumpRight: {
            frameRate: 1,
            frameBuffer: 2,
            frameLoop: 0,
            frameStart: 0,
            changeSprite: true,
            loop: true,
            imageSrc: `./sprites/player1/GamePlayer1JumpRight_PNG${sizeMultiplier}.png`
        },
        jumpLeft: {
            frameRate: 1,
            frameBuffer: 2,
            frameLoop: 0,
            frameStart: 0,
            changeSprite: true,
            loop: true,
            imageSrc: `./sprites/player1/GamePlayer1JumpLeft_PNG${sizeMultiplier}.png`
        },
        fallRight: {
            frameRate: 1,
            frameBuffer: 2,
            frameLoop: 0,
            frameStart: 0,
            changeSprite: true,
            loop: true,
            imageSrc: `./sprites/player1/GamePlayer1FallRight_PNG${sizeMultiplier}.png`
        },
        fallLeft: {
            frameRate: 1,
            frameBuffer: 2,
            frameLoop: 0,
            frameStart: 0,
            changeSprite: true,
            loop: true,
            imageSrc: `./sprites/player1/GamePlayer1FallLeft_PNG${sizeMultiplier}.png`
        },
        dashRight: {
            frameRate: 1,
            frameBuffer: 2,
            frameLoop: 0,
            frameStart: 0,
            changeSprite: true,
            loop: true,
            imageSrc: `./sprites/player1/GamePlayer1DashRight_PNG${sizeMultiplier}.png`
        },
        dashLeft: {
            frameRate: 1,
            frameBuffer: 2,
            frameLoop: 0,
            frameStart: 0,
            changeSprite: true,
            loop: true,
            imageSrc: `./sprites/player1/GamePlayer1DashLeft_PNG${sizeMultiplier}.png`
        },
        doorRight: {
            frameRate: 19,
            frameBuffer: 2,
            frameLoop: 18,
            frameStart: 0,
            changeSprite: true,
            loop: false,
            imageSrc: `./sprites/player1/GamePlayer1DoorRight_PNG${sizeMultiplier}.png`,
            onComplete: () => {
                console.log(`sex`);
                gsap.to(overlay, {
                    opacity: 1,
                    duration: 0.35,
                    onComplete: () => {
                        level++;
                        if (level > 13) level = 1;
                        levels[level].init();
                        player.imageSrc = `./sprites/player1/GamePlayer1IdleRight_PNG${sizeMultiplier}.png`;
                        player.preventInput = false;
                        player.currentAnimation.isActive = false;
                        gsap.to(overlay, {
                            opacity: 0,
                            duration: 0.35
                        })
                    }
                }) 
            },
        },
        doorLeft: {
            frameRate: 19,
            frameBuffer: 2,
            frameLoop: 18,
            frameStart: 0,
            changeSprite: true,
            loop: false,
            imageSrc: `./sprites/player1/GamePlayer1DoorLeft_PNG${sizeMultiplier}.png`,
            onComplete: () => {
                console.log(`sex`);
                gsap.to(overlay, {
                    opacity: 1,
                    duration: 0.35,
                    onComplete: () => {
                        level++;
                        if (level > 13) level = 1;
                        levels[level].init();
                        player.imageSrc = `./sprites/player1/GamePlayer1IdleLeft_PNG${sizeMultiplier}.png`;
                        player.preventInput = false;
                        player.currentAnimation.isActive = false;
                        gsap.to(overlay, {
                            opacity: 0,
                            duration: 0.35
                        })
                    }
                }) 
            },
        },
        death: {
            frameRate: 1,
            frameBuffer: 2,
            frameLoop: 0,
            frameStart: 0,
            changeSprite: true,
            loop: false,
            imageSrc: `./sprites/player1/GamePlayer1Death_PNG${sizeMultiplier}.png`,
            onComplete: () => {
                console.log(`sex`);
                gsap.to(overlay, {
                    opacity: 1,
                    duration: 0.35,
                    onComplete: () => {
                        levels[level].init();
                        if (player.lastDirection === `left`) player.imageSrc = `./sprites/player1/GamePlayer1IdleLeft_PNG${sizeMultiplier}.png`;
                        else player.imageSrc = `./sprites/player1/GamePlayer1IdleRight_PNG${sizeMultiplier}.png`;
                        player.preventInput = false;
                        player.currentAnimation.isActive = false;
                        gsap.to(overlay, {
                            opacity: 0,
                            duration: 0.35
                        })
                    }
                }) 
            },
        },
        finalRight: {
            frameRate: 3,
            frameBuffer: 2,
            frameLoop: 2,
            frameStart: 0,
            changeSprite: true,
            loop: false,
            imageSrc: `./sprites/player1/GamePlayer1FinalRight_PNG${sizeMultiplier}.png`,
            onComplete: () => {
                stopTimer();
                finale = true;
                gsap.to(overlay, {
                    opacity: 1,
                    duration: 2.5,
                    onComplete: () => {
                        level++;
                        if (level > 13) level = 1;
                        levels[level].init();
                        player.imageSrc = ``;
                        player.preventInput = false;
                        player.currentAnimation.isActive = false;
                        gsap.to(overlay, {
                            opacity: 0,
                            duration: 2.5,
                            onComplete: () => {
                                finale = false;
                                finalDoor = false;
                                player1.preventInput = true;
                            }
                        })
                    }
                }) 
            },
        },
        finalLeft: {
            frameRate: 3,
            frameBuffer: 2,
            frameLoop: 2,
            frameStart: 0,
            changeSprite: true,
            loop: false,
            imageSrc: `./sprites/player1/GamePlayer1FinalLeft_PNG${sizeMultiplier}.png`,
            onComplete: () => {
                stopTimer();
                finale = true;
                gsap.to(overlay, {
                    opacity: 1,
                    duration: 2.5,
                    onComplete: () => {
                        level++;
                        if (level > 13) level = 1;
                        levels[level].init();
                        player.imageSrc = ``;
                        player.preventInput = false;
                        player.currentAnimation.isActive = false;
                        gsap.to(overlay, {
                            opacity: 0,
                            duration: 2.5,
                            onComplete: () => {
                                finale = false;
                                finalDoor = false;
                                player.preventInput = true;
                            }
                        })
                    }
                }) 
            },
        },
    }
});


const player3 = new Player({
    gravity: 0.28,
    imageSrc: `./sprites/player1/GamePlayer1IdleRight_PNG${sizeMultiplier}.png`,
    frameRate: 178,
    animations: {
        idleRight: {
            frameRate: 178,
            frameBuffer: 2,
            frameLoop: 0,
            frameStart: 0,
            changeSprite: true,
            loop: true,
            imageSrc: `./sprites/player1/GamePlayer1IdleRight_PNG${sizeMultiplier}.png`
        },
        idleLeft: {
            frameRate: 43,
            frameBuffer: 2,
            frameLoop: 0,
            frameStart: 0,
            changeSprite: true,
            loop: true,
            imageSrc: `./sprites/player1/GamePlayer1IdleLeft_PNG${sizeMultiplier}.png`
        },
        runRight: {
            frameRate: 14,
            frameBuffer: 2,
            frameLoop: 0,
            frameStart: 0,
            changeSprite: true,
            loop: true,
            imageSrc: `./sprites/player1/GamePlayer1RunRight_PNG${sizeMultiplier}.png`
        },
        runLeft: {
            frameRate: 14,
            frameBuffer: 2,
            frameLoop: 0,
            frameStart: 0,
            changeSprite: true,
            loop: true,
            imageSrc: `./sprites/player1/GamePlayer1RunLeft_PNG${sizeMultiplier}.png`
        },
        jumpRight: {
            frameRate: 1,
            frameBuffer: 2,
            frameLoop: 0,
            frameStart: 0,
            changeSprite: true,
            loop: true,
            imageSrc: `./sprites/player1/GamePlayer1JumpRight_PNG${sizeMultiplier}.png`
        },
        jumpLeft: {
            frameRate: 1,
            frameBuffer: 2,
            frameLoop: 0,
            frameStart: 0,
            changeSprite: true,
            loop: true,
            imageSrc: `./sprites/player1/GamePlayer1JumpLeft_PNG${sizeMultiplier}.png`
        },
        fallRight: {
            frameRate: 1,
            frameBuffer: 2,
            frameLoop: 0,
            frameStart: 0,
            changeSprite: true,
            loop: true,
            imageSrc: `./sprites/player1/GamePlayer1FallRight_PNG${sizeMultiplier}.png`
        },
        fallLeft: {
            frameRate: 1,
            frameBuffer: 2,
            frameLoop: 0,
            frameStart: 0,
            changeSprite: true,
            loop: true,
            imageSrc: `./sprites/player1/GamePlayer1FallLeft_PNG${sizeMultiplier}.png`
        },
        dashRight: {
            frameRate: 1,
            frameBuffer: 2,
            frameLoop: 0,
            frameStart: 0,
            changeSprite: true,
            loop: true,
            imageSrc: `./sprites/player1/GamePlayer1DashRight_PNG${sizeMultiplier}.png`
        },
        dashLeft: {
            frameRate: 1,
            frameBuffer: 2,
            frameLoop: 0,
            frameStart: 0,
            changeSprite: true,
            loop: true,
            imageSrc: `./sprites/player1/GamePlayer1DashLeft_PNG${sizeMultiplier}.png`
        },
        wallRight: {
            frameRate: 1,
            frameBuffer: 2,
            frameLoop: 0,
            frameStart: 0,
            changeSprite: true,
            loop: true,
            imageSrc: `./sprites/player1/GamePlayer1WallRight_PNG${sizeMultiplier}.png`
        },
        wallLeft: {
            frameRate: 1,
            frameBuffer: 2,
            frameLoop: 0,
            frameStart: 0,
            changeSprite: true,
            loop: true,
            imageSrc: `./sprites/player1/GamePlayer1WallLeft_PNG${sizeMultiplier}.png`
        },
        doorRight: {
            frameRate: 19,
            frameBuffer: 2,
            frameLoop: 18,
            frameStart: 0,
            changeSprite: true,
            loop: false,
            imageSrc: `./sprites/player1/GamePlayer1DoorRight_PNG${sizeMultiplier}.png`,
            onComplete: () => {
                console.log(`sex`);
                gsap.to(overlay, {
                    opacity: 1,
                    duration: 0.35,
                    onComplete: () => {
                        level++;
                        if (level > 13) level = 1;
                        levels[level].init();
                        player.imageSrc = `./sprites/player1/GamePlayer1IdleRight_PNG${sizeMultiplier}.png`;
                        player.preventInput = false;
                        player.currentAnimation.isActive = false;
                        gsap.to(overlay, {
                            opacity: 0,
                            duration: 0.35
                        })
                    }
                }) 
            },
        },
        doorLeft: {
            frameRate: 19,
            frameBuffer: 2,
            frameLoop: 18,
            frameStart: 0,
            changeSprite: true,
            loop: false,
            imageSrc: `./sprites/player1/GamePlayer1DoorLeft_PNG${sizeMultiplier}.png`,
            onComplete: () => {
                console.log(`sex`);
                gsap.to(overlay, {
                    opacity: 1,
                    duration: 0.35,
                    onComplete: () => {
                        level++;
                        if (level > 13) level = 1;
                        levels[level].init();
                        player.imageSrc = `./sprites/player1/GamePlayer1IdleLeft_PNG${sizeMultiplier}.png`;
                        player.preventInput = false;
                        player.currentAnimation.isActive = false;
                        gsap.to(overlay, {
                            opacity: 0,
                            duration: 0.35
                        })
                    }
                }) 
            },
        },
        death: {
            frameRate: 1,
            frameBuffer: 2,
            frameLoop: 0,
            frameStart: 0,
            changeSprite: true,
            loop: false,
            imageSrc: `./sprites/player1/GamePlayer1Death_PNG${sizeMultiplier}.png`,
            onComplete: () => {
                console.log(`sex`);
                gsap.to(overlay, {
                    opacity: 1,
                    duration: 0.35,
                    onComplete: () => {
                        levels[level].init();
                        if (player.lastDirection === `left`) player.imageSrc = `./sprites/player1/GamePlayer1IdleLeft_PNG${sizeMultiplier}.png`;
                        else player.imageSrc = `./sprites/player1/GamePlayer1IdleRight_PNG${sizeMultiplier}.png`;
                        player.preventInput = false;
                        player.currentAnimation.isActive = false;
                        gsap.to(overlay, {
                            opacity: 0,
                            duration: 0.35
                        })
                    }
                }) 
            },
        },
        finalRight: {
            frameRate: 3,
            frameBuffer: 2,
            frameLoop: 2,
            frameStart: 0,
            changeSprite: true,
            loop: false,
            imageSrc: `./sprites/player1/GamePlayer1FinalRight_PNG${sizeMultiplier}.png`,
            onComplete: () => {
                stopTimer();
                finale = true;
                gsap.to(overlay, {
                    opacity: 1,
                    duration: 2.5,
                    onComplete: () => {
                        level++;
                        if (level > 13) level = 1;
                        levels[level].init();
                        player.imageSrc = ``;
                        player.preventInput = false;
                        player.currentAnimation.isActive = false;
                        gsap.to(overlay, {
                            opacity: 0,
                            duration: 2.5,
                            onComplete: () => {
                                finale = false;
                                finalDoor = false;
                                player1.preventInput = true;
                            }
                        })
                    }
                }) 
            },
        },
        finalLeft: {
            frameRate: 3,
            frameBuffer: 2,
            frameLoop: 2,
            frameStart: 0,
            changeSprite: true,
            loop: false,
            imageSrc: `./sprites/player1/GamePlayer1FinalLeft_PNG${sizeMultiplier}.png`,
            onComplete: () => {
                stopTimer();
                finale = true;
                gsap.to(overlay, {
                    opacity: 1,
                    duration: 2.5,
                    onComplete: () => {
                        level++;
                        if (level > 13) level = 1;
                        levels[level].init();
                        player.imageSrc = ``;
                        player.preventInput = false;
                        player.currentAnimation.isActive = false;
                        gsap.to(overlay, {
                            opacity: 0,
                            duration: 2.5,
                            onComplete: () => {
                                finale = false;
                                finalDoor = false;
                                player.preventInput = true;
                            }
                        })
                    }
                }) 
            },
        },
    }
});



let level = 1;
let levels = {
    1: {
        init: () => {
            parsedCollisions = collisionsLevel1.parse2D();
            parsedSpikes = spikesLevel1.parse2D();
            collisionBlocks = parsedCollisions.createObjectsFrom2D();
            spikeBlocks = parsedSpikes.createObjectsFrom2D();
            player.collisionBlocks = collisionBlocks;
            player.spikeBlocks = spikeBlocks;
            vEffects.collisionBlocks = collisionBlocks;
            finalDoor = false;

            player.position = {
                x: 5*16*sizeMultiplier,
                y: 22*16*sizeMultiplier-0.0000001
            }

            backgroundLevel = new Sprite({
                position: {
                    x: 0,
                    y: 0,
                },
                imageSrc: `./sprites/backgrounds/Level1BG${sizeMultiplier}.png`,
            })
            doors = [
                new Sprite({
                    position: {
                        x: 11*16*sizeMultiplier,
                        y: 14*16*sizeMultiplier,
                    },
                    imageSrc: `./sprites/objects/Door_PNG${sizeMultiplier}.png`,
                    frameRate: 1,
                }),
            ]
        }
    },

    2: {
        init: () => {
            parsedCollisions = collisionsLevel2.parse2D();
            parsedSpikes = spikesLevel2.parse2D();
            collisionBlocks = parsedCollisions.createObjectsFrom2D();
            spikeBlocks = parsedSpikes.createObjectsFrom2D();
            player.collisionBlocks = collisionBlocks;
            player.spikeBlocks = spikeBlocks;
            vEffects.collisionBlocks = collisionBlocks;

            player.position = {
                x: 6*16*sizeMultiplier,
                y: 21*16*sizeMultiplier-0.0000001
            }

            backgroundLevel = new Sprite({
                position: {
                    x: 0,
                    y: 0,
                },
                imageSrc: `./sprites/backgrounds/Level2B${playerNumber}G${sizeMultiplier}.png`,
            })
            doors = [
                new Sprite({
                    position: {
                        x: 6*16*sizeMultiplier,
                        y: 10*16*sizeMultiplier,
                    },
                    imageSrc: `./sprites/objects/Door_PNG${sizeMultiplier}.png`,
                    frameRate: 1,
                }),
            ]
        }
    },

    3: {
        init: () => {
            parsedCollisions = collisionsLevel3.parse2D();
            parsedSpikes = spikesLevel3.parse2D();
            collisionBlocks = parsedCollisions.createObjectsFrom2D();
            spikeBlocks = parsedSpikes.createObjectsFrom2D();
            player.collisionBlocks = collisionBlocks;
            player.spikeBlocks = spikeBlocks;
            vEffects.collisionBlocks = collisionBlocks;

            player.position = {
                x: 41*16*sizeMultiplier,
                y: 22*16*sizeMultiplier-0.0000001
            }

            backgroundLevel = new Sprite({
                position: {
                    x: 0,
                    y: 0,
                },
                imageSrc: `./sprites/backgrounds/Level3BG${sizeMultiplier}.png`,
            })
            doors = [
                new Sprite({
                    position: {
                        x: 12*16*sizeMultiplier,
                        y: 5*16*sizeMultiplier,
                    },
                    imageSrc: `./sprites/objects/Door_PNG${sizeMultiplier}.png`,
                    frameRate: 1,
                }),
            ]
        }
    },

    4: {
        init: () => {
            parsedCollisions = collisionsLevel4.parse2D();
            parsedSpikes = spikesLevel4.parse2D();
            collisionBlocks = parsedCollisions.createObjectsFrom2D();
            spikeBlocks = parsedSpikes.createObjectsFrom2D();
            player.collisionBlocks = collisionBlocks;
            player.spikeBlocks = spikeBlocks;
            vEffects.collisionBlocks = collisionBlocks;

            player.position = {
                x: 3*16*sizeMultiplier,
                y: 3*16*sizeMultiplier-0.0000001
            }

            backgroundLevel = new Sprite({
                position: {
                    x: 0,
                    y: 0,
                },
                imageSrc: `./sprites/backgrounds/Level4BG${sizeMultiplier}.png`,
            })
            doors = [
                new Sprite({
                    position: {
                        x: 28*16*sizeMultiplier,
                        y: 3*16*sizeMultiplier,
                    },
                    imageSrc: `./sprites/objects/Door_PNG${sizeMultiplier}.png`,
                    frameRate: 1,
                }),
            ]
        }
    },

    5: {
        init: () => {
            parsedCollisions = collisionsLevel5.parse2D();
            parsedSpikes = spikesLevel5.parse2D();
            collisionBlocks = parsedCollisions.createObjectsFrom2D();
            spikeBlocks = parsedSpikes.createObjectsFrom2D();
            player.collisionBlocks = collisionBlocks;
            player.spikeBlocks = spikeBlocks;
            vEffects.collisionBlocks = collisionBlocks;

            player.position = {
                x: 41*16*sizeMultiplier,
                y: 5*16*sizeMultiplier-0.0000001
            }

            backgroundLevel = new Sprite({
                position: {
                    x: 0,
                    y: 0,
                },
                imageSrc: `./sprites/backgrounds/Level5BG${sizeMultiplier}.png`,
            })
            doors = [
                new Sprite({
                    position: {
                        x: 5*16*sizeMultiplier,
                        y: 5*16*sizeMultiplier,
                    },
                    imageSrc: `./sprites/objects/Door_PNG${sizeMultiplier}.png`,
                    frameRate: 1,
                }),
            ]
        }
    },

    6: {
        init: () => {
            parsedCollisions = collisionsLevel6.parse2D();
            parsedSpikes = spikesLevel6.parse2D();
            collisionBlocks = parsedCollisions.createObjectsFrom2D();
            spikeBlocks = parsedSpikes.createObjectsFrom2D();
            player.collisionBlocks = collisionBlocks;
            player.spikeBlocks = spikeBlocks;
            vEffects.collisionBlocks = collisionBlocks;

            player.position = {
                x: 5*16*sizeMultiplier,
                y: 4*16*sizeMultiplier-0.0000001
            }

            backgroundLevel = new Sprite({
                position: {
                    x: 0,
                    y: 0,
                },
                imageSrc: `./sprites/backgrounds/Level6BG${sizeMultiplier}.png`,
            })
            doors = [
                new Sprite({
                    position: {
                        x: 4*16*sizeMultiplier,
                        y: 21*16*sizeMultiplier,
                    },
                    imageSrc: `./sprites/objects/Door_PNG${sizeMultiplier}.png`,
                    frameRate: 1,
                }),
            ]
        }
    },

    7: {
        init: () => {
            parsedCollisions = collisionsLevel7.parse2D();
            parsedSpikes = spikesLevel7.parse2D();
            collisionBlocks = parsedCollisions.createObjectsFrom2D();
            spikeBlocks = parsedSpikes.createObjectsFrom2D();
            player.collisionBlocks = collisionBlocks;
            player.spikeBlocks = spikeBlocks;
            vEffects.collisionBlocks = collisionBlocks;

            player.position = {
                x: 4*16*sizeMultiplier,
                y: 21*16*sizeMultiplier-0.0000001
            }

            backgroundLevel = new Sprite({
                position: {
                    x: 0,
                    y: 0,
                },
                imageSrc: `./sprites/backgrounds/Level7BG${sizeMultiplier}.png`,
            })
            doors = [
                new Sprite({
                    position: {
                        x: 24*16*sizeMultiplier,
                        y: 21*16*sizeMultiplier,
                    },
                    imageSrc: `./sprites/objects/Door_PNG${sizeMultiplier}.png`,
                    frameRate: 1,
                }),
            ]
        }
    },

    8: {
        init: () => {
            parsedCollisions = collisionsLevel6.parse2D();
            parsedSpikes = spikesLevel6.parse2D();
            collisionBlocks = parsedCollisions.createObjectsFrom2D();
            spikeBlocks = parsedSpikes.createObjectsFrom2D();
            player.collisionBlocks = collisionBlocks;
            player.spikeBlocks = spikeBlocks;
            vEffects.collisionBlocks = collisionBlocks;

            player.position = {
                x: 24*16*sizeMultiplier,
                y: 21*16*sizeMultiplier-0.0000001
            }

            backgroundLevel = new Sprite({
                position: {
                    x: 0,
                    y: 0,
                },
                imageSrc: `./sprites/backgrounds/Level6BG${sizeMultiplier}.png`,
            })
            doors = [
                new Sprite({
                    position: {
                        x: 22*16*sizeMultiplier,
                        y: 4*16*sizeMultiplier,
                    },
                    imageSrc: `./sprites/objects/Door_PNG${sizeMultiplier}.png`,
                    frameRate: 1,
                }),
            ]
        }
    },

    9: {
        init: () => {
            parsedCollisions = collisionsLevel7.parse2D();
            parsedSpikes = spikesLevel7.parse2D();
            collisionBlocks = parsedCollisions.createObjectsFrom2D();
            spikeBlocks = parsedSpikes.createObjectsFrom2D();
            player.collisionBlocks = collisionBlocks;
            player.spikeBlocks = spikeBlocks;
            vEffects.collisionBlocks = collisionBlocks;

            player.position = {
                x: 22*16*sizeMultiplier,
                y: 4*16*sizeMultiplier-0.0000001
            }

            backgroundLevel = new Sprite({
                position: {
                    x: 0,
                    y: 0,
                },
                imageSrc: `./sprites/backgrounds/Level7BG${sizeMultiplier}.png`,
            })
            doors = [
                new Sprite({
                    position: {
                        x: 41*16*sizeMultiplier,
                        y: 4*16*sizeMultiplier,
                    },
                    imageSrc: `./sprites/objects/Door_PNG${sizeMultiplier}.png`,
                    frameRate: 1,
                }),
            ]
        }
    },

    10: {
        init: () => {
            parsedCollisions = collisionsLevel6.parse2D();
            parsedSpikes = spikesLevel6.parse2D();
            collisionBlocks = parsedCollisions.createObjectsFrom2D();
            spikeBlocks = parsedSpikes.createObjectsFrom2D();
            player.collisionBlocks = collisionBlocks;
            player.spikeBlocks = spikeBlocks;
            vEffects.collisionBlocks = collisionBlocks;

            player.position = {
                x: 41*16*sizeMultiplier,
                y: 4*16*sizeMultiplier-0.0000001
            }

            backgroundLevel = new Sprite({
                position: {
                    x: 0,
                    y: 0,
                },
                imageSrc: `./sprites/backgrounds/Level6BG${sizeMultiplier}.png`,
            })
            doors = [
                new Sprite({
                    position: {
                        x: 42*16*sizeMultiplier,
                        y: 21*16*sizeMultiplier,
                    },
                    imageSrc: `./sprites/objects/Door_PNG${sizeMultiplier}.png`,
                    frameRate: 1,
                }),
            ]
        }
    },

    11: {
        init: () => {
            parsedCollisions = collisionsLevel8.parse2D();
            parsedSpikes = spikesLevel8.parse2D();
            collisionBlocks = parsedCollisions.createObjectsFrom2D();
            spikeBlocks = parsedSpikes.createObjectsFrom2D();
            player.collisionBlocks = collisionBlocks;
            player.spikeBlocks = spikeBlocks;
            vEffects.collisionBlocks = collisionBlocks;

            player.position = {
                x: 41*16*sizeMultiplier,
                y: 19*16*sizeMultiplier-0.0000001
            }

            backgroundLevel = new Sprite({
                position: {
                    x: 0,
                    y: 0,
                },
                imageSrc: `./sprites/backgrounds/Level8BG${sizeMultiplier}.png`,
            })
            doors = [
                new Sprite({
                    position: {
                        x: 3*16*sizeMultiplier,
                        y: 19*16*sizeMultiplier,
                    },
                    imageSrc: `./sprites/objects/Door_PNG${sizeMultiplier}.png`,
                    frameRate: 1,
                }),
            ]
        }
    },

    12: {
        init: () => {
            parsedCollisions = collisionsLevel9.parse2D();
            parsedSpikes = spikesLevel9.parse2D();
            collisionBlocks = parsedCollisions.createObjectsFrom2D();
            spikeBlocks = parsedSpikes.createObjectsFrom2D();
            player.collisionBlocks = collisionBlocks;
            player.spikeBlocks = spikeBlocks;
            vEffects.collisionBlocks = collisionBlocks;
            finalDoor = true;

            player.position = {
                x: 23*16*sizeMultiplier,
                y: 22*16*sizeMultiplier-0.0000001
            }

            backgroundLevel = new Sprite({
                position: {
                    x: 0,
                    y: 0,
                },
                imageSrc: `./sprites/backgrounds/Level9BG${sizeMultiplier}.png`,
            })
            doors = [
                new Sprite({
                    position: {
                        x: 23*16*sizeMultiplier,
                        y: 3*16*sizeMultiplier,
                    },
                    imageSrc: `./sprites/objects/WhiteDoor_PNG${sizeMultiplier}.png`,
                    frameRate: 1,
                }),
            ]
        }
    },

    13: {
        init: () => {
            parsedCollisions = collisionsLevel9.parse2D();
            parsedSpikes = spikesLevel1.parse2D();
            collisionBlocks = parsedCollisions.createObjectsFrom2D();
            spikeBlocks = parsedSpikes.createObjectsFrom2D();
            player.collisionBlocks = collisionBlocks;
            player.spikeBlocks = spikeBlocks;
            vEffects.collisionBlocks = collisionBlocks;
            finalDoor = false;

            player.position = {
                x: 48*16*sizeMultiplier,
                y: 48*16*sizeMultiplier-0.0000001
            }

            backgroundLevel = new Sprite({
                position: {
                    x: 0,
                    y: 0,
                },
                imageSrc: `./sprites/backgrounds/GameFinalBackground1_PNG${sizeMultiplier}.png`,
            })
            doors = [
                new Sprite({
                    position: {
                        x: 48*16*sizeMultiplier,
                        y: 48*16*sizeMultiplier,
                    },
                    imageSrc: `./sprites/objects/WhiteDoor_PNG${sizeMultiplier}.png`,
                    frameRate: 1,
                }),
            ]
        }
    },
};

// imageSrc: `./sprites/backgrounds/GameFinalBackground1_PNG${sizeMultiplier}.png`,

const overlay = {
    opacity: 1,
};

const vEffects = new Player({
    position: {
        x: 0,
        y: 0
    },
    gravity: 0,
    imageSrc: `./sprites/objects/Jump_PNG${sizeMultiplier}.png`,
    frameRate: 5,
    animations: {
        groundDashRight: {
            frameRate: 5,
            frameBuffer: 2,
            frameLoop: 4,
            frameStart: 0,
            changeSprite: false,
            loop: false,
            imageSrc: `./sprites/objects/GroundDashRight_PNG${sizeMultiplier}.png`
        },
        groundDashLeft: {
            frameRate: 5,
            frameBuffer: 2,
            frameLoop: 4,
            frameStart: 0,
            changeSprite: false,
            loop: false,
            imageSrc: `./sprites/objects/GroundDashLeft_PNG${sizeMultiplier}.png`
        },
        airDashRight: {
            frameRate: 5,
            frameBuffer: 2,
            frameLoop: 4,
            frameStart: 0,
            changeSprite: false,
            loop: false,
            imageSrc: `./sprites/objects/AirDashRight_PNG${sizeMultiplier}.png`
        },
        airDashLeft: {
            frameRate: 5,
            frameBuffer: 2,
            frameLoop: 4,
            frameStart: 0,
            changeSprite: false,
            loop: false,
            imageSrc: `./sprites/objects/AirDashLeft_PNG${sizeMultiplier}.png`
        },
        specialDashRightnone: {
            frameRate: 5,
            frameBuffer: 2,
            frameLoop: 4,
            frameStart: 0,
            changeSprite: false,
            loop: false,
            imageSrc: `./sprites/objects/SpecialDashRight_PNG${sizeMultiplier}.png`
        },
        specialDashLeftnone: {
            frameRate: 5,
            frameBuffer: 2,
            frameLoop: 4,
            frameStart: 0,
            changeSprite: false,
            loop: false,
            imageSrc: `./sprites/objects/SpecialDashLeft_PNG${sizeMultiplier}.png`
        },
        specialDashRightdown: {
            frameRate: 5,
            frameBuffer: 2,
            frameLoop: 4,
            frameStart: 0,
            changeSprite: false,
            loop: false,
            imageSrc: `./sprites/objects/SpecialDashRightDown_PNG${sizeMultiplier}.png`
        },
        specialDashLeftdown: {
            frameRate: 5,
            frameBuffer: 2,
            frameLoop: 4,
            frameStart: 0,
            changeSprite: false,
            loop: false,
            imageSrc: `./sprites/objects/SpecialDashLeftDown_PNG${sizeMultiplier}.png`
        },
        specialDashRightup: {
            frameRate: 5,
            frameBuffer: 2,
            frameLoop: 4,
            frameStart: 0,
            changeSprite: false,
            loop: false,
            imageSrc: `./sprites/objects/SpecialDashRightUp_PNG${sizeMultiplier}.png`
        },
        specialDashLeftup: {
            frameRate: 5,
            frameBuffer: 2,
            frameLoop: 4,
            frameStart: 0,
            changeSprite: false,
            loop: false,
            imageSrc: `./sprites/objects/SpecialDashLeftUp_PNG${sizeMultiplier}.png`
        },
        jump: {
            frameRate: 5,
            frameBuffer: 2,
            frameLoop: 4,
            frameStart: 0,
            changeSprite: false,
            loop: false,
            imageSrc: `./sprites/objects/Jump_PNG${sizeMultiplier}.png`
        },
    }
});

vEffects.width = 11*sizeMultiplier;
vEffects.height = 16*sizeMultiplier;


const keys = {
    up: {
        pressed: false,
    },
    left: {
        pressed: false,
    },
    right: {
        pressed: false,
    },
    down: {
        pressed: false,
    },
    jump: {
        pressed: false,
    },
    dash: {
        pressed: false,
    },
    q: {
        pressed: false,
    },
    w: {
        pressed: false,
    },
    e: {
        pressed: false,
    },
};

function animate1() {
    if (stopAnimate) {
        return;
    }
    window.requestAnimationFrame(animate1);

    backgroundLevel.draw();
    collisionBlocks.forEach(collisionBlock => {
        collisionBlock.draw();
    })
    spikeBlocks.forEach(spikeBlock => {
        spikeBlock.draw();
    })
    doors.forEach(door => {
        door.draw();
    })

    if (player.spikecollision) {
        player.spikecollision = false;
        player.preventInput = true;
        player.switchSprite(`death`);
    }

    if (keys.jump.pressed && player.ycollision && !player.preventInput) {
        for (let i = 0; i < doors.length; i++) {
            const door = doors[i];
            if (player.hitbox.position.x + player.hitbox.width <= door.position.x + door.width &&
                player.hitbox.position.x >= door.position.x &&
                player.hitbox.position.y + player.hitbox.height >= door.position.y &&
                player.hitbox.position.y <= door.position.y + door.height) {
                    keys.jump.pressed = false;
                    player.preventInput = true;
                    if (finalDoor) {
                        if (player.lastDirection === `left`) {
                            player.switchSprite(`finalLeft`);
                        } else player.switchSprite(`finalRight`)
                    }
                    else {
                        if (player.lastDirection === `left`) {
                            player.switchSprite(`doorLeft`);
                        } else player.switchSprite(`doorRight`)
                    }
                }
        }
    }

    if (player.preventInput) {
        keys.jump.pressed = false;
        keys.dash.pressed = false;
        keys.left.pressed = false;
        keys.right.pressed = false;
        keys.down.pressed = false;
        keys.up.pressed = false;
        keys.q.pressed = false;
        keys.w.pressed = false;
        keys.e.pressed = false;
        player.ycollision = true;
        player.dash.is = false;
        player.velocity.x = 0;
        player.velocity.y = 0;   
    }

    if (keys.dash.pressed && player.dash.can === true && player.dash.is === false && !player.xcollision) {
        if (player.lastDirection === undefined) {
            player.lastDirection = `right`;
        }
        if (player.lastUpDown === undefined) {
            player.lastUpDown = `none`;
        }
        player.dash.can = false;
        player.dash.is = true;
        if (player.lastDirection === `left`) {
            if (player.ycollision) {
                vEffects.position.x = player.position.x + (15*sizeMultiplier);
                vEffects.position.y = player.hitbox.position.y - player.hitbox.height*2;
                vEffects.velocity.y = 0;
                vEffects.switchSprite(`groundDashLeft`);
            } else {
                vEffects.position.x = player.position.x + (15*sizeMultiplier);
                vEffects.position.y = player.position.y + (player.hitbox.height);
                vEffects.velocity.y = 0;
                vEffects.switchSprite(`airDashLeft`);
            }
        } else if (player.lastDirection === `right`) {
            if (player.ycollision) {
                vEffects.position.x = player.position.x - (15*sizeMultiplier);
                vEffects.position.y = player.hitbox.position.y - player.hitbox.height*2;
                vEffects.velocity.y = 0;
                vEffects.switchSprite(`groundDashRight`);
            } else {
                vEffects.position.x = player.position.x - (15*sizeMultiplier);
                vEffects.position.y = player.position.y + (player.hitbox.height);
                vEffects.velocity.y = 0;
                vEffects.switchSprite(`airDashRight`);
            }
        }
        clearTimeout(player.timeoutHandle);
        player.timeoutHandle = setTimeout(() => {
            if (player.dash.is === true) {
                player.dash.is = false;
                if (!player.ycollision && keys.dash.pressed) {
                    player.velocity.y += -5.5*sizeMultiplier;
                    vEffects.position.x = player.hitbox.position.x - player.hitbox.width + 2*sizeMultiplier;
                    vEffects.position.y = player.hitbox.position.y - player.hitbox.height*2;
                    vEffects.velocity.y = 0.00001;
                    vEffects.switchSprite(`jump`);
                };
                keys.dash.pressed = false;
            };
            if (player.ycollision) player.ycollision = false;
        }, 225);
    }
    
    if (!keys.right.pressed && !keys.left.pressed && !player.dash.is) {
        player.velocity.x = 0;
    }

    if (!keys.down.pressed || player.ycollision || player.dash.is) {
        player.fastfall = 1*sizeMultiplier;
    }

    if (keys.right.pressed && !player.dash.is) {
        if (keys.left.pressed) {
            if (player.lastDirection === `right` && player.ycollision === true) {
                player.switchSprite(`idleRight`);
            } else if (player.lastDirection === `left` && player.ycollision === true) player.switchSprite(`idleLeft`);
            player.velocity.x = 0;
        } else { 
            if (player.ycollision === true) player.switchSprite(`runRight`);
            else if (player.velocity.y < 0) player.switchSprite(`jumpRight`);
            else if (player.velocity.y >= 0) player.switchSprite(`fallRight`);
            player.velocity.x += 1*sizeMultiplier;
            player.lastDirection = `right`;
        };
    } else if (keys.left.pressed && !player.dash.is) {
        if (player.ycollision === true) player.switchSprite(`runLeft`);
        else if (player.velocity.y < 0) player.switchSprite(`jumpLeft`);
        else if (player.velocity.y >= 0) player.switchSprite(`fallLeft`);
        player.velocity.x += -1*sizeMultiplier;
        player.lastDirection = `left`;
    } else if (!player.preventInput) {
        if (player.lastDirection === `left` ) player.switchSprite(`idleLeft`);
        else player.switchSprite(`idleRight`);
    }
    
    if (keys.jump.pressed && player.ycollision === true && !player.dash.is) {
        player.velocity.y = -5*sizeMultiplier;
        player.ycollision = false;
        vEffects.position.x = player.hitbox.position.x - player.hitbox.width + 2*sizeMultiplier;
        vEffects.position.y = player.hitbox.position.y - player.hitbox.height*2;
        vEffects.velocity.y = 0.00001;
        vEffects.switchSprite(`jump`);
    }

    if (player.velocity.y < 0 && player.ycollision === false && !player.dash.is) {
        if (player.lastDirection === undefined) {
            player.lastDirection = `right`;
        }
        if (player.lastUpDown === undefined) {
            player.lastUpDown = `none`;
        }
        if (player.lastDirection === `left`) player.switchSprite(`jumpLeft`);
        else if (player.lastDirection === `right`) player.switchSprite(`jumpRight`);
    }

    if (player.velocity.y >= 0 && player.ycollision === false && !player.dash.is) {
        if (player.lastDirection === `left`) player.switchSprite(`fallLeft`);
        else if (player.lastDirection === `right`) player.switchSprite(`fallRight`);
    }

    if (keys.down.pressed && !keys.jump.pressed && player.ycollision === false && !player.dash.is) {
        player.fastfall = 3*sizeMultiplier;
        player.lastUpDown = `down`;
    }

    if (keys.up.pressed && !player.dash.is) {
        player.lastUpDown = `up`;
    }

    if (!keys.down.pressed && !keys.up.pressed && !player.dash.is) {
        player.lastUpDown = `none`;
    }

    if (player.velocity.x > 2.5*sizeMultiplier && !player.dash.is) {
        player.velocity.x = 2.5*sizeMultiplier;
    }

    if (player.velocity.x < -2.5*sizeMultiplier && !player.dash.is) {
        player.velocity.x = -2.5*sizeMultiplier;
    }

    if (player.dash.is && player.xcollision) {
        player.dash.is = false;
        player.ycollision = false;
    }

    if (player.dash.is) {
        if (player.lastDirection === `left`) {
            player.switchSprite(`dashLeft`);
            player.velocity.x = -5*sizeMultiplier;
            player.velocity.y = 0;
        } else if (player.lastDirection === `right`) {
            player.switchSprite(`dashRight`);
            player.velocity.x = 5*sizeMultiplier;
            player.velocity.y = 0;
        }
    }
    
    vEffects.update();
    vEffects.draw();
    player.draw();
    player.update();

    c.save();
    c.globalAlpha = overlay.opacity;
    if (finale) c.fillStyle = `#ffffff`
    else c.fillStyle = `#12101e`;
    c.fillRect(0,0,canvas.width,canvas.height);
    c.restore();
}


    // if (keys.jump.pressed) {
    //     window.cancelAnimationFrame(keys.jump.pressed);
    //     keys.jump.pressed = false;
    // }
    // else {
    //     window.requestAnimationFrame(animate1);
    // }
        // if (keys.jump.pressed) {
    //     window.cancelAnimationFrame(keys.jump.pressed);
    //     keys.jump.pressed = false;
    // }
    // else {
    //     window.requestAnimationFrame(animate1);
    // }
        // if (keys.jump.pressed) {
    //     window.cancelAnimationFrame(keys.jump.pressed);
    //     keys.jump.pressed = false;
    // }
    // else {
    //     window.requestAnimationFrame(animate1);
    // }

        // if (keys.jump.pressed) {
    //     window.cancelAnimationFrame(keys.jump.pressed);
    //     keys.jump.pressed = false;
    // }
    // else {
    //     window.requestAnimationFrame(animate1);
    // }
        // if (keys.jump.pressed) {
    //     window.cancelAnimationFrame(keys.jump.pressed);
    //     keys.jump.pressed = false;
    // }
    // else {
    //     window.requestAnimationFrame(animate1);
    // }
        // if (keys.jump.pressed) {
    //     window.cancelAnimationFrame(keys.jump.pressed);
    //     keys.jump.pressed = false;
    // }
    // else {
    //     window.requestAnimationFrame(animate1);
    // }


function animate2() {
    if (stopAnimate) {
        return;
    }
    window.requestAnimationFrame(animate2);

    backgroundLevel.draw();
    collisionBlocks.forEach(collisionBlock => {
        collisionBlock.draw();
    })
    spikeBlocks.forEach(spikeBlock => {
        spikeBlock.draw();
    })
    doors.forEach(door => {
        door.draw();
    })

    if (player.spikecollision) {
        player.spikecollision = false;
        player.preventInput = true;
        player.switchSprite(`death`);
    }

    if (keys.jump.pressed && player.ycollision && !player.preventInput) {
        for (let i = 0; i < doors.length; i++) {
            const door = doors[i];
            if (player.hitbox.position.x + player.hitbox.width <= door.position.x + door.width &&
                player.hitbox.position.x >= door.position.x &&
                player.hitbox.position.y + player.hitbox.height >= door.position.y &&
                player.hitbox.position.y <= door.position.y + door.height) {
                    keys.jump.pressed = false;
                    player.preventInput = true;
                    if (finalDoor) {
                        if (player.lastDirection === `left`) {
                            player.switchSprite(`finalLeft`);
                        } else player.switchSprite(`finalRight`)
                    }
                    else {
                        if (player.lastDirection === `left`) {
                            player.switchSprite(`doorLeft`);
                        } else player.switchSprite(`doorRight`)
                    }
                }
        }
    }

    if (player.preventInput) {
        keys.jump.pressed = false;
        keys.dash.pressed = false;
        keys.left.pressed = false;
        keys.right.pressed = false;
        keys.down.pressed = false;
        keys.up.pressed = false;
        keys.q.pressed = false;
        keys.w.pressed = false;
        keys.e.pressed = false;
        player.ycollision = true;
        player.dash.is = false;
        player.velocity.x = 0;
        player.velocity.y = 0;   
    }

    if (keys.dash.pressed && player.dash.can === true && player.dash.is === false && !player.xcollision) {
        if (player.lastDirection === undefined) {
            player.lastDirection = `right`;
        }
        if (player.lastUpDown === undefined) {
            player.lastUpDown = `none`;
        }
        player.dash.can = false;
        player.dash.is = true;
        player.ycollision = false;
        if (player.lastDirection === `left`) {
            vEffects.position.x = player.position.x + (15*sizeMultiplier);
            vEffects.position.y = player.position.y + (player.hitbox.height);
            vEffects.velocity.y = 0;
            vEffects.switchSprite(`specialDashLeft${player.lastUpDown}`);
        } else if (player.lastDirection === `right`) {
            vEffects.position.x = player.position.x - (15*sizeMultiplier);
            vEffects.position.y = player.position.y + (player.hitbox.height);
            vEffects.velocity.y = 0;
            vEffects.switchSprite(`specialDashRight${player.lastUpDown}`);
        }
        clearTimeout(player.timeoutHandle);
        player.timeoutHandle = setTimeout(() => {
            if (player.dash.is === true) {
                player.dash.is = false;
                keys.dash.pressed = false;
            };
            if (player.ycollision) player.ycollision = false;
        }, 200);
    }
    
    if (!keys.right.pressed && !keys.left.pressed && !player.dash.is) {
        player.velocity.x = 0;
    }

    if (!keys.down.pressed || player.ycollision || player.dash.is) {
        player.fastfall = 1*sizeMultiplier;
    }

    if (keys.right.pressed && !player.dash.is) {
        if (keys.left.pressed) {
            if (player.lastDirection === `right` && player.ycollision === true) {
                player.switchSprite(`idleRight`);
            } else if (player.lastDirection === `left` && player.ycollision === true) player.switchSprite(`idleLeft`);
            player.velocity.x = 0;
        } else { 
            if (player.ycollision === true) player.switchSprite(`runRight`);
            else if (player.velocity.y < 0) player.switchSprite(`jumpRight`);
            else if (player.velocity.y >= 0) player.switchSprite(`fallRight`);
            player.velocity.x += 1*sizeMultiplier;
            player.lastDirection = `right`;
        };
    } else if (keys.left.pressed && !player.dash.is) {
        if (player.ycollision === true) player.switchSprite(`runLeft`);
        else if (player.velocity.y < 0) player.switchSprite(`jumpLeft`);
        else if (player.velocity.y >= 0) player.switchSprite(`fallLeft`);
        player.velocity.x += -1*sizeMultiplier;
        player.lastDirection = `left`;
    } else if (!player.preventInput) {
        if (player.lastDirection === `left` ) player.switchSprite(`idleLeft`);
        else player.switchSprite(`idleRight`);
    }
    
    if (keys.jump.pressed && player.ycollision === true && !player.dash.is) {
        player.velocity.y = -5*sizeMultiplier;
        player.ycollision = false;
        vEffects.position.x = player.hitbox.position.x - player.hitbox.width + 2*sizeMultiplier;
        vEffects.position.y = player.hitbox.position.y - player.hitbox.height*2;
        vEffects.velocity.y = 0.00001;
        vEffects.switchSprite(`jump`);
    }

    if (player.velocity.y < 0 && player.ycollision === false && !player.dash.is) {
        if (player.lastDirection === undefined) {
            player.lastDirection = `right`;
        }
        if (player.lastUpDown === undefined) {
            player.lastUpDown = `none`;
        }
        if (player.lastDirection === `left`) player.switchSprite(`jumpLeft`);
        else if (player.lastDirection === `right`) player.switchSprite(`jumpRight`);
    }

    if (player.velocity.y >= 0 && player.ycollision === false && !player.dash.is) {
        if (player.lastDirection === `left`) player.switchSprite(`fallLeft`);
        else if (player.lastDirection === `right`) player.switchSprite(`fallRight`);
    }

    if (keys.down.pressed && !keys.jump.pressed && player.ycollision === false && !player.dash.is) {
        player.fastfall = 3*sizeMultiplier;
        player.lastUpDown = `down`;
    }

    if (keys.up.pressed && !player.dash.is) {
        player.lastUpDown = `up`;
    }

    if (!keys.down.pressed && !keys.up.pressed && !player.dash.is) {
        player.lastUpDown = `none`;
    }

    if (player.velocity.x > 2.25*sizeMultiplier && !player.dash.is) {
        player.velocity.x = 2.25*sizeMultiplier;
    }

    if (player.velocity.x < -2.25*sizeMultiplier && !player.dash.is) {
        player.velocity.x = -2.25*sizeMultiplier;
    }

    if (player.dash.is && player.xcollision) {
        player.dash.is = false;
        player.ycollision = false;
    }

    if (player.dash.is && player.ycollision) {
        player.dash.is = false;
    }
    
    if (player.dash.is && player.roofcollision) {
        player.dash.is = false;
    }


    if (player.dash.is) {
        if (player.lastDirection === `left`) {
            player.switchSprite(`dashLeft`);
            if (player.lastUpDown === `up`) {
                player.velocity.y = -3*sizeMultiplier;
                player.velocity.x = -3*sizeMultiplier;
            } else if (player.lastUpDown === `down`) {
                player.velocity.y = 3*sizeMultiplier;
                player.velocity.x = -3*sizeMultiplier;
            } else {
                player.velocity.y = 0;
                player.velocity.x = -4*sizeMultiplier;
            }
        } else if (player.lastDirection === `right`) {
            player.switchSprite(`dashRight`);
            if (player.lastUpDown === `up`) {
                player.velocity.y = -3*sizeMultiplier;
                player.velocity.x = 3*sizeMultiplier;
            } else if (player.lastUpDown === `down`) {
                player.velocity.y = 3*sizeMultiplier;
                player.velocity.x = 3*sizeMultiplier;
            } else {
                player.velocity.y = 0;
                player.velocity.x = 4*sizeMultiplier;
            }
        }
    }
    
    vEffects.update();
    vEffects.draw();
    player.draw();
    player.update();

    c.save();
    c.globalAlpha = overlay.opacity;
    if (finale) c.fillStyle = `#ffffff`
    else c.fillStyle = `#12101e`;
    c.fillRect(0,0,canvas.width,canvas.height);
    c.restore();
}

    // if (keys.jump.pressed) {
    //     window.cancelAnimationFrame(keys.jump.pressed);
    //     keys.jump.pressed = false;
    // }
    // else {
    //     window.requestAnimationFrame(animate1);
    // }
        // if (keys.jump.pressed) {
    //     window.cancelAnimationFrame(keys.jump.pressed);
    //     keys.jump.pressed = false;
    // }
    // else {
    //     window.requestAnimationFrame(animate1);
    // }
        // if (keys.jump.pressed) {
    //     window.cancelAnimationFrame(keys.jump.pressed);
    //     keys.jump.pressed = false;
    // }
    // else {
    //     window.requestAnimationFrame(animate1);
    // }

    function animate3() {
        if (stopAnimate) {
            return;
        }
        window.requestAnimationFrame(animate3);
    
        backgroundLevel.draw();
        collisionBlocks.forEach(collisionBlock => {
            collisionBlock.draw();
        })
        spikeBlocks.forEach(spikeBlock => {
            spikeBlock.draw();
        })
        doors.forEach(door => {
            door.draw();
        })
    
        if (player.spikecollision) {
            player.spikecollision = false;
            player.preventInput = true;
            player.switchSprite(`death`);
        }
    
        if (keys.jump.pressed && player.ycollision && !player.preventInput) {
            for (let i = 0; i < doors.length; i++) {
                const door = doors[i];
                if (player.hitbox.position.x + player.hitbox.width <= door.position.x + door.width &&
                    player.hitbox.position.x >= door.position.x &&
                    player.hitbox.position.y + player.hitbox.height >= door.position.y &&
                    player.hitbox.position.y <= door.position.y + door.height) {
                        keys.jump.pressed = false;
                        player.preventInput = true;
                        if (finalDoor) {
                            if (player.lastDirection === `left`) {
                                player.switchSprite(`finalLeft`);
                            } else player.switchSprite(`finalRight`)
                        }
                        else {
                            if (player.lastDirection === `left`) {
                                player.switchSprite(`doorLeft`);
                            } else player.switchSprite(`doorRight`)
                        }
                    }
            }
        }
    
        if (player.preventInput) {
            keys.jump.pressed = false;
            keys.dash.pressed = false;
            keys.left.pressed = false;
            keys.right.pressed = false;
            keys.down.pressed = false;
            keys.up.pressed = false;
            keys.q.pressed = false;
            keys.w.pressed = false;
            keys.e.pressed = false;
            player.ycollision = true;
            player.dash.is = false;
            player.velocity.x = 0;
            player.velocity.y = 0;   
        }

        if (player.xcollision && !player.ycollision) {
            if (player.lastDirection === `left`) player.switchSprite(`wallLeft`);
            else if (player.lastDirection === `right`) player.switchSprite(`wallRight`);
            if (player.velocity.y <= 0.25) player.velocity.y += 0.2;
            else player.velocity.y += -0.25;
            player.dash.can = true;
        }

        if (keys.dash.pressed && !keys.down.pressed && player.dash.can === true && player.dash.is === false && player.xcollision && !player.ycollision) {
            if (player.lastDirection === undefined) {
                player.lastDirection = `right`;
            }
            if (player.lastUpDown === undefined) {
                player.lastUpDown = `none`;
            }
            player.dash.can = false;
            player.dash.is = true;
            player.ycollision = false;
            player.xcollision = false;
            if (player.lastDirection === `right`) {
                vEffects.position.x = player.position.x + (15*sizeMultiplier);
                vEffects.position.y = player.position.y + (player.hitbox.height);
                vEffects.velocity.y = 0;
                vEffects.switchSprite(`specialDashLeft${player.lastUpDown}`);
            } else if (player.lastDirection === `left`) {
                vEffects.position.x = player.position.x - (15*sizeMultiplier);
                vEffects.position.y = player.position.y + (player.hitbox.height);
                vEffects.velocity.y = 0;
                vEffects.switchSprite(`specialDashRight${player.lastUpDown}`);
            }
            clearTimeout(player.timeoutHandle);
            player.timeoutHandle = setTimeout(() => {
                if (player.dash.is === true) {
                    player.dash.is = false;
                    keys.dash.pressed = false;
                };
                if (player.ycollision) player.ycollision = false;
            }, 100);
        }
        
        if (!keys.right.pressed && !keys.left.pressed && !player.dash.is) {
            player.velocity.x = 0;
        }
    
        if (!keys.down.pressed || player.ycollision || player.dash.is) {
            player.fastfall = 1*sizeMultiplier;
        }
    
        if (keys.right.pressed && !player.dash.is) {
            if (keys.left.pressed) {
                if (player.lastDirection === `right` && player.ycollision === true) {
                    player.switchSprite(`idleRight`);
                } else if (player.lastDirection === `left` && player.ycollision === true) player.switchSprite(`idleLeft`);
                player.velocity.x = 0;
            } else { 
                if (player.ycollision === true) player.switchSprite(`runRight`);
                else if (player.velocity.y < 0 && !player.xcollision) player.switchSprite(`jumpRight`);
                else if (player.velocity.y >= 0 && !player.xcollision) player.switchSprite(`fallRight`);
                player.velocity.x += 1*sizeMultiplier;
                player.lastDirection = `right`;
            };
        } else if (keys.left.pressed && !player.dash.is) {
            if (player.ycollision === true) player.switchSprite(`runLeft`);
            else if (player.velocity.y < 0 && !player.xcollision) player.switchSprite(`jumpLeft`);
            else if (player.velocity.y >= 0 && !player.xcollision) player.switchSprite(`fallLeft`);
            player.velocity.x += -1*sizeMultiplier;
            player.lastDirection = `left`;
        } else if (!player.preventInput) {
            if (player.lastDirection === `left` ) player.switchSprite(`idleLeft`);
            else player.switchSprite(`idleRight`);
        }
        
        if (keys.jump.pressed && player.ycollision === true && !player.dash.is) {
            player.velocity.y = -5.5*sizeMultiplier;
            player.ycollision = false;
            vEffects.position.x = player.hitbox.position.x - player.hitbox.width + 2*sizeMultiplier;
            vEffects.position.y = player.hitbox.position.y - player.hitbox.height*2;
            vEffects.velocity.y = 0.00001;
            vEffects.switchSprite(`jump`);
        }
    
        if (player.velocity.y < 0 && player.ycollision === false && !player.xcollision && !player.dash.is) {
            if (player.lastDirection === undefined) {
                player.lastDirection = `right`;
            }
            if (player.lastUpDown === undefined) {
                player.lastUpDown = `none`;
            }
            if (player.lastDirection === `left`) player.switchSprite(`jumpLeft`);
            else if (player.lastDirection === `right`) player.switchSprite(`jumpRight`);
        }
    
        if (player.velocity.y >= 0 && player.ycollision === false && !player.xcollision && !player.dash.is) {
            if (player.lastDirection === `left`) player.switchSprite(`fallLeft`);
            else if (player.lastDirection === `right`) player.switchSprite(`fallRight`);
        }
    
        if (keys.down.pressed && !keys.jump.pressed && player.ycollision === false && !player.dash.is) {
            player.fastfall = 3*sizeMultiplier;
            player.lastUpDown = `down`;
        }
    
        if (keys.up.pressed && !player.dash.is) {
            player.lastUpDown = `up`;
        }
    
        if (!keys.down.pressed && !keys.up.pressed && !player.dash.is) {
            player.lastUpDown = `none`;
        }
    
        if (player.velocity.x > 2.65*sizeMultiplier && !player.dash.is) {
            player.velocity.x = 2.65*sizeMultiplier;
        }
    
        if (player.velocity.x < -2.65*sizeMultiplier && !player.dash.is) {
            player.velocity.x = -2.65*sizeMultiplier;
        }
    
        if (player.dash.is && player.xcollision) {
            player.dash.is = false;
            player.ycollision = false;
        }
    
        if (player.dash.is && player.ycollision) {
            player.dash.is = false;
        }
        
        if (player.dash.is && player.roofcollision) {
            player.dash.is = false;
        }
    
    
        if (player.dash.is) {
            if (player.lastDirection === `left`) {
                player.switchSprite(`jumpRight`);
                player.velocity.x = 2.65*sizeMultiplier;
                player.velocity.y = -4*sizeMultiplier;
            } else if (player.lastDirection === `right`) {
                player.switchSprite(`jumpLeft`);
                player.velocity.x = -2.65*sizeMultiplier;
                player.velocity.y = -4*sizeMultiplier;
            }
        }
        
        vEffects.update();
        vEffects.draw();
        player.draw();
        player.update();
    
        c.save();
        c.globalAlpha = overlay.opacity;
        if (finale) c.fillStyle = `#ffffff`
        else c.fillStyle = `#12101e`;
        c.fillRect(0,0,canvas.width,canvas.height);
        c.restore();
    }

        // if (keys.jump.pressed) {
    //     window.cancelAnimationFrame(keys.jump.pressed);
    //     keys.jump.pressed = false;
    // }
    // else {
    //     window.requestAnimationFrame(animate1);
    // }
        // if (keys.jump.pressed) {
    //     window.cancelAnimationFrame(keys.jump.pressed);
    //     keys.jump.pressed = false;
    // }
    // else {
    //     window.requestAnimationFrame(animate1);
    // }
        // if (keys.jump.pressed) {
    //     window.cancelAnimationFrame(keys.jump.pressed);
    //     keys.jump.pressed = false;
    // }
    // else {
    //     window.requestAnimationFrame(animate1);
    // }

function mainMenu() {
    if (stopMainMenu) {
        stopMainMenu = false;
        gsap.to(choice, {
            y: -1500,
            ease: `back.in(1.1)`,
            duration: 0.75,
        });
        gsap.to(timeContainer, {
            opacity: 1,
            ease: `power4.out`,
            duration: 0.75,
        });
        gsap.to(fullscreenButton, {
            opacity: 1,
            ease: `power4.out`,
            duration: 0.75,
        });
        fullscreenButton.style.pointerEvents = `auto`;
        return;
    }
    window.requestAnimationFrame(mainMenu);
    if (keys.q.pressed) {
        playerNumber = 1;
        player = player1;
        level = 1;
        levels[level].init();
        animate1();
        gsap.to(overlay, {
           opacity: 0,
           duration: 0.35,
        });
        startTimer();
        stopMainMenu = true;
    }

    if (keys.w.pressed) {
        playerNumber = 2;
        player = player2;
        level = 1;
        levels[level].init();
        animate2();
        gsap.to(overlay, {
           opacity: 0,
           duration: 0.35,
        });
        startTimer();
        stopMainMenu = true;
    }

    if (keys.e.pressed) {
        playerNumber = 3;
        player = player3;
        level = 1;
        levels[level].init();
        animate3();
        gsap.to(overlay, {
           opacity: 0,
           duration: 0.35,
        });
        startTimer();
        stopMainMenu = true;
    }
}

let minute = 0o0; 
let second = 0o0; 
let count = 0o0; 
  
function startTimer() { 
    timer = true; 
    stopWatch(); 
}; 
  
function stopTimer() { 
    timer = false; 
}; 
  
function resetTimer() { 
    timer = false; 
    minute = 0; 
    second = 0; 
    count = 0; 
    document.getElementById(`min`).innerHTML = `00`; 
    document.getElementById(`sec`).innerHTML = `00`; 
    document.getElementById(`count`).innerHTML = `00`; 
}; 
  
function stopWatch() { 
    if (timer) { 
        count++; 
        if (count == 75) { 
            second++; 
            count = 0; 
        } 
        if (second == 60) { 
            minute++; 
            second = 0; 
        } 
        if (minute == 60) { 
            hour++; 
            minute = 0; 
            second = 0; 
        }

        let minString = minute; 
        let secString = second; 
        let countString = count; 

        if (minute < 10) { 
            minString = `0` + minString; 
        }
        if (second < 10) { 
            secString = `0` + secString; 
        }
        if (count < 10) { 
            countString = `0` + countString; 
        }
        document.getElementById(`min`).innerHTML = minString; 
        document.getElementById(`sec`).innerHTML = secString; 
        document.getElementById(`count`).innerHTML = countString; 
        setTimeout(stopWatch, 10); 
    } else {
        document.getElementById(`min`).style.color = `#33df33`;
        document.getElementById(`sec`).style.color = `#33df33`;
        document.getElementById(`count`).style.color = `#33df33`;
        document.getElementById(`text1`).style.color = `#559a55`;
        document.getElementById(`text2`).style.color = `#559a55`;
        return;
    }
}

mainMenu();