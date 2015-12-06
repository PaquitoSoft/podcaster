# SERVICE WORKERS

### Links
1. https://github.com/slightlyoff/ServiceWorker/blob/master/explainer.md
  * If you shift+reload a document it'll always load without a controller, which is handy for testing quick CSS & JS changes.
2. https://ponyfoo.com/articles/serviceworker-revolution#cached-then-network-and-postmessage
  * It should be noted that a ServiceWorker is scoped according to the endpoint we use to register the worker. If we just use /service-worker.js then the scope is the entire origin, but if you register a ServiceWorker with an endpoint like /js/service-worker.js, it’ll only be able to intercept requests on your origin scoped to /js/, such as /js/all.js – not at all useful.
  * There’s five possible states in the ServiceWorker lifecycle.
    * **installing** while blocked on event.waitUntil promises during the install event
    * **installed** while waiting to become active
    * **activating** while blocked on event.waitUntil promises during the activate event
    * **activated** when completely operational and able to intercept fetch requests
    * **redundant** when being replaced by a newer ServiceWorker script version, or being discarded due to a failed install
    * Note that, by default, fetch doesn’t include credentials such as cookies 
    * Apparently you can also explicitly set the scope of your worker by passing an object that specifies a scope property when you register the worker, like this:
      * navigator.serviceWorker.register('/dir/some-file.js', { scope: '/dir/' })
3. https://www.theguardian.com/info/developer-blog/2015/nov/04/building-an-offline-page-for-theguardiancom
4. https://ponyfoo.com/articles/progressive-networking-serviceworker
5. https://medium.com/@addyosmani/instant-loading-web-apps-with-an-application-shell-architecture-7c0c2f10c73#.n14ngdxhc
6. http://www.pocketjavascript.com/blog/2015/11/23/introducing-pokedex-org
