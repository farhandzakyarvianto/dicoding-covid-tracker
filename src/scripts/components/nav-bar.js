class NavBar extends HTMLElement {
    constructor() {
        super();
        this.shadowDOM = this.attachShadow({ mode: "open" });
    }

    connectedCallback() {
        this.render();
    }

    render() {
        this.shadowDOM.innerHTML = `
            <style>
            * {
                margin: 0;
                padding: 0;
                box-sizeing: border-box;
            }

            :host {
                display: block;
                width: 100%;
                padding: 10px;
                text-align: center;
                background-color: cornflowerblue;
                color: white;
                box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
            }

            span {
                font-weight: bold;
                font-size: 20px;
            }

            </style>

            <nav>
                <span>Covid Tracker</span>
            </nav>
        
        `;
    }
}

customElements.define("nav-bar", NavBar);
