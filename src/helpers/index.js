export const CanvasArt = (canvasRef) => {
  const canvas = canvasRef.current;
  const context = canvas.getContext("2d");
  var time = 0;
  var intervalId = 0;

  const makeNoise = () => {
    const imgd = context.createImageData(canvas.width, canvas.height);
    const pix = imgd.data;

    for (var i = 0, n = pix.length; i < n; i += 4) {
      pix[i] = pix[i + 1] = pix[i + 2] = 250 * Math.random();
      pix[i + 3] = 255;
    }

    context.putImageData(imgd, 0, 0);
    time = (time + 1) % canvas.height;
  };

  intervalId = setInterval(makeNoise, 40);
};

export const randomIntFromInterval = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);
