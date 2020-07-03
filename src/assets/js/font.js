function resizeBaseFontSize() {
    var rootHtml = document.documentElement,
        deviceWidth = rootHtml.clientWidth;
    if (deviceWidth > 1024) {
        deviceWidth = 1024;
    }
    if (deviceWidth < 850) {
        deviceWidth = 850;
    }
    rootHtml.style.fontSize = deviceWidth / 10.24 + "px";
}
resizeBaseFontSize();
window.addEventListener("resize", resizeBaseFontSize, false);
window.addEventListener("orientationchange", resizeBaseFontSize, false);