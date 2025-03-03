class Player extends Sprite {
    constructor({
        collisionBlocks = [],
        spikeBlocks = [],
        gravity = 1.25,
        imageSrc = ``,
        frameRate = 1,
        animations
    }) {
        super({
            imageSrc,
            frameRate,
            animations
        });
        this.position = {
            x: 80*sizeMultiplier,
            y: 120*sizeMultiplier
        }

        this.velocity = {
            x: 0,
            y: 0,
        }

        this.width = 16*sizeMultiplier;
        this.height = 16*sizeMultiplier; 
        this.sides = {
            bottom: this.position.y + this.height
        }
        this.fastfall = 1;
        this.gravitymultiplier = gravity;
        this.gravity = this.gravitymultiplier * this.fastfall * sizeMultiplier;

        this.dash = {
            can: false,
            is: false
        }

        this.ycollision = true;
        this.xcollision = false;
        this.spikecollision = false;

        this.timeoutHandle;
        this.xtimeoutHandle;

        this.collisionBlocks = collisionBlocks;
        this.spikeBlocks = spikeBlocks;
    }



    update() {
        // blue :333c
        // c.fillStyle = `rgba(0,0,255,0.4)`
        
        this.position.x += this.velocity.x;

        this.updateHitbox();

        this.checkForHorizontalSpikesCollisions();
        // check horiz coll
        this.checkForHorizontalCollisions();

        this.applyGravity();

        this.updateHitbox();

        this.checkForVerticalSpikesCollisions();

        this.checkForVerticalCollisions();
        
        // c.fillRect(this.position.x, this.position.y, this.width, this.height)

        // c.fillRect(
        //     this.hitbox.position.x,
        //     this.hitbox.position.y,
        //     this.hitbox.width,
        //     this.hitbox.height
        // )
    }

    
    checkForHorizontalCollisions() {
        for (let i = 0; i < this.collisionBlocks.length; i++) {
            const collisionBlock = this.collisionBlocks[i];
            if (this.hitbox.position.x <= collisionBlock.position.x + collisionBlock.width &&
                this.hitbox.position.x + this.hitbox.width >= collisionBlock.position.x &&
                this.hitbox.position.y + this.hitbox.height >= collisionBlock.position.y &&
                this.hitbox.position.y <= collisionBlock.position.y + collisionBlock.height) {
                    if (this.velocity.x < 0) { // x axis coll to the left
                        this.xcollision = true;
                        clearTimeout(this.xtimeoutHandle);
                        this.xtimeoutHandle = setTimeout(() => {
                            this.xcollision = false;
                        }, 50)
                        if (player.dash.is) {
                            player.dash.is = false;
                            player.dash.can = false;
                            player.ycollision = false;
                            setTimeout(() => {
                                if (!player.dash.can && !player.dash.is && player.ycollision) player.dash.can = true;
                            }, 100)
                        }
                        const offset = this.hitbox.position.x - this.position.x;
                        this.position.x = collisionBlock.position.x + collisionBlock.width - offset + 0.0001;
                        break;
                    }
                    if (this.velocity.x > 0) {
                        this.xcollision = true;
                        clearTimeout(this.xtimeoutHandle);
                        this.xtimeoutHandle = setTimeout(() => {
                            this.xcollision = false;
                        }, 50)
                        if (player.dash.is) {
                            player.dash.is = false;
                            player.dash.can = false;
                            player.ycollision = false;
                            setTimeout(() => {
                                if (!player.dash.can && !player.dash.is && player.ycollision) player.dash.can = true;
                            }, 100)
                        }
                        const offset = this.hitbox.position.x - this.position.x + this.hitbox.width;
                        this.position.x = collisionBlock.position.x - offset - 0.0001;
                        break;
                    }
                }
            }
    }

    checkForHorizontalSpikesCollisions() {
        for (let i = 0; i < this.spikeBlocks.length; i++) {
            const spikeBlock = this.spikeBlocks[i];
            if (this.hitbox.position.x <= spikeBlock.position.x + spikeBlock.width &&
                this.hitbox.position.x + this.hitbox.width >= spikeBlock.position.x &&
                this.hitbox.position.y + this.hitbox.height >= spikeBlock.position.y &&
                this.hitbox.position.y <= spikeBlock.position.y + spikeBlock.height) {
                    if (this.velocity.x < 0) {
                        player.spikecollision = true;
                        if (player.dash.is) {
                            player.dash.is = false;
                            player.dash.can = false;
                            player.ycollision = false;
                            setTimeout(() => {
                                if (!player.dash.can && !player.dash.is && player.ycollision) player.dash.can = true;
                            }, 100)
                        }
                        const offset = this.hitbox.position.x - this.position.x;
                        this.position.x = spikeBlock.position.x + spikeBlock.width - offset + 0.0001;
                        break;
                    }
                    if (this.velocity.x > 0) {
                        player.spikecollision = true;
                        if (player.dash.is) {
                            player.dash.is = false;
                            player.dash.can = false;
                            player.ycollision = false;
                            setTimeout(() => {
                                if (!player.dash.can && !player.dash.is && player.ycollision) player.dash.can = true;
                            }, 100)
                        }
                        const offset = this.hitbox.position.x - this.position.x + this.hitbox.width;
                        this.position.x = spikeBlock.position.x - offset - 0.0001;
                        break;
                    }
                }
            }
    }
    
    checkForVerticalCollisions() {
        for (let i = 0; i < this.collisionBlocks.length; i++) {
            const collisionBlock = this.collisionBlocks[i];
            if (this.hitbox.position.x <= collisionBlock.position.x + collisionBlock.width &&
                this.hitbox.position.x + this.hitbox.width >= collisionBlock.position.x &&
                this.hitbox.position.y + this.hitbox.height >= collisionBlock.position.y &&
                this.hitbox.position.y <= collisionBlock.position.y + collisionBlock.height) {
                    if (this.velocity.y < 0) {
                        this.velocity.y = 0;
                        this.roofcollision = true;
                        const offset = this.hitbox.position.y - this.position.y;
                        clearTimeout(this.timeoutHandle);
                            this.timeoutHandle = setTimeout(() => {
                                if (this.roofcollision === true) this.roofcollision = false;
                            }, 10)
                        this.position.y = collisionBlock.position.y + collisionBlock.height - offset + 0.0001;
                        break;
                    }
                    if (this.velocity.y > 0) {
                        this.velocity.y = 0;
                        this.fastfall = 1;
                        this.ycollision = true;
                        this.dash.can = true;
                        const offset = this.hitbox.position.y - this.position.y + this.hitbox.height;
                        clearTimeout(this.timeoutHandle);
                            this.timeoutHandle = setTimeout(() => {
                                if (this.ycollision === true) this.ycollision = false;
                            }, 100)
                        this.position.y = collisionBlock.position.y - offset - 0.0001;
                        break;
                    }
                }
            }
    }

    checkForVerticalSpikesCollisions() {
        for (let i = 0; i < this.spikeBlocks.length; i++) {
            const spikeBlock = this.spikeBlocks[i];
            if (this.hitbox.position.x <= spikeBlock.position.x + spikeBlock.width &&
                this.hitbox.position.x + this.hitbox.width >= spikeBlock.position.x &&
                this.hitbox.position.y + this.hitbox.height >= spikeBlock.position.y &&
                this.hitbox.position.y <= spikeBlock.position.y + spikeBlock.height) {
                    if (this.velocity.y < 0) {
                        player.spikecollision = true;
                        this.velocity.y = 0;
                        const offset = this.hitbox.position.y - this.position.y;
                        this.position.y = spikeBlock.position.y + spikeBlock.height - offset + 0.0001;
                        break;
                    }
                    if (this.velocity.y > 0) {
                        player.spikecollision = true;
                        this.velocity.y = 0;
                        this.fastfall = 1;
                        this.ycollision = true;
                        this.dash.can = true;
                        const offset = this.hitbox.position.y - this.position.y + this.hitbox.height;
                        clearTimeout(this.timeoutHandle);
                            this.timeoutHandle = setTimeout(() => {
                                if (this.ycollision === true) this.ycollision = false;
                            }, 100)
                        this.position.y = spikeBlock.position.y - offset - 0.0001;
                        break;
                    }
                }
            }
    }

    switchSprite(name) {
        if (this.image === this.animations[name].image && this.animations[name].changeSprite === true) return;
        this.currentFrame = this.animations[name].frameStart;
        this.image = this.animations[name].image;
        this.frameRate = this.animations[name].frameRate;
        this.frameBuffer = this.animations[name].frameBuffer;
        this.frameLoop = this.animations[name].frameLoop;
        this.currentAnimation = this.animations[name];
    }

    updateHitbox() {
        this.hitbox = {
            position: {
                x: this.position.x + 10 *sizeMultiplier,
                y: this.position.y + 32 *sizeMultiplier
            },
            width: 12*sizeMultiplier,
            height: 16*sizeMultiplier,
        }
    }
    
    applyGravity() {
        this.position.y += this.velocity.y;
        this.gravity = this.gravitymultiplier * this.fastfall;
        this.velocity.y += this.gravity;
    }
}