import { createPageContent } from './content';
import { createNavigation } from './navigation';
import './style.css'

const app = document.getElementById("app");
const page = window.location.pathname;

app.appendChild(createNavigation());

switch (page) {
    case "/":
    case "/index.html":
        app.appendChild(createPageContent(`
            <h1>Home page</h1>
            <p>Lorem ipsum etc.</p>
        `));
        break;
    case "/other.html":
        app.appendChild(createPageContent(`
            <h1>Other page</h1>
            <p>Under development</p>
        `));
        break;
    default:
        app.appendChild(createPageContent("<h1>404</h1><p>Oops. Nothing here.</p>"));
}
