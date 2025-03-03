Array.prototype.parse2D = function() {
    const rows = []
    for (let i = 0; i < this.length; i+=48) {
        rows.push(this.slice(i, i + 48*sizeMultiplier))
    }
    return rows;
}

Array.prototype.createObjectsFrom2D = function () {
    const objects = [];
    this.forEach((row, y) => {
        row.forEach((symbol, x) => {
            if (symbol === 9) {
                objects.push(
                    new CollisionBlock({
                        position: {
                            x: x * 16*sizeMultiplier,
                            y: y * 16*sizeMultiplier,
                        },
                    })
                )
            }
            if (symbol === 1) {
                objects.push(
                    new SpikeBlock1({
                        position: {
                            x: x * 16*sizeMultiplier,
                            y: (0.5 + y) * 16*sizeMultiplier,
                        },
                    })
                )
            }
            if (symbol === 2) {
                objects.push(
                    new SpikeBlock1({
                        position: {
                            x: x * 16*sizeMultiplier,
                            y: y * 16*sizeMultiplier,
                        },
                    })
                )
            }
            if (symbol === 3) {
                objects.push(
                    new SpikeBlock2({
                        position: {
                            x: (0.5 + x) * 16*sizeMultiplier,
                            y: y * 16*sizeMultiplier,
                        },
                    })
                )
            }
            if (symbol === 4) {
                objects.push(
                    new SpikeBlock2({
                        position: {
                            x: x * 16*sizeMultiplier,
                            y: y * 16*sizeMultiplier,
                        },
                    })
                )
            }
        })
    })
    return objects;
}