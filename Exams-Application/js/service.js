export class Service {
    constructor(htmlElement = HTMLElement) {
        this.ele = htmlElement
    }
    hide(timer = 500) {
        this.ele.style.transition = `${timer / 1000}s`;
        this.ele.style.opacity = 0;
        setTimeout(() => { this.ele.style.display = 'none' }, timer)
    }

    show(timer = 1000 ,wait=10) {
        this.ele.style.display = 'block';
        this.ele.style.opacity = 0;
        this.ele.style.transition = `${timer / 1000}s`;
        setTimeout(() => { this.ele.style.opacity = 1; }, wait)

    }

    toggle(timer) {
        this.checkExisting ? this.hide(timer) : this.show(timer)
    }

    checkExisting() {
        return this.ele.style.display = 'none' ? false : true
    }
}