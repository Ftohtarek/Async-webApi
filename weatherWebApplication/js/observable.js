export class Observable {
    observes = []
    subscripe(fn) {
        this.observes.push(fn)
    }
    emit(val) {
        this.observes.forEach(observe => {
            observe.call(this, val)
        })
    }
}