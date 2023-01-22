export class PopUp {
    ele
    timeOut
    constructor() {
        this.ele = this.createComponentHtml()
    }

    get style() {
        return `
        position: fixed;
        background-color: rgb(252, 208, 211) ;
        min-width:10vw ;
        min-height: 75px;
        max-height: 200px;
        top: 1vw;
        right: 1vw;
        border-radius: 5px;
        color: #240b0b;
        justify-content: center;
        align-items: center;
        display:none;
        cursor:pointer;
        padding:5px 20px;
        `
    }

    createComponentHtml() {
        const alertWindow = document.createElement('div')
        alertWindow.id = "pop-up"
        alertWindow.style.cssText = this.style
        document.body.appendChild(alertWindow)
        return alertWindow
    }

    alert = (message = 'Error') => {
        this.isExsiting ? clearTimeout(this.timeOut) : this.fadeIn();
        this.hide(5000)
        this.ele.innerHTML = message;
        this.events();
    }

    get isExsiting() {
        return this.ele.style.display == 'flex' ? true : false
    }

    hide = (duration = 5000) => {
        this.timeOut = setTimeout(this.fadeOut, duration)
    }

    events = () => {
        this.ele.addEventListener('click', () => { clearTimeout(this.timeOut); this.hide(0) });
    }

    fadeIn = (duration = 50) => {
        this.ele.style.display = 'flex';
        this.ele.style.opacity = 0
        let opacity = 0
        let frame = () => {
            opacity >= 1 ? clearInterval(id) : opacity += .1;
            this.ele.style.opacity = opacity
        }
        let id = setInterval(frame, duration);
    }

    fadeOut = (duration = 50) => {
        this.ele.style.opacity = 1
        let opacity = 1
        let frame = () => {
            if (opacity <= 0) {
                this.ele.style.display = 'none'
                clearInterval(id)
            } else
                opacity -= .1;
            this.ele.style.opacity = opacity
        }
        let id = setInterval(frame, duration);
    }
}