import Phaser from 'phaser';

class SpaceExplorerScene extends Phaser.Scene {
    constructor() {
        super({ key: 'SpaceExplorerScene' });
        
    }

    preload() {
        let graphics = this.make.graphics({ x: 0, y: 0, add: false });
        graphics.fillStyle(0xffad00, 1);
        graphics.fillCircle(10, 10, 10);  // x, y, radius
        graphics.generateTexture('exhaust', 20, 20);
        graphics.destroy(); 

        let trailGraphics = this.make.graphics({ x: 0, y: 0, add: false });
        trailGraphics.fillStyle(0xADD8E6, 1); // Light blue color
        trailGraphics.fillCircle(5, 5, 5);  // Smaller circle for trail
        trailGraphics.generateTexture('trail', 10, 10);
        trailGraphics.destroy(); 

        this.load.image('spaceship', '/images/spaceship.png');
        this.load.image('b-star', '/images/b-star.png');
        this.load.image('y-star', '/images/y-star.png');
        this.load.image('g-star', '/images/g-star.png');
        this.load.image('r-star', '/images/r-star.png');
        this.load.image('asteroid1', '/images/asteroid1.png');
        this.load.image('asteroid2', '/images/asteroid2.png');
    }

    create() {
        this.physics.world.setBounds(0, 0, 10000, 10000);
        this.stars = [];
        this.asteroids = [];
        this.maxAsteroidSpeed = 175;
        this.createAsteroids();
        this.createStars();
        this.spaceship = this.physics.add.image(5000, 5000, 'spaceship');
        this.spaceship.setMaxVelocity(300);
        this.spaceship.setBounce(1); 
        this.spaceship.setMass(1);
        this.cameras.main.setBounds(0, 0, 10000, 10000);
        this.cameras.main.startFollow(this.spaceship, true);
        this.initThrusters();
        this.cursors = this.input.keyboard.createCursorKeys();
        this.trailGraphics = this.add.graphics({
            lineStyle: { width: 2, color: 0xffffff } // Adjust width and color as needed
        });
        this.prevPosition = { x: this.spaceship.x, y: this.spaceship.y };
        this.hue = 0;
        
        this.asteroids.forEach(asteroid => {
            this.physics.add.collider(asteroid, this.spaceship, this.handleCollision, null, this);
            asteroid.setMass(0.1);
            asteroid.setBounce(0.2); // This makes the asteroid bounce off other objects
        });
        
        this.zoomInKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Z);
        this.zoomOutKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.X);
        this.cameras.main.setZoom(0.4);
    }

    initTitleArea() {
        const style = { font: '16px Arial', fill: '#FFFFFF' };
    
        this.titleText = this.add.text(10, 10, 'Space Explorer v1.0', style).setScrollFactor(0);
        this.positionText = this.add.text(10, 30, '', style).setScrollFactor(0);
        this.velocityText = this.add.text(10, 50, '', style).setScrollFactor(0);
        this.headingText = this.add.text(10, 70, '', style).setScrollFactor(0);
    }

    update() {
        this.updateShipRotation();
        this.updateShipThrust();
        this.updateThrusterPositions();
        this.updateThrusterAngles();
        this.updateTrail();
        this.applyGravityEffects();
        if (this.zoomInKey.isDown) {
            // Zoom in
            this.cameras.main.zoom = Math.min(this.cameras.main.zoom + 0.001, 1); // Example max zoom level of 2
        } else if (this.zoomOutKey.isDown) {
            // Zoom out
            this.cameras.main.zoom = Math.max(this.cameras.main.zoom - 0.001, 0.1); // Example min zoom level of 0.5
        }
        // Wrap objects around the world bounds
        this.physics.world.wrap(this.spaceship, 0);
        this.asteroids.forEach(asteroid => {
            this.physics.world.wrap(asteroid, 0);
        });
        // Limit the speed of each asteroid
        this.asteroids.forEach(asteroid => {
            if (asteroid.body.velocity.length() > this.maxAsteroidSpeed) {
                asteroid.body.velocity.normalize().scale(this.maxAsteroidSpeed);
            }
        });
    }

    updateTrail() {
        // Ensure trailSegments and totalTrailLength are initialized
        if (!this.trailSegments) {
            this.trailSegments = [];
            this.totalTrailLength = 0;
            this.prevPosition = { x: this.spaceship.x, y: this.spaceship.y };
        }
    
        const currentPos = { x: this.spaceship.x, y: this.spaceship.y };
        const lastPos = this.prevPosition;
        const segmentLength = Phaser.Math.Distance.Between(lastPos.x, lastPos.y, currentPos.x, currentPos.y);
    
        if (segmentLength > 0) {
            this.trailSegments.push(currentPos);
            this.totalTrailLength += segmentLength;
    
            // Continuously remove the oldest segment if the total length exceeds 30 pixels
            while (this.totalTrailLength > 260 && this.trailSegments.length > 1) {
                const firstSegment = this.trailSegments[0];
                const nextSegment = this.trailSegments[1];
                const removedLength = Phaser.Math.Distance.Between(firstSegment.x, firstSegment.y, nextSegment.x, nextSegment.y);
                this.totalTrailLength -= removedLength;
                this.trailSegments.shift();
            }
    
            this.drawTrail();
        }
    
        this.prevPosition = currentPos;
    }

    drawTrail() {
        this.trailGraphics.clear();
        this.hue += 0.02; // Adjust this value for the hue change speed
        this.hue = this.hue % 360; // Ensure hue stays within range
    
        const totalSegments = this.trailSegments.length;
        for (let i = 1; i < totalSegments; i++) {
            // Calculate alpha value for each segment
            const alpha = i / totalSegments;
    
            // Calculate color with varying alpha
            const color = Phaser.Display.Color.HSVToRGB(this.hue / 360, 1, 1);
            const rgbaColor = Phaser.Display.Color.GetColor(color.r, color.g, color.b, alpha);
    
            // Set line style with the calculated color
            this.trailGraphics.lineStyle(2, rgbaColor, alpha);
    
            // Draw line segment
            this.trailGraphics.lineBetween(
                this.trailSegments[i - 1].x, this.trailSegments[i - 1].y,
                this.trailSegments[i].x, this.trailSegments[i].y
            );
        }
    }

    updateShipRotation() {
        let rotationAmount = 0.012;
        if (this.cursors.left.isDown) {
            this.cameras.main.rotation += rotationAmount;
            this.spaceship.rotation -= rotationAmount;
        } else if (this.cursors.right.isDown) {
            this.cameras.main.rotation -= rotationAmount;
            this.spaceship.rotation += rotationAmount;
        }
    }

    updateShipThrust() {
        if (this.cursors.up.isDown) {
            this.applyThrust(this.spaceship.rotation, 175);
            this.activateThrusters('forward');
        } else if (this.cursors.down.isDown) {
            this.applyThrust(this.spaceship.rotation + Math.PI, 175);
            this.activateThrusters('reverse');
        } else if (this.cursors.left.isDown) {
            this.activateThrusters('left');
        } else if (this.cursors.right.isDown) {
            this.activateThrusters('right');
        } else {
            this.spaceship.setAcceleration(0);
            this.deactivateThrusters();
        }
    }

    applyThrust(direction, speed) {
        const adjustedDirection = direction - Math.PI / 2;
        const thrustVector = this.physics.velocityFromRotation(adjustedDirection, speed, new Phaser.Math.Vector2());
        // Set thrust as acceleration but do not apply it yet
        this.spaceship.body.setAcceleration(thrustVector.x, thrustVector.y);
    }

    updateThrusterPositions() {
        const offsets = { x: 25, y: 25 };
        const cosRotation = Math.cos(this.spaceship.rotation);
        const sinRotation = Math.sin(this.spaceship.rotation);
        this.thrusters.rightReverse.setPosition(
            this.spaceship.x + (offsets.x * cosRotation - offsets.y * sinRotation),
            this.spaceship.y + (offsets.x * sinRotation + offsets.y * cosRotation)
        );
        this.thrusters.leftReverse.setPosition(
            this.spaceship.x + (-offsets.x * cosRotation - offsets.y * sinRotation),
            this.spaceship.y + (-offsets.x * sinRotation + offsets.y * cosRotation)
        );
        this.thrusters.leftForward.setPosition(
            this.spaceship.x + (-offsets.x * cosRotation + offsets.y * sinRotation),
            this.spaceship.y + (-offsets.x * sinRotation - offsets.y * cosRotation)
        );
        this.thrusters.rightForward.setPosition(
            this.spaceship.x + (offsets.x * cosRotation + offsets.y * sinRotation),
            this.spaceship.y + (offsets.x * sinRotation - offsets.y * cosRotation)
        );
    }

    updateThrusterAngles() {
        const thrustDirection = this.spaceship.rotation - Math.PI / 2; // Adjusted direction for thrust
        this.thrusters.leftForward.setAngle(Phaser.Math.RadToDeg(thrustDirection + Math.PI));
        this.thrusters.rightForward.setAngle(Phaser.Math.RadToDeg(thrustDirection + Math.PI));
        this.thrusters.leftReverse.setAngle(Phaser.Math.RadToDeg(thrustDirection + Math.PI));
        this.thrusters.rightReverse.setAngle(Phaser.Math.RadToDeg(thrustDirection + Math.PI));
    }

    createStars() {
        const starImages = ['b-star', 'y-star', 'g-star', 'r-star'];
        const gravityMultipliers = { 'b-star': 0.8, 'y-star': 1.0, 'g-star': 1.5, 'r-star': 2.2 };
    
        while (this.stars.length < 5) {
            const starX = Phaser.Math.Between(1000, 9000);
            const starY = Phaser.Math.Between(1000, 9000);
            
            // Ensure stars are not too close to each other
            if (!this.isTooCloseToOtherStars(starX, starY, this.stars, 1000)) {
                const starImage = Phaser.Math.RND.pick(starImages);
                const starScale = Phaser.Math.FloatBetween(0.8, 2);
                const baseRadius = 666;
                const gravityRadius = baseRadius * starScale;
                const star = this.add.image(starX, starY, starImage).setScale(starScale);
    
                // Draw gravity effect
                this.drawGravityEffect(starX, starY, gravityRadius, starImage, gravityMultipliers[starImage]);
    
                this.stars.push({ star, gravityRadius, multiplier: gravityMultipliers[starImage] });
            }
        }
    
        return this.stars;
    }

    isTooCloseToOtherStars(x, y, stars, minDistance) {
        return stars.some(otherStar => {
            const distance = Phaser.Math.Distance.Between(x, y, otherStar.star.x, otherStar.star.y);
            return distance < minDistance;
        });
    }

    drawGravityEffect(x, y, radius, starImage, multiplier) {
        const graphics = this.add.graphics();
        graphics.lineStyle(2, this.getColorFromStar(starImage), 1);
        graphics.strokeCircle(x, y, radius);
    
        const fillColor = this.getColorFromStar(starImage);
        graphics.fillStyle(fillColor, 0.1); // Highly transparent
        graphics.fillCircle(x, y, radius);
    }

    getColorFromStar(starImage) {
        const colorMap = {
            'b-star': 0x0000FF, // Blue
            'y-star': 0xFFFF00, // Yellow
            'g-star': 0x00FF00, // Green
            'r-star': 0xFF0000  // Red
        };
    
        return colorMap[starImage] || 0xFFFFFF; // Default to white if no match
    }

    createAsteroids() {
        const asteroidImages = ['asteroid1', 'asteroid2'];
        for (let i = 0; i < 50; i++) {
            const asteroidX = Phaser.Math.Between(0, 10000);
            const asteroidY = Phaser.Math.Between(0, 10000);
            const asteroidScale = Phaser.Math.FloatBetween(0.3, 0.76);
            const asteroidImage = Phaser.Math.RND.pick(asteroidImages);
            const asteroid = this.physics.add.image(asteroidX, asteroidY, asteroidImage).setScale(asteroidScale);
            this.asteroids.push(asteroid);
            const speed = Phaser.Math.Between(10, 50); // Adjust speed range as needed
            const angle = Phaser.Math.FloatBetween(0, 2 * Math.PI);
            asteroid.setVelocity(speed * Math.cos(angle), speed * Math.sin(angle));
            const rotationSpeed = Phaser.Math.Between(-15, 15); // Adjust rotation speed range as needed
            asteroid.setAngularVelocity(rotationSpeed);
        }
    }

    initThrusters() {
        const offsets = { x: 30, y: 15 };
        this.thrusters = {
            rightReverse: this.createThruster(this.spaceship.x - offsets.x, this.spaceship.y - offsets.y, 0),
            leftReverse: this.createThruster(this.spaceship.x + offsets.x, this.spaceship.y - offsets.y, 0),
            leftForward: this.createThruster(this.spaceship.x - offsets.x, this.spaceship.y + offsets.y, 180),
            rightForward: this.createThruster(this.spaceship.x + offsets.x, this.spaceship.y + offsets.y, 180)
        };
    }

    createThruster(x, y, angle) {
        let emitter = this.add.particles(x, y, 'exhaust', {
            speed: 150,
            angle: angle,
            scale: { start: 1, end: 0 },
            blendMode: 'ADD',
            lifespan: 500,
            frequency: 50,
        });
        return emitter;
    }

    activateThrusters(direction) {
        if (direction === 'forward') {
            this.thrusters.leftReverse.start();
            this.thrusters.rightReverse.start();
        } else if (direction === 'reverse') {
            this.thrusters.leftForward.start();
            this.thrusters.rightForward.start();
        } else if (direction === 'left') {
            this.thrusters.rightReverse.start();
        } else if (direction === 'right') {
            this.thrusters.leftReverse.start();
        }
    }
    
    deactivateThrusters() {
        Object.values(this.thrusters).forEach(emitter => emitter.stop());
    }
 
    calculateGravityStrength(distance, radius, multiplier) {
        const baseStrength = 52; // Adjust base gravity strength
        const distanceFactor = (radius - distance) / radius;
        return baseStrength * multiplier * (1 + distanceFactor);
    }

    applyGravityEffects() {
        this.stars.forEach(starObj => {
            this.applyGravityTo(this.spaceship, starObj);
        });
    }
    
    applyGravityTo(object, starObj) {
        const distance = Phaser.Math.Distance.Between(object.x, object.y, starObj.star.x, starObj.star.y);
        if (distance < starObj.gravityRadius) {
            const gravityStrength = this.calculateGravityStrength(distance, starObj.gravityRadius, starObj.multiplier);
            const direction = new Phaser.Math.Vector2(starObj.star.x - object.x, starObj.star.y - object.y).normalize();
            object.body.acceleration.x += direction.x * gravityStrength;
            object.body.acceleration.y += direction.y * gravityStrength;
        }
    }

    handleCollision(obj1, obj2) {
        obj1.body.velocity.multiply(new Phaser.Math.Vector2(-1, -1));
        obj2.body.velocity.multiply(new Phaser.Math.Vector2(-1, -1));
    }

}

class UIScene extends Phaser.Scene {
    constructor() {
        super({ key: 'UIScene', active: true });
    }

    create() {
        const style = { font: '16px Arial', fill: '#FFFFFF' };
        this.titleText = this.add.text(10, 10, 'Space Explorer v1.0', style);
        this.positionText = this.add.text(10, 30, '', style);
        this.velocityText = this.add.text(10, 50, '', style);
        this.headingText = this.add.text(10, 70, '', style);
    }

    update() {
        const spaceExplorerScene = this.scene.get('SpaceExplorerScene');
    
        // Check if the spaceship exists in the SpaceExplorerScene
        if (spaceExplorerScene && spaceExplorerScene.spaceship) {
            this.positionText.setText(`Ship Position: x=${spaceExplorerScene.spaceship.x.toFixed(2)}, y=${spaceExplorerScene.spaceship.y.toFixed(2)}`);
            this.velocityText.setText(`Ship Velocity: ${spaceExplorerScene.spaceship.body.velocity.length().toFixed(2)} pixels/sec`);
            this.headingText.setText(`Ship Heading: ${Phaser.Math.RadToDeg(spaceExplorerScene.spaceship.rotation).toFixed(2)} degrees`);
        }
    }
}


export function initializePhaserGame(parentElementId) {
    return new Phaser.Game({
        type: Phaser.AUTO,
        width: 800,
        height: 600,
        physics: {
            default: 'arcade',
            arcade: {
                gravity: { x: 0, y: 0 },
                debug: true
            }
        },
        scene: [SpaceExplorerScene, UIScene],
        parent: parentElementId
    });
}