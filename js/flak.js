class Flak {
    constructor(game, angle, ticksUntilImpact, killDistance, speed = 40) {
        this.game = game;
        this.container = new PIXI.Sprite();
        this.el = new PIXI.Sprite(PIXI.Texture.from('assets/da-flak.png'));
        this.angle = angle + 0.5 * Math.PI;
        this.killDistance = killDistance;
        this.yOff = -ticksUntilImpact * speed;
        this.speed = speed;
        this.isDead = false;
        this.init();
    }
    init() {
        this.container.addChild(this.el);
        this.container.rotation = this.angle;
        this.container.x = window.innerWidth / 2;
        this.container.y = window.innerHeight / 2;
        this.el.rotation = Math.PI * 0.5;
        this.el.anchor.set(1, 0.5);
        this.el.y = this.yOff;
        this.game.app.stage.addChild(this.container);
    }
    update() {
        if (this.el.y > this.killDistance) {
            this.isDead = true;
            this.container.visible = false;
        }
        this.el.y += this.speed;
        const player = this.game.player.el.worldTransform;
        const flak = this.el.worldTransform;
        const xDist = player.tx - flak.tx;
        const yDist = player.ty - flak.ty;
        const hypot = Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2));
        if (hypot < 40) {
            this.game.player.bloodRot = this.container.rotation + Math.PI;
            this.game.player.alive = false;
        }
    }
}
