import { RouterEngine, RouterEvents } from './plugins/router';
import routesConfiguration from './config/routes';
import * as dom from './plugins/dom';

let $loader = dom.findEl('.spinner'),
	$homeLink = dom.findById('app-title'),
	$mainContainer = dom.findById('app-view'),
	appRouter;

// Configure application title navigation
$homeLink.addEventListener('click', (event) => {
	event.preventDefault();
	RouterEngine.navTo(event.target.getAttribute('href'));
});

// Create a router instance and listen to it
appRouter = new RouterEngine($mainContainer, routesConfiguration); // TODO Pass handlers configuration

appRouter.on(RouterEvents.navigationStart, () => {
	$loader.classList.remove('hidden');	
});

appRouter.on(RouterEvents.navigationEnd, () => {
	$loader.classList.add('hidden');
	window.scrollTo(0, 0);
});

appRouter.on(RouterEvents.navigationError, (error) => {
	console.error('APP::errorHandler# TODO - Show error to the user:', error);
	console.error(error.stack);
});

appRouter.on(RouterEvents.routeNotFound, (path) => {
	console.error('APP::pageNotFoundHandler# Route not handled:', path);
});
