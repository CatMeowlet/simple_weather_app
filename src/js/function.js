/** FUNCTION SECTION */
const removeElements = (elms) => elms.forEach(el => el.remove());
// helper function from jquery $.css
const css = (el, styles) => {
    for (var property in styles)
        el.style[property] = styles[property];
};
const scrollToTop = () => {
    const c = document.documentElement.scrollTop || document.body.scrollTop;
    if (c > 0) {
        document.body.setAttribute('style', 'overflow:hidden;');
        window.requestAnimationFrame(scrollToTop);
        window.scrollTo(0, c - c / 28);
        setTimeout(function () {
            document.body.setAttribute('style', 'overflow-x:hidden;');
        }, 500);
    }
};
const scrollToAnchorPoint = (elements) => {
    if (elements.length > 0) {
        elements.forEach((item) => {
            item.addEventListener("click", (e) => {
                e.preventDefault();
                document.querySelector(item.getAttribute("href")).scrollIntoView({
                    behavior: "smooth",
                });
            });
        });
    } else {
        throw "scrollToAnchorPoint() need parameter to be a collection of links:href";
    }
};
const scrollClass = (targetElement, classes = {
    default: "scrolling",
    up: 'scroll-up',
    down: 'scroll-down',
    top: 'scrolling-reached-top',
    bottom: 'scrolling-reached-bottom',
}) => {

    /**
     * check if there are unsetted classes
     */
    classes = {
        default: typeof classes.default !== 'undefined' ? classes.default : "scrolling",
        up: typeof classes.up !== 'undefined' ? classes.up : 'scroll-up',
        down: typeof classes.down !== 'undefined' ? classes.down : 'scroll-down',
        top: typeof classes.top !== 'undefined' ? classes.top : 'scrolling-reached-top',
        bottom: typeof classes.bottom !== 'undefined' ? classes.bottom : 'scrolling-reached-bottom',
    }
    /**
     * check if page position is top or bottom then set class
     */
    if (window.pageYOffset === document.body.offsetTop) {
        targetElement.classList.add(classes.top);
    } else if ((window.innerHeight + window.pageYOffset) >= document.body.offsetHeight) {
        targetElement.classList.add(classes.bottom);
    }
    /**
     * set class when scroll
     */
    let pageY = 0;
    let prevY = 0;
    document.addEventListener('scroll', () => {
        prevY = pageY;
        pageY = window.pageYOffset;
        if (targetElement) {
            // console.log('prevY = ' + prevY + 'currentY = ' + pageY);
            if (window.pageYOffset === document.body.offsetTop) {
                // console.log("you're at the top of the page");
                targetElement.classList.add(classes.top);
                if (targetElement.classList.contains(classes.up) || targetElement.classList.contains(classes.down)) {
                    targetElement.classList.remove(classes.default);
                    targetElement.classList.remove(classes.up);
                    targetElement.classList.remove(classes.down);
                }
            } else if ((pageY - prevY) < 0) {
                // console.log("is scrolling up");
                targetElement.classList.add(classes.default);
                if (targetElement.classList.contains(classes.bottom)) {
                    targetElement.classList.remove(classes.bottom);
                }
                if (targetElement.classList.contains(classes.down)) {
                    targetElement.classList.replace(classes.down, classes.up);
                } else {
                    targetElement.classList.add(classes.up);
                }
            } else if ((pageY - prevY) > 0) {
                // console.log("is scrolling down");
                targetElement.classList.add(classes.default);
                if (targetElement.classList.contains(classes.top)) {
                    targetElement.classList.remove(classes.top);
                }
                if (targetElement.classList.contains(classes.up)) {
                    targetElement.classList.replace(classes.up, classes.down);
                } else {
                    targetElement.classList.add(classes.down);
                }
            }
            if ((window.innerHeight + window.pageYOffset) >= document.body.offsetHeight) {
                // console.log("you're at the bottom of the page");
                targetElement.classList.add(classes.bottom);
                if (targetElement.classList.contains(classes.up) || targetElement.classList.contains(classes.down)) {
                    targetElement.classList.remove(classes.default);
                    targetElement.classList.remove(classes.up);
                    targetElement.classList.remove(classes.down);
                }
            }
        }
    });
};
const toggleDisplay = function (initiator = {
    elem: null,
    class: null,
    childClass: null
}, target = {
    elem: null,
    class: null
}) {
    this.initiatorElement = initiator.elem;
    this.initiatorClassToggle = initiator.class;
    this.initiatorChildClassToggle = initiator.childClass;
    this.targetElement = target.elem;
    this.targetClassToggle = target.class;
    this.mount = () => {
        let initiator = this.initiatorElement;
        let target = this.targetElement;
        initiator.addEventListener('click', (e) => {
            initiator.classList.toggle(this.initiatorClassToggle);
            this.initiatorChildClassToggle != null ? initiator.children[0].classList.toggle(this.initiatorChildClassToggle) : '';
            target.classList.toggle(this.targetClassToggle);
        });
    }
}
const isScrolledIntoView = (el) => {
    var rect = el.getBoundingClientRect();
    var elemTop = rect.top;
    var elemBottom = rect.bottom;
    // Only completely visible elements return true:
    var isVisible = (elemTop >= 0) && (elemBottom <= window.innerHeight);
    // Partially visible elements return true:
    //isVisible = elemTop < window.innerHeight && elemBottom >= 0;
    return isVisible;
};

function initImageSliderComparisons() {
    /* ind all elements with an "frame" class in p-imageCompare */
    var frame = document.querySelectorAll('.p-imageCompare__frame');
    frame.forEach(element => {
        injectFrameBackground(element);
    });
    window.onresize = resizeFrame;

    function resizeFrame() {
        frame.forEach(e => {
            css(e, {
                "height": `${frameDimension(e)[0]}px`,
                "width": `${frameDimension(e)[1]}px`,
            });
        });
    }

    function injectFrameBackground(e) {
        let src = frameSrc(e);
        let h = frameDimension(e)[0];
        let w = frameDimension(e)[1];
        css(e, {
            "background-image": `url('${src}')`,
            "background-repeat": "no-repeat",
            "background-position": "center",
            "background-size": "cover",
            "height": `${h}px`,
            "width": `${w}px`,
        });
    }

    function frameSrc(e) {
        return e.querySelector('img').getAttribute('src');
    }

    function frameDimension(e) {
        let dimensionH = e.parentElement.parentElement.getBoundingClientRect().height;
        let dimensionW = e.parentElement.parentElement.getBoundingClientRect().width;
        return [dimensionH, dimensionW];
    }

    var x, i;
    /* Find all elements with an "overlay" class: */
    x = document.getElementsByClassName("p-imageCompare__overlayImage");
    for (i = 0; i < x.length; i++) {
        /* Once for each "overlay" element:
        pass the "overlay" element as a parameter when executing the compareImages function: */
        compareImages(x[i]);
    }

    function compareImages(img) {
        var slider, img, clicked = 0,
            w, h;
        /* Get the width and height of the img element */
        w = img.offsetWidth;
        h = img.offsetHeight;
        /* Set the width of the img element to 50%: */
        img.style.width = (w / 2) + "px";
        /* Create slider: */
        slider = document.createElement("DIV");
        sliderBtn = document.createElement("DIV");
        slider.setAttribute("class", "p-imageCompare__slider");
        sliderBtn.setAttribute("class", "p-imageCompare__slider__btn");
        /* Insert slider */
        img.parentElement.insertBefore(slider, img);
        /* Insert slider btn */
        slider.appendChild(sliderBtn);
        /* Position the slider in the middle: */
        // slider.style.top = (h / 2) - (slider.offsetHeight / 2) + "px";
        slider.style.top = 0;
        slider.style.left = (w / 2) - (slider.offsetWidth / 2) + "px";
        /* Execute a function when the mouse button is pressed: */
        slider.addEventListener("mousedown", slideReady);
        /* And another function when the mouse button is released: */
        window.addEventListener("mouseup", slideFinish);
        /* Or touched (for touch screens: */
        slider.addEventListener("touchstart", slideReady);
        /* And released (for touch screens: */
        window.addEventListener("touchend", slideFinish);

        function slideReady(e) {
            /* Prevent any other actions that may occur when moving over the image: */
            e.preventDefault();
            /* The slider is now clicked and ready to move: */
            clicked = 1;
            /* Execute a function when the slider is moved: */
            window.addEventListener("mousemove", slideMove);
            window.addEventListener("touchmove", slideMove);
        }

        function slideFinish() {
            /* The slider is no longer clicked: */
            clicked = 0;
        }

        function slideMove(e) {
            var pos;
            /* If the slider is no longer clicked, exit this function: */
            if (clicked == 0) return false;
            /* Get the cursor's x position: */
            pos = getCursorPos(e)
            /* Prevent the slider from being positioned outside the image: */
            if (pos < 0) pos = 0;
            if (pos > w) pos = w;
            /* Execute a function that will resize the overlay image according to the cursor: */
            slide(pos);
        }

        function getCursorPos(e) {
            var a, x = 0;
            e = (e.changedTouches) ? e.changedTouches[0] : e;
            /* Get the x positions of the image: */
            a = img.getBoundingClientRect();
            /* Calculate the cursor's x coordinate, relative to the image: */
            x = e.pageX - a.left;
            /* Consider any page scrolling: */
            x = x - window.pageXOffset;
            return x;
        }

        function slide(x) {
            /* Resize the image: */
            img.style.width = x + "px";
            /* Position the slider: */
            slider.style.left = img.offsetWidth - (slider.offsetWidth / 2) + "px";
        }
    }
}