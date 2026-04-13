import './style.css'
import { createNavigation } from './navigation';
import { createPageContent } from './content';

const app = document.querySelector('#app');
app.appendChild(createNavigation());

const page = window.location.pathname;

switch (page) {
  case '/':
  case '/index.html':
    app.appendChild(createPageContent("<h1>Home</h1><p>Welcome to the home page!</p>"));
    break;
  case '/other.html':
    app.appendChild(createPageContent("<h1>Other</h1><p>This is the other page.</p>"));
    break;
  default:
    app.appendChild(createPageContent("<h1>404</h1><p>Page not found</p>"));
}