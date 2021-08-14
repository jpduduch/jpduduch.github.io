import isMobile from 'modules/detect-mobile.js'

if (isMobile()) {
    document.getElementById('hero').style.height = window.innerHeight + 'px';
}