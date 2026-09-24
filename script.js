const barsBtn = document.querySelector(".header__bars-btn");
barsBtn.addEventListener("click", closeOpenNavigation);

function closeOpenNavigation() {
    const headerNavigation = document.querySelector(".header__nav");
    const barsImg = document.querySelector(".header__bars-img")
    let height = headerNavigation.scrollHeight + "px";

    if (this.classList.contains("active")) {
        this.classList.remove("active");
        headerNavigation.style.height = 0;
        barsImg.src = "images/bars.png";
    } else {
        this.classList.add("active");
        headerNavigation.style.height = height;
        barsImg.src = "images/bars-exit.png";
    }
}


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
console.log(reviewSlider)