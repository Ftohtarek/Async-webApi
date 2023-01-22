import { Queue } from "./queue.js";
import { Service } from "./service.js";

export class PopUp {
    ele = document.getElementById('pop-up')
    elementIsDequeue = true;
    queue = new Queue()
    service = new Service(this.ele)

    execute(message, type = 'danger') {
        this.queue.enqueue({ message: message, type: type })
        this.throwQueue()
    }

    throwQueue() {
        /* check queue every .1 second if element is delete then play next element */
        const checkQueue = setInterval(() => {
            if (this.queue.isEmpty()) return clearInterval(checkQueue)
            if (this.elementIsDequeue) {
                this.show(this.queue.front())
                this.elementIsDequeue = false
            }
        }, 100);
    }

    setAlertType() {
        /* type is but depond on bootstrab alert component  */
        this.ele.classList.remove(this.ele.classList[1])
        this.ele.classList.add(`alert-${this.queue.front().type}`)
    }

    show() {
        /* display Element and set alert type and fire hide function  */
        // this.ele.style.display = 'block';
        this.service.show(500)
        this.ele.innerHTML = this.queue.front().message;
        this.setAlertType()
        this.hide();
        this.closeOnClick()
    }

    hide(timeToClose = 2000) {
        /* hide element and delete it from queue */
        setTimeout(() => {
            this.service.hide(timeToClose)
            this.queue.dequeue()
            this.elementIsDequeue = true
        }, timeToClose);
    }

    closeOnClick() {
        /* close popup in clicking */
        this.ele.addEventListener('click', () => { this.hide(0); this.queue.dequeue() });

    }

}

