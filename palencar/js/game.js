function onLoad() {
    const canvas = document.getElementById("game-canvas");
    const canvasContext = canvas.getContext("2d");
    const image = document.getElementById("game-sokol");
    canvasContext.drawImage(image, 0, 0);
}

window.onload = onLoad;
