const navigation = {
    barsBtn: document.querySelector(".header__bars-btn"),
    navBtns: document.querySelectorAll(".header__link"),
    icon: document.querySelector(".header__bars-img"),
    navigation: document.querySelector(".header__nav"),

    init() {
        this.barsBtn.addEventListener("click", () => this.toggle());
        this.navBtns.forEach((element) => element.addEventListener("click", () => this.close()));
    },

    toggle() {
        if (this.barsBtn.classList.contains("active")) {
            this.close();
            console.log(12)
        } else {
            this.open();
            console.log(1)
        }
    },

    open() {
        const height = this.navigation.scrollHeight + "px";
        this.navigation.style.height = height;
        this.barsBtn.classList.add("active");
        this.icon.src = "images/bars-exit.png";
    },

    close() {
        this.navigation.style.height = 0;
        this.barsBtn.classList.remove("active");
        this.icon.src = "images/bars.png";
    }
}

navigation.init();


class Slider {
    constructor(parent) {
        this.parent = document.querySelector(parent);
        this.trackLine = this.parent.querySelector(".track");
        this.prevBtn = this.parent.querySelector(".prev-btn");
        this.nextBtn = this.parent.querySelector(".next-btn");
        this.sliders = this.parent.querySelectorAll(".item");

        this.firstSlide = this.sliders[this.sliders.length -1].cloneNode(true);
        this.lastSlide = this.sliders[0].cloneNode(true);
        this.secondLastSlide = this.sliders[1].cloneNode(true);



        this.trackLine.appendChild(this.lastSlide);
        this.trackLine.appendChild(this.secondLastSlide);
        this.trackLine.insertBefore(this.firstSlide, this.sliders[0]);

        this.sliders = [...this.parent.querySelectorAll(".item")];

        this.currentIndex = 1;
        this.updateSlide(false);

        this.prevBtn.addEventListener("click", this.goPrev.bind(this));
        this.nextBtn.addEventListener("click", this.goNext.bind(this));

        window.addEventListener("transitionend", this.checkIndex.bind(this));
    }

    getSlidePreview() {
        const computedStyle = getComputedStyle(document.documentElement);
        return computedStyle.getPropertyValue("--slide-preview");
    }

    updateSlide(withTransition) {
        const percent = 100 / this.getSlidePreview();
        this.trackLine.style.transition = withTransition ? "0.3s" : "none";
        this.trackLine.style.transform = `translateX(-${percent * this.currentIndex}%)`;
    }

    goNext() {
        this.currentIndex++;
        this.updateSlide(true);

        this.setButtonDisabled(true);
    }

    goPrev() {
        this.currentIndex--;
        this.updateSlide(true);

        this.setButtonDisabled(true);
    }

    checkIndex() {
        if (this.sliders[this.currentIndex] === this.lastSlide) {
            this.currentIndex = 1;
            this.updateSlide(false);
        }

        if (this.sliders[this.currentIndex] === this.firstSlide) {
            this.currentIndex = this.sliders.length - 3;
            this.updateSlide(false);
        }

        this.setButtonDisabled(false);
    }

    setButtonDisabled(state) {
        this.nextBtn.disabled = state;
        this.prevBtn.disabled = state;
    }
}

const reviewSlider = new Slider(".reviews__slider");