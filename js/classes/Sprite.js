class Sprite {
    constructor({position, imageSrc, frameRate = 1, animations }) {
        this.position = position;
        this.image = new Image();
        this.image.onload = () => {
            this.loaded = true;
            this.width = this.image.width / this.frameRate;
            this.height = this.image.height;
        }
        this.image.src = imageSrc;
        this.loaded = false;
        this.frameRate = frameRate;
        this.currentFrame = 0;
        this.elapsedFrames = 0;
        this.frameBuffer = 2;
        this.animations = animations;
        this.frameLoop = 0;
        this.currentAnimation

        if (this.animations) {
            this.frameLoop = animations.frameLoop;
            this.currentFrame = animations.frameStart;
            for (let key in this.animations) {
                const image = new Image();
                image.src = this.animations[key].imageSrc;
                this.animations[key].image = image;
            }
        }
    }
    draw() {
        if (!this.loaded) return;
        const Cropbox = {
            position: {
                x: this.width * this.currentFrame,
                y: 0,
            },
            width: this.width,
            height: this.height,
        }
        c.drawImage(
            this.image,
            Cropbox.position.x,
            Cropbox.position.y,
            Cropbox.width,
            Cropbox.height,
            this.position.x,
            this.position.y,
            this.width,
            this.height,
        )

        this.updateFrames();
    }

    updateFrames() {
        this.elapsedFrames++;

        if (this.elapsedFrames % this.frameBuffer === 0) {
            if (this.currentFrame < this.frameRate - 1) this.currentFrame++
            else this.currentFrame = this.frameLoop;
        }
    if (this.currentAnimation?.onComplete) {
        if (this.currentFrame === this.frameRate - 1 && !this.currentAnimation.isActive) {
            this.currentAnimation.onComplete();
            this.currentAnimation.isActive = true;
        }
    }
    }
}