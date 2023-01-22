import { Home } from "./home.js";
import { Service } from "./service.js";

export class Finish {
    constructor() {
        this.score = document.getElementById("score")
        this.ele = document.getElementById('finish')
        this.tryAgain = document.getElementById('tryAgain');
        this.service = new Service(this.ele)
        this.home = new Home()
        this.tryAgain.addEventListener('click', () => { this.goHome() })
    }

    start(resbonce) {
        this.service.show(2000)
        this.score.innerHTML = (resbonce.correctAnswer / resbonce.totalQ) * 100 + '%';

    }

    goHome() {
        this.service.hide(500)
        new Service(this.home.home).show(500,500)
    }
}