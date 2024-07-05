const RESOLUTION_SCALE = 4;

function takeScreenshot() {
  const video = document.querySelector("video");
  const canvas = document.createElement("canvas");

  video.pause();

  let vWidth = video.clientWidth * RESOLUTION_SCALE;
  let vHeight = video.clientHeight * RESOLUTION_SCALE;

  const style = window.getComputedStyle(video);
  const top = parseFloat(style.getPropertyValue("top"));
  const left = parseFloat(style.getPropertyValue("left"));
  const width = parseFloat(style.getPropertyValue("width"));
  const height = parseFloat(style.getPropertyValue("height"));

  const imgLeft = left * vWidth / width;
  const imgTop = top * vHeight / height;
  const drawLeft = imgLeft > 0 ? 0 : imgLeft;
  const drawTop = imgTop > 0 ? 0: imgTop;
  const drawWidth = vWidth;
  const drawHeight = vHeight;

  canvas.width = vWidth + imgLeft * 2;
  canvas.height = vHeight + imgTop * 2;

  canvas.getContext("2d").drawImage(video, drawLeft, drawTop, drawWidth, drawHeight);

  const imgData = document.querySelector("a-scene").components.screenshot.getCanvas("perspective");
  canvas.getContext("2d").drawImage(imgData, drawLeft, drawTop, drawWidth, drawHeight);

  downloadScreenshot(canvas);
  video.play();
}

function downloadScreenshot(canvas) {
  const a = document.createElement("a");
  a.href = canvas.toDataURL("image/png");
  a.download = imageName();
  a.click();
}

function imageName() {
  return `demo_${getUUID()}.png`;
}

function getUUID() {
  const uuid = window.crypto.randomUUID();
  return uuid.split("-")[0] ?? uuid;
}
