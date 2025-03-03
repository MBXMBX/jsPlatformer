class CollisionBlock {
    constructor({position}) {
        this.position = position;
        this.width = 16*sizeMultiplier;
        this.height = 16*sizeMultiplier;
    }

    draw() {
        c.fillStyle = `rgba(255,0,0,0)`;
        c.fillRect(this.position.x,this.position.y,this.width,this.height);
    }
}

class SpikeBlock1 {
    constructor({position}) {
        this.position = position;
        this.width = 16*sizeMultiplier;
        this.height = 8*sizeMultiplier;
    }

    draw() {
        c.fillStyle = `rgba(0,255,0,0)`;
        c.fillRect(this.position.x,this.position.y,this.width,this.height);
    }
}

class SpikeBlock2 {
    constructor({position}) {
        this.position = position;
        this.width = 8*sizeMultiplier;
        this.height = 16*sizeMultiplier;
    }

    draw() {
        c.fillStyle = `rgba(0,255,0,0)`;
        c.fillRect(this.position.x,this.position.y,this.width,this.height);
    }
}