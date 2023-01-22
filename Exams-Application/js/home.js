export class Home {
    constructor() {
        this.home = document.getElementById('home')
        this.catogery = document.getElementById("catogery")
        this.diffculty = document.getElementsByName("diff")
        this.numberQuation = document.getElementById("numberQuation")
    }
    startQ = () => {
        /* prepare Require Data to inject it in url Request */
        const diffSelection = [...this.diffculty].filter(el => el.checked)[0].value
        const url = `https://opentdb.com/api.php?amount=${this.numberQuation.value}&category=${this.catogery.value}&difficulty=${diffSelection}`
        return this.SendRequest(url)
    }

    async SendRequest(url) {
        try {
            const resposne = await fetch(url)
            const { results } = await resposne.json()
            if (results == false) { throw ('No Result Check Filed Requirement') }
            return { resbonceState: true, results: results }
        } catch (error) {
            return { resbonceState: false, error: error }
        }
    }

}
