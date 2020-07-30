class FooBar extends HTMLElement {
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
        :host {
            display: block;
            width: 100%;
            padding: 5px;
            text-align: center;
            background-color: cornflowerblue;
            box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
        }
        
        p {
            font-weight: bold;
            font-size: 10px;
            color: black;
        }

        img {
            width: 50px;
        }
        </style>

        <footer>
            <a 
                href="https://github.com/farhandzakyarvianto"
                target="__blank"
                >
                <img 
                    src="https://cdn.afterdawn.fi/v3/news/original/github-logo.png" 
                    alt="github"
                    />
            </a>
            <p>Farhan Dzaky &copy; 2020</p>
        </footer>
        `;
    }
}

customElements.define("foo-bar", FooBar);
