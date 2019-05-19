class Canvas {
    constructor(canvas) {
        this.canvas = canvas[0];
        this.ctx = this.canvas.getContext("2d");

        this.isDrawing = false;
        this.lastX = 0;
        this.lastY = 0;

        this.miseEnPlace();
        this.initialiseEvents();
    }

    miseEnPlace() {
        this.canvas.width = this.canvas.parentNode.clientWidth;
        this.canvas.height = 100;

        this.ctx.strockStyle = "#000";
        this.ctx.lineJoin = "round";
        this.ctx.lineCap = "round";
        this.ctx.lineWidth = 2;
        this.ctx.fillStyle = "#fff";
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }

    draw(x, y) {
        if (!this.isDrawing) return;
        this.ctx.beginPath();
        this.ctx.moveTo(this.lastX, this.lastY);
        this.ctx.lineTo(x, y);
        this.ctx.stroke();
        [this.lastX, this.lastY] = [x, y]
    }

    clearSignature() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.fillStyle = "#fff";
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }

    initialiseEvents() {
        this.canvas.addEventListener("mousedown", e => {
            this.isDrawing = true;
            [this.lastX, this.lastY] = [e.offsetX, e.offsetY];
        })
        this.canvas.addEventListener("touchstart", e => {
            if (e.touches && e.touches.length == 1) {
                this.isDrawing = true;
                let touch = e.touches[0]
                let touchX = touch.pageX - touch.target.offsetleft;
                let touchY = touch.pageY - touch.target.offsetTop;
                [this.lastX, this.lastY] = [touchX, touchY];
                e.preventDefault();
            }
        });

        this.canvas.addEventListener("mousemove", e => {
            this.draw(e.offsetX, e.offsetY);
        });
        this.canvas.addEventListener("touchmove", e => {
            if (e.touches && e.touches.length == 1) {
                let touch = e.touches[0];
                let touchX = touch.pageX - touch.target.offsetleft;
                let touchY = touch.pageY - touch.target.offsetTop;
                this.draw(touchX, touchY);
            }
        });

        this.canvas.addEventListener("mouseup", () => (this.isDrawing = false));
        this.canvas.addEventListener("mouseout", () => (this.isDrawing = false));
        this.canvas.addEventListener("touchend", () => (this.isDrawing = false));
    }

}