if (document.body.type !== screen && document.body.clientWidth > 1400){
  new ImageZoom(document.getElementById("img-container"), {
    width: 456,
    height: 278,
    zoomWidth: 456,
    zoomHeight: 278,
    scale: 1,
    offset: {vertical: 0, horizontal: 50}
  });
}
