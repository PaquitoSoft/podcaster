/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _pluginsRouter = __webpack_require__(1);

	var _configRoutes = __webpack_require__(8);

	var _configRoutes2 = _interopRequireDefault(_configRoutes);

	var _pluginsDom = __webpack_require__(13);

	var dom = _interopRequireWildcard(_pluginsDom);

	var $loader = dom.findEl('.spinner'),
	    $homeLink = dom.findById('app-title'),
	    $mainContainer = dom.findById('app-view'),
	    appRouter = undefined;

	// Configure application title navigation
	$homeLink.addEventListener('click', function (event) {
		event.preventDefault();
		_pluginsRouter.RouterEngine.navTo(event.target.getAttribute('href'));
	});

	// Create a router instance and listen to it
	appRouter = new _pluginsRouter.RouterEngine($mainContainer, _configRoutes2['default']); // TODO Pass handlers configuration

	appRouter.on(_pluginsRouter.RouterEvents.navigationStart, function () {
		$loader.classList.remove('hidden');
	});

	appRouter.on(_pluginsRouter.RouterEvents.navigationEnd, function () {
		$loader.classList.add('hidden');
		window.scrollTo(0, 0);
	});

	appRouter.on(_pluginsRouter.RouterEvents.navigationError, function (error) {
		console.error('APP::errorHandler# TODO - Show error to the user:', error);
		console.error(error.stack);
	});

	appRouter.on(_pluginsRouter.RouterEvents.routeNotFound, function (path) {
		console.error('APP::pageNotFoundHandler# Route not handled:', path);
	});

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
		value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x6, _x7, _x8) { var _again = true; _function: while (_again) { var object = _x6, property = _x7, receiver = _x8; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x6 = parent; _x7 = property; _x8 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _mustache = __webpack_require__(2);

	var _mustache2 = _interopRequireDefault(_mustache);

	var _routePattern = __webpack_require__(3);

	var _routePattern2 = _interopRequireDefault(_routePattern);

	var _eventsEmitter = __webpack_require__(7);

	var _eventsEmitter2 = _interopRequireDefault(_eventsEmitter);

	var _dom = __webpack_require__(13);

	var dom = _interopRequireWildcard(_dom);

	// function noop(){};

	// As this is an constants object, do not allow to modify it
	var RouterEvents = Object.freeze({
		navigationStart: 'navigationStart',
		navigationEnd: 'navigationEnd',
		navigationError: 'navigationError',
		routeNotFound: 'routeNotFound'
	});

	exports.RouterEvents = RouterEvents;

	var RouterEngine = (function (_EventsEmitter) {
		_inherits(RouterEngine, _EventsEmitter);

		function RouterEngine($mainEl) {
			var routesHandlers = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
			var engineOptions = arguments.length <= 2 || arguments[2] === undefined ? { hashbang: true } : arguments[2];

			_classCallCheck(this, RouterEngine);

			_get(Object.getPrototypeOf(RouterEngine.prototype), 'constructor', this).call(this); // This seems to be required

			this.$mainEl = $mainEl;
			this.currentController;

			// this.registry = {};
			// for (let pathExpression in routesHandlers) {
			//	this.registry[RoutePattern.fromString(pathExpression)] = routesHandlers[pathExpression];
			// }
			this.registry = routesHandlers.map(function (routeConfig) {
				return {
					path: _routePattern2['default'].fromString(routeConfig.path),
					handler: routeConfig.handler
				};
			});

			window.addEventListener('popstate', this.processNavigation.bind(this));
			document.addEventListener('DOMContentLoaded', this.processNavigation.bind(this));
		}

		_createClass(RouterEngine, [{
			key: '_navigate',
			value: function _navigate(error, template, data) {
				if (error) {
					this.trigger(RouterEvents.navigationError, error);
				} else {
					this.$mainEl.innerHTML = _mustache2['default'].render(template, data, data.partials || {});
				}
			}
		}, {
			key: 'navigate',
			value: function navigate(error, Controller) {
				var data = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

				if (error) {
					this.trigger(RouterEvents.navigationError, error);
				} else {
					try {
						var ctrl = new Controller(data);

						// Clean up previous controller
						if (this.currentController) {
							this.currentController.destroy();
						}

						// dom.emptyEl(this.$mainEl);
						this.$mainEl.innerHTML = '';
						this.$mainEl.appendChild(ctrl.render());
						this.currentController = ctrl;
					} catch (err) {
						console.error('RouterEngine::navigate# Error navigating:', err);
						this.trigger(RouterEvents.navigationError, err);
					}
				}
			}
		}, {
			key: 'processRoute',
			value: function processRoute(path) {
				var state = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

				var routes = this.registry,
				    _path = path.replace(/^\/#/, ''),
				    i = 0,
				    len = routes.length;

				for (; i < len; i++) {
					if (routes[i].path.matches(_path)) {
						try {
							routes[i].handler.call(null, {
								url: _path,
								params: routes[i].path.match(_path),
								state: state
							}, this.navigate.bind(this));
							break;
						} catch (err) {
							console.warn('Router::processRoute# Error executing route handler:', err);
							this.trigger(RouterEvents.navigationError, err);
						}
					}
				}

				if (i === len) {
					console.warn('Router::processRoute# Route not handled:', _path);
					this.trigger(RouterEvents.routeNotFound, _path);
				}
			}
		}, {
			key: 'processNavigation',
			value: function processNavigation(event) {
				this.trigger(RouterEvents.navigationStart, event);
				var location = window.location,
				    path = location.pathname + location.search + location.hash;

				console.log('Plugins::router::processNavigation# Trying to navigate:', event);
				this.processRoute(path, event.state);

				this.trigger(RouterEvents.navigationEnd, event);
			}
		}], [{
			key: 'navTo',
			value: function navTo(path) {
				var state = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

				console.log('Plugins::router::navTo# Navigating to:', path);
				window.history.pushState(state, '', '#' + path); // NOTE: Template string
				window.dispatchEvent(new PopStateEvent('popstate', { state: state })); // NOTE: Enhanced object
			}
		}]);

		return RouterEngine;
	})(_eventsEmitter2['default']);

	exports.RouterEngine = RouterEngine;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
	 * mustache.js - Logic-less {{mustache}} templates with JavaScript
	 * http://github.com/janl/mustache.js
	 */

	/*global define: false Mustache: true*/

	(function defineMustache (global, factory) {
	  if (typeof exports === 'object' && exports && typeof exports.nodeName !== 'string') {
	    factory(exports); // CommonJS
	  } else if (true) {
	    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)); // AMD
	  } else {
	    global.Mustache = {};
	    factory(Mustache); // script, wsh, asp
	  }
	}(this, function mustacheFactory (mustache) {

	  var objectToString = Object.prototype.toString;
	  var isArray = Array.isArray || function isArrayPolyfill (object) {
	    return objectToString.call(object) === '[object Array]';
	  };

	  function isFunction (object) {
	    return typeof object === 'function';
	  }

	  /**
	   * More correct typeof string handling array
	   * which normally returns typeof 'object'
	   */
	  function typeStr (obj) {
	    return isArray(obj) ? 'array' : typeof obj;
	  }

	  function escapeRegExp (string) {
	    return string.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, '\\$&');
	  }

	  /**
	   * Null safe way of checking whether or not an object,
	   * including its prototype, has a given property
	   */
	  function hasProperty (obj, propName) {
	    return obj != null && typeof obj === 'object' && (propName in obj);
	  }

	  // Workaround for https://issues.apache.org/jira/browse/COUCHDB-577
	  // See https://github.com/janl/mustache.js/issues/189
	  var regExpTest = RegExp.prototype.test;
	  function testRegExp (re, string) {
	    return regExpTest.call(re, string);
	  }

	  var nonSpaceRe = /\S/;
	  function isWhitespace (string) {
	    return !testRegExp(nonSpaceRe, string);
	  }

	  var entityMap = {
	    '&': '&amp;',
	    '<': '&lt;',
	    '>': '&gt;',
	    '"': '&quot;',
	    "'": '&#39;',
	    '/': '&#x2F;'
	  };

	  function escapeHtml (string) {
	    return String(string).replace(/[&<>"'\/]/g, function fromEntityMap (s) {
	      return entityMap[s];
	    });
	  }

	  var whiteRe = /\s*/;
	  var spaceRe = /\s+/;
	  var equalsRe = /\s*=/;
	  var curlyRe = /\s*\}/;
	  var tagRe = /#|\^|\/|>|\{|&|=|!/;

	  /**
	   * Breaks up the given `template` string into a tree of tokens. If the `tags`
	   * argument is given here it must be an array with two string values: the
	   * opening and closing tags used in the template (e.g. [ "<%", "%>" ]). Of
	   * course, the default is to use mustaches (i.e. mustache.tags).
	   *
	   * A token is an array with at least 4 elements. The first element is the
	   * mustache symbol that was used inside the tag, e.g. "#" or "&". If the tag
	   * did not contain a symbol (i.e. {{myValue}}) this element is "name". For
	   * all text that appears outside a symbol this element is "text".
	   *
	   * The second element of a token is its "value". For mustache tags this is
	   * whatever else was inside the tag besides the opening symbol. For text tokens
	   * this is the text itself.
	   *
	   * The third and fourth elements of the token are the start and end indices,
	   * respectively, of the token in the original template.
	   *
	   * Tokens that are the root node of a subtree contain two more elements: 1) an
	   * array of tokens in the subtree and 2) the index in the original template at
	   * which the closing tag for that section begins.
	   */
	  function parseTemplate (template, tags) {
	    if (!template)
	      return [];

	    var sections = [];     // Stack to hold section tokens
	    var tokens = [];       // Buffer to hold the tokens
	    var spaces = [];       // Indices of whitespace tokens on the current line
	    var hasTag = false;    // Is there a {{tag}} on the current line?
	    var nonSpace = false;  // Is there a non-space char on the current line?

	    // Strips all whitespace tokens array for the current line
	    // if there was a {{#tag}} on it and otherwise only space.
	    function stripSpace () {
	      if (hasTag && !nonSpace) {
	        while (spaces.length)
	          delete tokens[spaces.pop()];
	      } else {
	        spaces = [];
	      }

	      hasTag = false;
	      nonSpace = false;
	    }

	    var openingTagRe, closingTagRe, closingCurlyRe;
	    function compileTags (tagsToCompile) {
	      if (typeof tagsToCompile === 'string')
	        tagsToCompile = tagsToCompile.split(spaceRe, 2);

	      if (!isArray(tagsToCompile) || tagsToCompile.length !== 2)
	        throw new Error('Invalid tags: ' + tagsToCompile);

	      openingTagRe = new RegExp(escapeRegExp(tagsToCompile[0]) + '\\s*');
	      closingTagRe = new RegExp('\\s*' + escapeRegExp(tagsToCompile[1]));
	      closingCurlyRe = new RegExp('\\s*' + escapeRegExp('}' + tagsToCompile[1]));
	    }

	    compileTags(tags || mustache.tags);

	    var scanner = new Scanner(template);

	    var start, type, value, chr, token, openSection;
	    while (!scanner.eos()) {
	      start = scanner.pos;

	      // Match any text between tags.
	      value = scanner.scanUntil(openingTagRe);

	      if (value) {
	        for (var i = 0, valueLength = value.length; i < valueLength; ++i) {
	          chr = value.charAt(i);

	          if (isWhitespace(chr)) {
	            spaces.push(tokens.length);
	          } else {
	            nonSpace = true;
	          }

	          tokens.push([ 'text', chr, start, start + 1 ]);
	          start += 1;

	          // Check for whitespace on the current line.
	          if (chr === '\n')
	            stripSpace();
	        }
	      }

	      // Match the opening tag.
	      if (!scanner.scan(openingTagRe))
	        break;

	      hasTag = true;

	      // Get the tag type.
	      type = scanner.scan(tagRe) || 'name';
	      scanner.scan(whiteRe);

	      // Get the tag value.
	      if (type === '=') {
	        value = scanner.scanUntil(equalsRe);
	        scanner.scan(equalsRe);
	        scanner.scanUntil(closingTagRe);
	      } else if (type === '{') {
	        value = scanner.scanUntil(closingCurlyRe);
	        scanner.scan(curlyRe);
	        scanner.scanUntil(closingTagRe);
	        type = '&';
	      } else {
	        value = scanner.scanUntil(closingTagRe);
	      }

	      // Match the closing tag.
	      if (!scanner.scan(closingTagRe))
	        throw new Error('Unclosed tag at ' + scanner.pos);

	      token = [ type, value, start, scanner.pos ];
	      tokens.push(token);

	      if (type === '#' || type === '^') {
	        sections.push(token);
	      } else if (type === '/') {
	        // Check section nesting.
	        openSection = sections.pop();

	        if (!openSection)
	          throw new Error('Unopened section "' + value + '" at ' + start);

	        if (openSection[1] !== value)
	          throw new Error('Unclosed section "' + openSection[1] + '" at ' + start);
	      } else if (type === 'name' || type === '{' || type === '&') {
	        nonSpace = true;
	      } else if (type === '=') {
	        // Set the tags for the next time around.
	        compileTags(value);
	      }
	    }

	    // Make sure there are no open sections when we're done.
	    openSection = sections.pop();

	    if (openSection)
	      throw new Error('Unclosed section "' + openSection[1] + '" at ' + scanner.pos);

	    return nestTokens(squashTokens(tokens));
	  }

	  /**
	   * Combines the values of consecutive text tokens in the given `tokens` array
	   * to a single token.
	   */
	  function squashTokens (tokens) {
	    var squashedTokens = [];

	    var token, lastToken;
	    for (var i = 0, numTokens = tokens.length; i < numTokens; ++i) {
	      token = tokens[i];

	      if (token) {
	        if (token[0] === 'text' && lastToken && lastToken[0] === 'text') {
	          lastToken[1] += token[1];
	          lastToken[3] = token[3];
	        } else {
	          squashedTokens.push(token);
	          lastToken = token;
	        }
	      }
	    }

	    return squashedTokens;
	  }

	  /**
	   * Forms the given array of `tokens` into a nested tree structure where
	   * tokens that represent a section have two additional items: 1) an array of
	   * all tokens that appear in that section and 2) the index in the original
	   * template that represents the end of that section.
	   */
	  function nestTokens (tokens) {
	    var nestedTokens = [];
	    var collector = nestedTokens;
	    var sections = [];

	    var token, section;
	    for (var i = 0, numTokens = tokens.length; i < numTokens; ++i) {
	      token = tokens[i];

	      switch (token[0]) {
	      case '#':
	      case '^':
	        collector.push(token);
	        sections.push(token);
	        collector = token[4] = [];
	        break;
	      case '/':
	        section = sections.pop();
	        section[5] = token[2];
	        collector = sections.length > 0 ? sections[sections.length - 1][4] : nestedTokens;
	        break;
	      default:
	        collector.push(token);
	      }
	    }

	    return nestedTokens;
	  }

	  /**
	   * A simple string scanner that is used by the template parser to find
	   * tokens in template strings.
	   */
	  function Scanner (string) {
	    this.string = string;
	    this.tail = string;
	    this.pos = 0;
	  }

	  /**
	   * Returns `true` if the tail is empty (end of string).
	   */
	  Scanner.prototype.eos = function eos () {
	    return this.tail === '';
	  };

	  /**
	   * Tries to match the given regular expression at the current position.
	   * Returns the matched text if it can match, the empty string otherwise.
	   */
	  Scanner.prototype.scan = function scan (re) {
	    var match = this.tail.match(re);

	    if (!match || match.index !== 0)
	      return '';

	    var string = match[0];

	    this.tail = this.tail.substring(string.length);
	    this.pos += string.length;

	    return string;
	  };

	  /**
	   * Skips all text until the given regular expression can be matched. Returns
	   * the skipped string, which is the entire tail if no match can be made.
	   */
	  Scanner.prototype.scanUntil = function scanUntil (re) {
	    var index = this.tail.search(re), match;

	    switch (index) {
	    case -1:
	      match = this.tail;
	      this.tail = '';
	      break;
	    case 0:
	      match = '';
	      break;
	    default:
	      match = this.tail.substring(0, index);
	      this.tail = this.tail.substring(index);
	    }

	    this.pos += match.length;

	    return match;
	  };

	  /**
	   * Represents a rendering context by wrapping a view object and
	   * maintaining a reference to the parent context.
	   */
	  function Context (view, parentContext) {
	    this.view = view;
	    this.cache = { '.': this.view };
	    this.parent = parentContext;
	  }

	  /**
	   * Creates a new context using the given view with this context
	   * as the parent.
	   */
	  Context.prototype.push = function push (view) {
	    return new Context(view, this);
	  };

	  /**
	   * Returns the value of the given name in this context, traversing
	   * up the context hierarchy if the value is absent in this context's view.
	   */
	  Context.prototype.lookup = function lookup (name) {
	    var cache = this.cache;

	    var value;
	    if (cache.hasOwnProperty(name)) {
	      value = cache[name];
	    } else {
	      var context = this, names, index, lookupHit = false;

	      while (context) {
	        if (name.indexOf('.') > 0) {
	          value = context.view;
	          names = name.split('.');
	          index = 0;

	          /**
	           * Using the dot notion path in `name`, we descend through the
	           * nested objects.
	           *
	           * To be certain that the lookup has been successful, we have to
	           * check if the last object in the path actually has the property
	           * we are looking for. We store the result in `lookupHit`.
	           *
	           * This is specially necessary for when the value has been set to
	           * `undefined` and we want to avoid looking up parent contexts.
	           **/
	          while (value != null && index < names.length) {
	            if (index === names.length - 1)
	              lookupHit = hasProperty(value, names[index]);

	            value = value[names[index++]];
	          }
	        } else {
	          value = context.view[name];
	          lookupHit = hasProperty(context.view, name);
	        }

	        if (lookupHit)
	          break;

	        context = context.parent;
	      }

	      cache[name] = value;
	    }

	    if (isFunction(value))
	      value = value.call(this.view);

	    return value;
	  };

	  /**
	   * A Writer knows how to take a stream of tokens and render them to a
	   * string, given a context. It also maintains a cache of templates to
	   * avoid the need to parse the same template twice.
	   */
	  function Writer () {
	    this.cache = {};
	  }

	  /**
	   * Clears all cached templates in this writer.
	   */
	  Writer.prototype.clearCache = function clearCache () {
	    this.cache = {};
	  };

	  /**
	   * Parses and caches the given `template` and returns the array of tokens
	   * that is generated from the parse.
	   */
	  Writer.prototype.parse = function parse (template, tags) {
	    var cache = this.cache;
	    var tokens = cache[template];

	    if (tokens == null)
	      tokens = cache[template] = parseTemplate(template, tags);

	    return tokens;
	  };

	  /**
	   * High-level method that is used to render the given `template` with
	   * the given `view`.
	   *
	   * The optional `partials` argument may be an object that contains the
	   * names and templates of partials that are used in the template. It may
	   * also be a function that is used to load partial templates on the fly
	   * that takes a single argument: the name of the partial.
	   */
	  Writer.prototype.render = function render (template, view, partials) {
	    var tokens = this.parse(template);
	    var context = (view instanceof Context) ? view : new Context(view);
	    return this.renderTokens(tokens, context, partials, template);
	  };

	  /**
	   * Low-level method that renders the given array of `tokens` using
	   * the given `context` and `partials`.
	   *
	   * Note: The `originalTemplate` is only ever used to extract the portion
	   * of the original template that was contained in a higher-order section.
	   * If the template doesn't use higher-order sections, this argument may
	   * be omitted.
	   */
	  Writer.prototype.renderTokens = function renderTokens (tokens, context, partials, originalTemplate) {
	    var buffer = '';

	    var token, symbol, value;
	    for (var i = 0, numTokens = tokens.length; i < numTokens; ++i) {
	      value = undefined;
	      token = tokens[i];
	      symbol = token[0];

	      if (symbol === '#') value = this.renderSection(token, context, partials, originalTemplate);
	      else if (symbol === '^') value = this.renderInverted(token, context, partials, originalTemplate);
	      else if (symbol === '>') value = this.renderPartial(token, context, partials, originalTemplate);
	      else if (symbol === '&') value = this.unescapedValue(token, context);
	      else if (symbol === 'name') value = this.escapedValue(token, context);
	      else if (symbol === 'text') value = this.rawValue(token);

	      if (value !== undefined)
	        buffer += value;
	    }

	    return buffer;
	  };

	  Writer.prototype.renderSection = function renderSection (token, context, partials, originalTemplate) {
	    var self = this;
	    var buffer = '';
	    var value = context.lookup(token[1]);

	    // This function is used to render an arbitrary template
	    // in the current context by higher-order sections.
	    function subRender (template) {
	      return self.render(template, context, partials);
	    }

	    if (!value) return;

	    if (isArray(value)) {
	      for (var j = 0, valueLength = value.length; j < valueLength; ++j) {
	        buffer += this.renderTokens(token[4], context.push(value[j]), partials, originalTemplate);
	      }
	    } else if (typeof value === 'object' || typeof value === 'string' || typeof value === 'number') {
	      buffer += this.renderTokens(token[4], context.push(value), partials, originalTemplate);
	    } else if (isFunction(value)) {
	      if (typeof originalTemplate !== 'string')
	        throw new Error('Cannot use higher-order sections without the original template');

	      // Extract the portion of the original template that the section contains.
	      value = value.call(context.view, originalTemplate.slice(token[3], token[5]), subRender);

	      if (value != null)
	        buffer += value;
	    } else {
	      buffer += this.renderTokens(token[4], context, partials, originalTemplate);
	    }
	    return buffer;
	  };

	  Writer.prototype.renderInverted = function renderInverted (token, context, partials, originalTemplate) {
	    var value = context.lookup(token[1]);

	    // Use JavaScript's definition of falsy. Include empty arrays.
	    // See https://github.com/janl/mustache.js/issues/186
	    if (!value || (isArray(value) && value.length === 0))
	      return this.renderTokens(token[4], context, partials, originalTemplate);
	  };

	  Writer.prototype.renderPartial = function renderPartial (token, context, partials) {
	    if (!partials) return;

	    var value = isFunction(partials) ? partials(token[1]) : partials[token[1]];
	    if (value != null)
	      return this.renderTokens(this.parse(value), context, partials, value);
	  };

	  Writer.prototype.unescapedValue = function unescapedValue (token, context) {
	    var value = context.lookup(token[1]);
	    if (value != null)
	      return value;
	  };

	  Writer.prototype.escapedValue = function escapedValue (token, context) {
	    var value = context.lookup(token[1]);
	    if (value != null)
	      return mustache.escape(value);
	  };

	  Writer.prototype.rawValue = function rawValue (token) {
	    return token[1];
	  };

	  mustache.name = 'mustache.js';
	  mustache.version = '2.2.0';
	  mustache.tags = [ '{{', '}}' ];

	  // All high-level mustache.* functions use this writer.
	  var defaultWriter = new Writer();

	  /**
	   * Clears all cached templates in the default writer.
	   */
	  mustache.clearCache = function clearCache () {
	    return defaultWriter.clearCache();
	  };

	  /**
	   * Parses and caches the given template in the default writer and returns the
	   * array of tokens it contains. Doing this ahead of time avoids the need to
	   * parse templates on the fly as they are rendered.
	   */
	  mustache.parse = function parse (template, tags) {
	    return defaultWriter.parse(template, tags);
	  };

	  /**
	   * Renders the `template` with the given `view` and `partials` using the
	   * default writer.
	   */
	  mustache.render = function render (template, view, partials) {
	    if (typeof template !== 'string') {
	      throw new TypeError('Invalid template! Template should be a "string" ' +
	                          'but "' + typeStr(template) + '" was given as the first ' +
	                          'argument for mustache#render(template, view, partials)');
	    }

	    return defaultWriter.render(template, view, partials);
	  };

	  // This is here for backwards compatibility with 0.4.x.,
	  /*eslint-disable */ // eslint wants camel cased function name
	  mustache.to_html = function to_html (template, view, partials, send) {
	    /*eslint-enable*/

	    var result = mustache.render(template, view, partials);

	    if (isFunction(send)) {
	      send(result);
	    } else {
	      return result;
	    }
	  };

	  // Export the escaping function so that the user may override it.
	  // See https://github.com/janl/mustache.js/issues/244
	  mustache.escape = escapeHtml;

	  // Export these mainly for testing, but also for advanced usage.
	  mustache.Scanner = Scanner;
	  mustache.Context = Context;
	  mustache.Writer = Writer;

	}));


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var querystring = __webpack_require__(4);

	// # Utility functions
	//
	// ## Shallow merge two or more objects, e.g.
	// merge({a: 1, b: 2}, {a: 2}, {a: 3}) => {a: 3, b: 2}
	function merge() {
	  return [].slice.call(arguments).reduce(function (merged, source) {
	    for (var prop in source) {
	      merged[prop] = source[prop];
	    }
	    return merged;
	  }, {});
	}

	// Split a location string into different parts, e.g.:
	// splitLocation("/foo/bar?fruit=apple#some-hash") => {
	//  path: "/foo/bar", queryString: "fruit=apple", hash: "some-hash" 
	// }
	function splitLocation(location) {
	  var re = /([^\?#]*)?(\?[^#]*)?(#.*)?$/;
	  var match = re.exec(location);
	  return {
	    path: match[1] || '',
	    queryString: match[2] && match[2].substring(1) || '',
	    hash: match[3] && match[3].substring(1) || ''
	  }
	}

	// # QueryStringPattern
	// The QueryStringPattern holds a compiled version of the query string part of a route string, i.e.
	// ?foo=:foo&fruit=:fruit
	var QueryStringPattern = (function () {

	  // The RoutePattern constructor
	  // Takes a route string or regexp as parameter and provides a set of utility functions for matching against a 
	  // location path
	  function QueryStringPattern(options) {

	    // The query parameters specified
	    this.params = options.params;

	    // if allowWildcards is set to true, unmatched query parameters will be ignored
	    this.allowWildcards = options.allowWildcards;

	    // The original route string (optional)
	    this.routeString = options.routeString;
	  }

	  QueryStringPattern.prototype.matches = function (queryString) {
	    var givenParams = (queryString || '').split("&").reduce(function (params, pair) {
	      var parts = pair.split("="),
	        name = parts[0],
	        value = parts[1];
	      if (name) params[name] = value;
	      return params;
	    }, {});

	    var requiredParam, requiredParams = [].concat(this.params);
	    while (requiredParam = requiredParams.shift()) {
	      if (!givenParams.hasOwnProperty(requiredParam.key)) return false;
	      if (requiredParam.value && givenParams[requiredParam.key] != requiredParam.value) return false;
	    }
	    if (!this.allowWildcards && this.params.length) {
	      if (Object.getOwnPropertyNames(givenParams).length > this.params.length) return false;
	    }
	    return true;
	  };

	  QueryStringPattern.prototype.match = function (queryString) {

	    if (!this.matches(queryString)) return null;

	    var data = {
	      params: [],
	      namedParams: {},
	      namedQueryParams: {}
	    };

	    if (!queryString) {
	      return data;
	    }

	    // Create a mapping from each key in params to their named param
	    var namedParams = this.params.reduce(function (names, param) {
	      names[param.key] = param.name;
	      return names;
	    }, {});

	    var parsedQueryString = querystring.parse(queryString);
	    Object.keys(parsedQueryString).forEach(function(key) {
	      var value = parsedQueryString[key];
	      data.params.push(value);
	      if (namedParams[key]) {
	        data.namedQueryParams[namedParams[key]] = data.namedParams[namedParams[key]] = value;
	      }
	    });
	    return data;
	  };

	  QueryStringPattern.fromString = function (routeString) {

	    var options = {
	      routeString: routeString,
	      allowWildcards: false,
	      params: []
	    };

	    // Extract named parameters from the route string
	    // Construct an array with some metadata about each of the named parameters
	    routeString.split("&").forEach(function (pair) {
	      if (!pair) return;

	      var parts = pair.split("="),
	        name = parts[0],
	        value = parts[1] || '';

	      var wildcard = false;

	      var param = { key: name };

	      // Named parameters starts with ":"
	      if (value.charAt(0) == ':') {
	        // Thus the name of the parameter is whatever comes after ":"
	        param.name = value.substring(1);
	      }
	      else if (name == '*' && value == '') {
	        // If current param is a wildcard parameter, the options are flagged as accepting wildcards
	        // and the current parameter is not added to the options' list of params
	        wildcard = options.allowWildcards = true;
	      }
	      else {
	        // The value is an exact match, i.e. the route string 
	        // page=search&q=:query will match only when the page parameter is "search"
	        param.value = value;
	      }
	      if (!wildcard) {
	        options.params.push(param);
	      }
	    });
	    return new QueryStringPattern(options);
	  };

	  return QueryStringPattern;
	})();

	// # PathPattern
	// The PathPattern holds a compiled version of the path part of a route string, i.e.
	// /some/:dir
	var PathPattern = (function () {

	  // These are the regexps used to construct a regular expression from a route pattern string
	  // Based on route patterns in Backbone.js
	  var
	    pathParam = /:\w+/g,
	    splatParam = /\*\w+/g,
	    namedParams = /(:[^\/\.]+)|(\*\w+)/g,
	    subPath = /\*/g,
	    escapeRegExp = /[-[\]{}()+?.,\\^$|#\s]/g;

	  // The PathPattern constructor
	  // Takes a route string or regexp as parameter and provides a set of utility functions for matching against a 
	  // location path
	  function PathPattern(options) {
	    // The route string are compiled to a regexp (if it isn't already)
	    this.regexp = options.regexp;

	    // The query parameters specified in the path part of the route
	    this.params = options.params;

	    // The original routestring (optional)
	    this.routeString = options.routeString;
	  }

	  PathPattern.prototype.matches = function (pathname) {
	    return this.regexp.test(pathname);
	  };

	  // Extracts all matched parameters
	  PathPattern.prototype.match = function (pathname) {

	    if (!this.matches(pathname)) return null;
	    
	    // The captured data from pathname
	    var data = {
	      params: [],
	      namedParams: {}
	    };

	    // Using a regexp to capture named parameters on the pathname (the order of the parameters is significant)
	    (this.regexp.exec(pathname) || []).slice(1).forEach(function (value, idx) {
	      if(value !== undefined) {
	        value = decodeURIComponent(value);
	      }

	      data.namedParams[this.params[idx]] = value;
	      data.params.push(value);
	    }, this);

	    return data;
	  };

	  PathPattern.routePathToRegexp = function (path) {
	    path = path
	      .replace(escapeRegExp, "\\$&")
	      .replace(pathParam, "([^/]+)")
	      .replace(splatParam, "(.*)?")
	      .replace(subPath, ".*?")
	      .replace(/\/?$/, "/?");
	    return new RegExp("^/?" + path + "$");
	  };

	  // This compiles a route string into a set of options which a new PathPattern is created with 
	  PathPattern.fromString = function (routeString) {

	    // Whatever comes after ? and # is ignored
	    routeString = routeString.split(/\?|#/)[0];

	    // Create the options object
	    // Keep the original routeString and a create a regexp for the pathname part of the url
	    var options = {
	      routeString: routeString,
	      regexp: PathPattern.routePathToRegexp(routeString),
	      params: (routeString.match(namedParams) || []).map(function (param) {
	        return param.substring(1);
	      })
	    };

	    // Options object are created, now instantiate the PathPattern
	    return new PathPattern(options);
	  };

	  return PathPattern;
	}());

	// # RegExpPattern
	// The RegExpPattern is just a simple wrapper around a regex, used to provide a similar api as the other route patterns
	var RegExpPattern = (function () {
	  // The RegExpPattern constructor
	  // Wraps a regexp and provides a *Pattern api for it
	  function RegExpPattern(regex) {
	    this.regex = regex;
	  }

	  RegExpPattern.prototype.matches = function (loc) {
	    return this.regex.test(loc);
	  };

	  // Extracts all matched parameters
	  RegExpPattern.prototype.match = function (location) {

	    if (!this.matches(location)) return null;

	    var loc = splitLocation(location);

	    return {
	      params: this.regex.exec(location).slice(1),
	      queryParams: querystring.parse(loc.queryString),
	      namedParams: {}
	    };
	  };

	  return RegExpPattern;
	}());

	// # RoutePattern
	// The RoutePattern combines the PathPattern and the QueryStringPattern so it can represent a full location
	// (excluding the scheme + domain part)
	// It also allows for having path-like routes in the hash part of the location
	// Allows for route strings like:
	// /some/:page?param=:param&foo=:foo#:bookmark
	// /some/:page?param=:param&foo=:foo#/:section/:bookmark
	// 
	// Todo: maybe allow for parameterization of the kind of route pattern to use for the hash?
	// Maybe use the QueryStringPattern for cases like
	// /some/:page?param=:param&foo=:foo#?onlyCareAbout=:thisPartOfTheHash&*
	// Need to test how browsers handles urls like that
	var RoutePattern = (function () {

	  // The RoutePattern constructor
	  // Takes a route string or regexp as parameter and provides a set of utility functions for matching against a 
	  // location path
	  function RoutePattern(options) {
	    // The route string are compiled to a regexp (if it isn't already)
	    this.pathPattern = options.pathPattern;
	    this.queryStringPattern = options.queryStringPattern;
	    this.hashPattern = options.hashPattern;

	    // The original routestring (optional)
	    this.routeString = options.routeString;
	  }

	  RoutePattern.prototype.matches = function (location) {
	    // Whatever comes after ? and # is ignored
	    var loc = splitLocation(location);

	    return (!this.pathPattern || this.pathPattern.matches(loc.path)) &&
	      (!this.queryStringPattern || this.queryStringPattern.matches(loc.queryString) ) &&
	      (!this.hashPattern || this.hashPattern.matches(loc.hash))
	  };

	  // Extracts all matched parameters
	  RoutePattern.prototype.match = function (location) {

	    if (!this.matches(location)) return null;

	    // Whatever comes after ? and # is ignored
	    var loc = splitLocation(location),
	      match,
	      pattern;

	    var data = {
	      params: [],
	      namedParams: {},
	      pathParams: {},
	      queryParams: querystring.parse(loc.queryString),
	      namedQueryParams: {},
	      hashParams: {}
	    };

	    var addMatch = function (match) {
	      data.params = data.params.concat(match.params);
	      data.namedParams = merge(data.namedParams, match.namedParams);
	    };

	    if (pattern = this.pathPattern) {
	      match = pattern.match(loc.path);
	      if (match) addMatch(match);
	      data.pathParams = match ? match.namedParams : {};
	    }
	    if (pattern = this.queryStringPattern) {
	      match = pattern.match(loc.queryString);
	      if (match) addMatch(match);
	      data.namedQueryParams = match ? match.namedQueryParams : {};
	    }
	    if (pattern = this.hashPattern) {
	      match = pattern.match(loc.hash);
	      if (match) addMatch(match);
	      data.hashParams = match ? match.namedParams : {};
	    }
	    return data;
	  };

	  // This compiles a route string into a set of options which a new RoutePattern is created with 
	  RoutePattern.fromString = function (routeString) {
	    var parts = splitLocation(routeString);

	    var matchPath = parts.path;
	    var matchQueryString = parts.queryString || routeString.indexOf("?") > -1;
	    var matchHash = parts.hash || routeString.indexOf("#") > -1;

	    // Options object are created, now instantiate the RoutePattern
	    return new RoutePattern({
	      pathPattern: matchPath && PathPattern.fromString(parts.path),
	      queryStringPattern: matchQueryString && QueryStringPattern.fromString(parts.queryString),
	      hashPattern: matchHash && PathPattern.fromString(parts.hash),
	      routeString: routeString
	    });
	  };

	  return RoutePattern;
	}());

	// CommonJS export
	module.exports = RoutePattern;

	// Also export the individual pattern classes
	RoutePattern.QueryStringPattern = QueryStringPattern;
	RoutePattern.PathPattern = PathPattern;
	RoutePattern.RegExpPattern = RegExpPattern;


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.decode = exports.parse = __webpack_require__(5);
	exports.encode = exports.stringify = __webpack_require__(6);


/***/ },
/* 5 */
/***/ function(module, exports) {

	// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.

	'use strict';

	// If obj.hasOwnProperty has been overridden, then calling
	// obj.hasOwnProperty(prop) will break.
	// See: https://github.com/joyent/node/issues/1707
	function hasOwnProperty(obj, prop) {
	  return Object.prototype.hasOwnProperty.call(obj, prop);
	}

	module.exports = function(qs, sep, eq, options) {
	  sep = sep || '&';
	  eq = eq || '=';
	  var obj = {};

	  if (typeof qs !== 'string' || qs.length === 0) {
	    return obj;
	  }

	  var regexp = /\+/g;
	  qs = qs.split(sep);

	  var maxKeys = 1000;
	  if (options && typeof options.maxKeys === 'number') {
	    maxKeys = options.maxKeys;
	  }

	  var len = qs.length;
	  // maxKeys <= 0 means that we should not limit keys count
	  if (maxKeys > 0 && len > maxKeys) {
	    len = maxKeys;
	  }

	  for (var i = 0; i < len; ++i) {
	    var x = qs[i].replace(regexp, '%20'),
	        idx = x.indexOf(eq),
	        kstr, vstr, k, v;

	    if (idx >= 0) {
	      kstr = x.substr(0, idx);
	      vstr = x.substr(idx + 1);
	    } else {
	      kstr = x;
	      vstr = '';
	    }

	    k = decodeURIComponent(kstr);
	    v = decodeURIComponent(vstr);

	    if (!hasOwnProperty(obj, k)) {
	      obj[k] = v;
	    } else if (isArray(obj[k])) {
	      obj[k].push(v);
	    } else {
	      obj[k] = [obj[k], v];
	    }
	  }

	  return obj;
	};

	var isArray = Array.isArray || function (xs) {
	  return Object.prototype.toString.call(xs) === '[object Array]';
	};


/***/ },
/* 6 */
/***/ function(module, exports) {

	// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.

	'use strict';

	var stringifyPrimitive = function(v) {
	  switch (typeof v) {
	    case 'string':
	      return v;

	    case 'boolean':
	      return v ? 'true' : 'false';

	    case 'number':
	      return isFinite(v) ? v : '';

	    default:
	      return '';
	  }
	};

	module.exports = function(obj, sep, eq, name) {
	  sep = sep || '&';
	  eq = eq || '=';
	  if (obj === null) {
	    obj = undefined;
	  }

	  if (typeof obj === 'object') {
	    return map(objectKeys(obj), function(k) {
	      var ks = encodeURIComponent(stringifyPrimitive(k)) + eq;
	      if (isArray(obj[k])) {
	        return map(obj[k], function(v) {
	          return ks + encodeURIComponent(stringifyPrimitive(v));
	        }).join(sep);
	      } else {
	        return ks + encodeURIComponent(stringifyPrimitive(obj[k]));
	      }
	    }).join(sep);

	  }

	  if (!name) return '';
	  return encodeURIComponent(stringifyPrimitive(name)) + eq +
	         encodeURIComponent(stringifyPrimitive(obj));
	};

	var isArray = Array.isArray || function (xs) {
	  return Object.prototype.toString.call(xs) === '[object Array]';
	};

	function map (xs, f) {
	  if (xs.map) return xs.map(f);
	  var res = [];
	  for (var i = 0; i < xs.length; i++) {
	    res.push(f(xs[i], i));
	  }
	  return res;
	}

	var objectKeys = Object.keys || function (obj) {
	  var res = [];
	  for (var key in obj) {
	    if (Object.prototype.hasOwnProperty.call(obj, key)) res.push(key);
	  }
	  return res;
	};


/***/ },
/* 7 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var EventsEmitter = (function () {
		function EventsEmitter() {
			_classCallCheck(this, EventsEmitter);

			this.eventsRegistry = {};
		}

		_createClass(EventsEmitter, [{
			key: "on",
			value: function on(eventName, listener) {
				var listeners = this.eventsRegistry[eventName] || [];
				listeners.push(listener);
				this.eventsRegistry[eventName] = listeners;
			}
		}, {
			key: "off",
			value: function off(eventName, listener) {
				var listeners = this.eventsRegistry[eventName] || [],
				    index = listeners.indexOf(listener);

				if (index >= 0) {
					listeners.splice(index, 1);
				}
			}
		}, {
			key: "trigger",
			value: function trigger(eventName) {
				var data = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

				var listeners = this.eventsRegistry[eventName] || [],
				    listener = undefined;

				var _iteratorNormalCompletion = true;
				var _didIteratorError = false;
				var _iteratorError = undefined;

				try {
					for (var _iterator = listeners[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
						listener = _step.value;

						try {
							listener.call(this, data);
						} catch (e) {
							// TODO: Log error
							console.warn("Error triggering event with name " + eventName, e);
							console.warn(e.stack);
						}
					}
				} catch (err) {
					_didIteratorError = true;
					_iteratorError = err;
				} finally {
					try {
						if (!_iteratorNormalCompletion && _iterator["return"]) {
							_iterator["return"]();
						}
					} finally {
						if (_didIteratorError) {
							throw _iteratorError;
						}
					}
				}
			}
		}]);

		return EventsEmitter;
	})();

	exports["default"] = EventsEmitter;
	module.exports = exports["default"];

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
		value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _modelsPodcast = __webpack_require__(9);

	var _modelsPodcast2 = _interopRequireDefault(_modelsPodcast);

	var _controllersHomeController = __webpack_require__(17);

	var _controllersHomeController2 = _interopRequireDefault(_controllersHomeController);

	var _controllersPodcastController = __webpack_require__(19);

	var _controllersPodcastController2 = _interopRequireDefault(_controllersPodcastController);

	exports['default'] = [{
		path: '/',
		handler: function homePageController(context, next) {
			_modelsPodcast2['default'].findAll().then(function (data) {
				next(null, _controllersHomeController2['default'], {
					podcasts: data
				});
			})['catch'](next);
		}
	}, {
		path: '/podcast/:podcastId',
		handler: function podcastController(context, next) {
			console.log('Routes::podcastController# Context:', context);
			_modelsPodcast2['default'].findById(context.params.namedParams.podcastId).then(function (data) {
				next(null, _controllersPodcastController2['default'], {
					podcast: data
				});
			})['catch'](next);
		}
	}

	/*,
	'/podcast/:podcastId': function podcastController(context, next) {
		PodcastModel.findById(context.params.podcastId)
			.then(function(data) {
				next(null, PodcastPage, {
					podcast: data
				});
			})
			.catch(next);
	},
	'/podcast/:podcastId/episode/:episodeId': function episodeController(context, next) {
		// When loading the page in this route we need to fetch the data
		if (!context.state.episode) {
			PodcastModel.findById(context.params.podcastId)
				.then(function(podcast) {
					next(null, EpisodePage, {
						podcast: podcast,
						episode: podcast.episodes.filter(function(ep) {
							return ep.id === context.params.episodeId;
						})[0]
					});
				})
				.catch(next);
		} else {
			next(null, EpisodePage);
		}
	}*/
	];
	module.exports = exports['default'];

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
		value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	var _lscache = __webpack_require__(11);

	var _lscache2 = _interopRequireDefault(_lscache);

	var _pluginsAjax = __webpack_require__(14);

	var ajax = _interopRequireWildcard(_pluginsAjax);

	var _pluginsDom = __webpack_require__(13);

	var dom = _interopRequireWildcard(_pluginsDom);

	var PODCASTS_DATASOURCE_URL = 'https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json';
	var PODCAST_ID_DATASOURCE_URL = 'https://itunes.apple.com/lookup?id=';
	var PODCAST_CACHE_PREFIX = 'podcast-data_';
	var CORS_SERVICE_URL = 'http://crossorigin.me/';
	var FAVORITES_SERVICE_URL = 'https://ps-podcaster.firebaseio.com/favorites.json';

	var PODCASTS_LIST_CACHE_TTL = 1440; // minutes (one day)
	var PODCAST_DETAIL_CACHE_TTL = 2880; // (two days)
	// const PODCASTS_LIST_CACHE_TTL = 1; // minutes (one day)
	// const PODCAST_DETAIL_CACHE_TTL = 2; // (two days)

	function getPodcastLite(podcastId) {
		return new Promise(function (resolve, reject) {
			Podcast.findAll().then(function (podcasts) {
				var podcast = podcasts.filter(function (pod) {
					return podcastId === pod.id;
				});
				if (podcast.length) {
					resolve(podcast[0]);
				} else {
					reject(new Error('Podcast not found: ' + podcastId));
				}
			})['catch'](reject);
		});
	}

	function fetchPodcastFeedUrl(podcast) {
		return new Promise(function (resolve, reject) {
			ajax.getJsonp(PODCAST_ID_DATASOURCE_URL + podcast.id).then(function (data) {
				if (data.results.length) {
					podcast.feedUrl = data.results[0].feedUrl;
					resolve(podcast);
				} else {
					reject(new Error('No feed Url found for podcast: ' + podcast.id));
				}
			})['catch'](reject);
		});
	}

	function fetchPodcastEpisodes(podcast) {
		return new Promise(function (resolve, reject) {
			ajax.getXml(CORS_SERVICE_URL + podcast.feedUrl).then(function (podcastDoc) {
				// We need to get iTunes XML namespace for accessing episodes duration
				var itunesNS = dom.findEl('rss', podcastDoc).getAttribute('xmlns:itunes'),
				    episodeIds = 0;

				// https://developer.mozilla.org/en/docs/Web/API/NodeList
				// [...podcastDoc.querySelectorAll('rss channel item')].forEach(p => {
				//	console.log(p);
				// });
				podcast.episodes = dom.findEls('rss channel item', podcastDoc).map(function (p) {
					var desc = p.querySelector('description'),
					    pubDate = p.querySelector('pubDate'),
					    duration = p.getElementsByTagNameNS(itunesNS, 'duration')[0],
					    enclosure = p.querySelector('enclosure');

					return {
						id: podcast.id + '_' + episodeIds++,
						title: p.querySelector('title').textContent,
						description: desc ? desc.textContent : '',
						date: pubDate ? new Date(pubDate.textContent).toLocaleDateString() : '',
						timestamp: pubDate ? new Date(pubDate.textContent).getTime() : 0,
						// http://stackoverflow.com/questions/4288232/javascript-xml-parser-how-to-get-nodes-that-have-in-the-name
						duration: duration ? duration.textContent : '--',
						mediaUrl: enclosure ? enclosure.getAttribute('url') : ''
					};
				});

				resolve(podcast);
			})['catch'](reject);
		});
	}

	function createModels(rawPodcastData) {
		return Promise.resolve(rawPodcastData.feed.entry.map(function (raw) {
			return new Podcast(raw);
		}));
	}

	var Podcast = (function () {
		function Podcast(rawData) {
			_classCallCheck(this, Podcast);

			if (rawData) {
				this.id = rawData.id.attributes['im:id'];
				this.name = rawData['im:name'].label;
				this.author = rawData['im:artist'].label;
				this.description = rawData.summary ? rawData.summary.label : '';
				if (rawData['im:releaseDate']) {
					this.releaseDate = rawData['im:releaseDate'].attributes.label; // rawData['im:releaseDate'].label => zulu date
					this.lastEpisodeDate = new Date(rawData['im:releaseDate'].label).getTime();
				}
				this.cover = rawData['im:image'].filter(function (imageData) {
					return imageData.attributes.height === '170';
				})[0].label;
			} else {
				this.id = '';
			}

			this.episodes = [];
		}

		_createClass(Podcast, null, [{
			key: 'findAll',
			value: function findAll() {
				return ajax.getJson(PODCASTS_DATASOURCE_URL, { ttl: PODCASTS_LIST_CACHE_TTL }).then(createModels);
			}
		}, {
			key: 'findById',
			value: function findById(podcastId) {
				var cacheKey = PODCAST_CACHE_PREFIX + podcastId,
				    podcast = _lscache2['default'].get(cacheKey);

				if (podcast) {
					return Promise.resolve(podcast);
				} else {
					return new Promise(function (resolve, reject) {
						getPodcastLite(podcastId).then(fetchPodcastFeedUrl).then(fetchPodcastEpisodes).then(function (data) {
							_lscache2['default'].set(cacheKey, data, PODCAST_DETAIL_CACHE_TTL);
							resolve(data);
						})['catch'](reject);
					});
				}
			}
		}]);

		return Podcast;
	})();

	exports['default'] = Podcast;
	module.exports = exports['default'];

/***/ },
/* 10 */,
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/**
	 * lscache library
	 * Copyright (c) 2011, Pamela Fox
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 *       http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 */

	/* jshint undef:true, browser:true, node:true */
	/* global define */

	(function (root, factory) {
	    if (true) {
	        // AMD. Register as an anonymous module.
	        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	    } else if (typeof module !== "undefined" && module.exports) {
	        // CommonJS/Node module
	        module.exports = factory();
	    } else {
	        // Browser globals
	        root.lscache = factory();
	    }
	}(this, function () {

	  // Prefix for all lscache keys
	  var CACHE_PREFIX = 'lscache-';

	  // Suffix for the key name on the expiration items in localStorage
	  var CACHE_SUFFIX = '-cacheexpiration';

	  // expiration date radix (set to Base-36 for most space savings)
	  var EXPIRY_RADIX = 10;

	  // time resolution in minutes
	  var EXPIRY_UNITS = 60 * 1000;

	  // ECMAScript max Date (epoch + 1e8 days)
	  var MAX_DATE = Math.floor(8.64e15/EXPIRY_UNITS);

	  var cachedStorage;
	  var cachedJSON;
	  var cacheBucket = '';
	  var warnings = false;

	  // Determines if localStorage is supported in the browser;
	  // result is cached for better performance instead of being run each time.
	  // Feature detection is based on how Modernizr does it;
	  // it's not straightforward due to FF4 issues.
	  // It's not run at parse-time as it takes 200ms in Android.
	  function supportsStorage() {
	    var key = '__lscachetest__';
	    var value = key;

	    if (cachedStorage !== undefined) {
	      return cachedStorage;
	    }

	    try {
	      setItem(key, value);
	      removeItem(key);
	      cachedStorage = true;
	    } catch (e) {
	        if (isOutOfSpace(e)) {    // If we hit the limit, then it means we have support, 
	            cachedStorage = true; // just maxed it out and even the set test failed.
	        } else {
	            cachedStorage = false;
	        }
	    }
	    return cachedStorage;
	  }

	  // Check to set if the error is us dealing with being out of space
	  function isOutOfSpace(e) {
	    if (e && e.name === 'QUOTA_EXCEEDED_ERR' || 
	            e.name === 'NS_ERROR_DOM_QUOTA_REACHED' || 
	            e.name === 'QuotaExceededError') {
	        return true;
	    }
	    return false;
	  }

	  // Determines if native JSON (de-)serialization is supported in the browser.
	  function supportsJSON() {
	    /*jshint eqnull:true */
	    if (cachedJSON === undefined) {
	      cachedJSON = (window.JSON != null);
	    }
	    return cachedJSON;
	  }

	  /**
	   * Returns the full string for the localStorage expiration item.
	   * @param {String} key
	   * @return {string}
	   */
	  function expirationKey(key) {
	    return key + CACHE_SUFFIX;
	  }

	  /**
	   * Returns the number of minutes since the epoch.
	   * @return {number}
	   */
	  function currentTime() {
	    return Math.floor((new Date().getTime())/EXPIRY_UNITS);
	  }

	  /**
	   * Wrapper functions for localStorage methods
	   */

	  function getItem(key) {
	    return localStorage.getItem(CACHE_PREFIX + cacheBucket + key);
	  }

	  function setItem(key, value) {
	    // Fix for iPad issue - sometimes throws QUOTA_EXCEEDED_ERR on setItem.
	    localStorage.removeItem(CACHE_PREFIX + cacheBucket + key);
	    localStorage.setItem(CACHE_PREFIX + cacheBucket + key, value);
	  }

	  function removeItem(key) {
	    localStorage.removeItem(CACHE_PREFIX + cacheBucket + key);
	  }

	  function eachKey(fn) {
	    var prefixRegExp = new RegExp('^' + CACHE_PREFIX + cacheBucket + '(.*)');
	    // Loop in reverse as removing items will change indices of tail
	    for (var i = localStorage.length-1; i >= 0 ; --i) {
	      var key = localStorage.key(i);
	      key = key && key.match(prefixRegExp);
	      key = key && key[1];
	      if (key && key.indexOf(CACHE_SUFFIX) < 0) {
	        fn(key, expirationKey(key));
	      }
	    }
	  }

	  function flushItem(key) {
	    var exprKey = expirationKey(key);

	    removeItem(key);
	    removeItem(exprKey);
	  }

	  function flushExpiredItem(key) {
	    var exprKey = expirationKey(key);
	    var expr = getItem(exprKey);

	    if (expr) {
	      var expirationTime = parseInt(expr, EXPIRY_RADIX);

	      // Check if we should actually kick item out of storage
	      if (currentTime() >= expirationTime) {
	        removeItem(key);
	        removeItem(exprKey);
	        return true;
	      }
	    }
	  }

	  function warn(message, err) {
	    if (!warnings) return;
	    if (!('console' in window) || typeof window.console.warn !== 'function') return;
	    window.console.warn("lscache - " + message);
	    if (err) window.console.warn("lscache - The error was: " + err.message);
	  }

	  var lscache = {
	    /**
	     * Stores the value in localStorage. Expires after specified number of minutes.
	     * @param {string} key
	     * @param {Object|string} value
	     * @param {number} time
	     */
	    set: function(key, value, time) {
	      if (!supportsStorage()) return;

	      // If we don't get a string value, try to stringify
	      // In future, localStorage may properly support storing non-strings
	      // and this can be removed.
	      if (typeof value !== 'string') {
	        if (!supportsJSON()) return;
	        try {
	          value = JSON.stringify(value);
	        } catch (e) {
	          // Sometimes we can't stringify due to circular refs
	          // in complex objects, so we won't bother storing then.
	          return;
	        }
	      }

	      try {
	        setItem(key, value);
	      } catch (e) {
	        if (isOutOfSpace(e)) {
	          // If we exceeded the quota, then we will sort
	          // by the expire time, and then remove the N oldest
	          var storedKeys = [];
	          var storedKey;
	          eachKey(function(key, exprKey) {
	            var expiration = getItem(exprKey);
	            if (expiration) {
	              expiration = parseInt(expiration, EXPIRY_RADIX);
	            } else {
	              // TODO: Store date added for non-expiring items for smarter removal
	              expiration = MAX_DATE;
	            }
	            storedKeys.push({
	              key: key,
	              size: (getItem(key) || '').length,
	              expiration: expiration
	            });
	          });
	          // Sorts the keys with oldest expiration time last
	          storedKeys.sort(function(a, b) { return (b.expiration-a.expiration); });

	          var targetSize = (value||'').length;
	          while (storedKeys.length && targetSize > 0) {
	            storedKey = storedKeys.pop();
	            warn("Cache is full, removing item with key '" + key + "'");
	            flushItem(storedKey.key);
	            targetSize -= storedKey.size;
	          }
	          try {
	            setItem(key, value);
	          } catch (e) {
	            // value may be larger than total quota
	            warn("Could not add item with key '" + key + "', perhaps it's too big?", e);
	            return;
	          }
	        } else {
	          // If it was some other error, just give up.
	          warn("Could not add item with key '" + key + "'", e);
	          return;
	        }
	      }

	      // If a time is specified, store expiration info in localStorage
	      if (time) {
	        setItem(expirationKey(key), (currentTime() + time).toString(EXPIRY_RADIX));
	      } else {
	        // In case they previously set a time, remove that info from localStorage.
	        removeItem(expirationKey(key));
	      }
	    },

	    /**
	     * Retrieves specified value from localStorage, if not expired.
	     * @param {string} key
	     * @return {string|Object}
	     */
	    get: function(key) {
	      if (!supportsStorage()) return null;

	      // Return the de-serialized item if not expired
	      if (flushExpiredItem(key)) { return null; }

	      // Tries to de-serialize stored value if its an object, and returns the normal value otherwise.
	      var value = getItem(key);
	      if (!value || !supportsJSON()) {
	        return value;
	      }

	      try {
	        // We can't tell if its JSON or a string, so we try to parse
	        return JSON.parse(value);
	      } catch (e) {
	        // If we can't parse, it's probably because it isn't an object
	        return value;
	      }
	    },

	    /**
	     * Removes a value from localStorage.
	     * Equivalent to 'delete' in memcache, but that's a keyword in JS.
	     * @param {string} key
	     */
	    remove: function(key) {
	      if (!supportsStorage()) return;

	      flushItem(key);
	    },

	    /**
	     * Returns whether local storage is supported.
	     * Currently exposed for testing purposes.
	     * @return {boolean}
	     */
	    supported: function() {
	      return supportsStorage();
	    },

	    /**
	     * Flushes all lscache items and expiry markers without affecting rest of localStorage
	     */
	    flush: function() {
	      if (!supportsStorage()) return;

	      eachKey(function(key) {
	        flushItem(key);
	      });
	    },

	    /**
	     * Flushes expired lscache items and expiry markers without affecting rest of localStorage
	     */
	    flushExpired: function() {
	      if (!supportsStorage()) return;

	      eachKey(function(key) {
	        flushExpiredItem(key);
	      });
	    },

	    /**
	     * Appends CACHE_PREFIX so lscache will partition data in to different buckets.
	     * @param {string} bucket
	     */
	    setBucket: function(bucket) {
	      cacheBucket = bucket;
	    },

	    /**
	     * Resets the string being appended to CACHE_PREFIX so lscache will use the default storage behavior.
	     */
	    resetBucket: function() {
	      cacheBucket = '';
	    },

	    /**
	     * Sets whether to display warnings when an item is removed from the cache or not.
	     */
	    enableWarnings: function(enabled) {
	      warnings = enabled;
	    }
	  };

	  // Return the module
	  return lscache;
	}));


/***/ },
/* 12 */
/***/ function(module, exports) {

	module.exports = "<div class=\"podcasts-grid\">\n\t<div class=\"row filter\">\n\t\t<div class=\"col-md-5 col-md-offset-7\">\n\t\t\t<span class=\"badge\">{{podcasts.length}}</span>\n\t\t\t<input id=\"filter\" type=\"text\" class=\"form-control input-lg\" autoFocus \n\t\t\t\tplaceholder=\"Filter podcasts...\" on-input=\"filterPodcasts\" value=\"{{filter}}\">\n\t\t</div>\n\t</div>\n\n\t<div class=\"row\">\n\t\t<div class=\"col-md-12\">\n\t\t\t<div class=\"row podcasts\">\n\t\t\t\t{{#podcasts}}\n\t\t\t\t\t{{> podcastSummary}}\n\t\t\t\t{{/podcasts}}\n\t\t\t</div>\n\t\t</div>\n\t</div>\n\n</div>"

/***/ },
/* 13 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
		value: true
	});
	exports.findById = findById;
	exports.findEl = findEl;
	exports.findEls = findEls;
	exports.emptyEl = emptyEl;
	exports.addEvent = addEvent;
	exports.removeEvents = removeEvents;
	var CUSTOM_EVENTS_NAME = '_pcEvents';

	function matches($el, selector) {
		var _matches = $el.matches || $el.msMatchesSelector;
		return _matches.call($el, selector);
	}

	function findById(id) {
		return document.getElementById(id);
	}

	function findEl(selector, container) {
		return (container || document).querySelector(selector);
	}

	function findEls(selector, container) {
		return Array.from((container || document).querySelectorAll(selector));
	}

	function emptyEl($el) {
		// It seems this is way faster than innerHTML = '' with heavy populated elements
		// http://jsperf.com/innerhtml-vs-removechild/ (check several of its versions)
		while ($el.firstChild) {
			$el.removeChild($el.firstChild);
		}
	}

	function addEvent($el, eventType, delegatedSelector, listener) {
		// TODO It seems a better approach to use WeakMaps
		// (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakMap)
		var _eventsMap = $el[CUSTOM_EVENTS_NAME] || {},
		    _eventsListeners = _eventsMap[eventType] || [];

		if (delegatedSelector) {
			var _listener2 = function _listener2(event) {
				var $target = event.target;

				while ($target !== event.currentTarget && !matches($target, delegatedSelector)) {
					$target = $target.parentElement;
				}

				if ($target && $target !== event.currentTarget) {
					listener.call($target, event, $target);
				}
			};
			$el.addEventListener(eventType, _listener2);
			_eventsListeners.push(_listener2);
		} else {
			$el.addEventListener(eventType, listener);
			_eventsListeners.push(_listener);
		}

		_eventsMap.eventType = _eventsListeners;
		$el[CUSTOM_EVENTS_NAME] = _eventsMap;
	}

	function removeEvents($el) {
		var eventType = arguments.length <= 1 || arguments[1] === undefined ? '*' : arguments[1];

		var _eventsMap = $el[CUSTOM_EVENTS_NAME] || {};

		Object.keys(_eventsMap).forEach(function (_eventType) {
			if (_eventType === eventType || _eventType === '*') {
				_eventsMap[eventType].forEach(function (listener) {
					$el.removeEventListener(eventType, listener);
				});
				_eventsMap[eventType] = null;
			}
		});
	}

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(fetch) {'use strict';

	Object.defineProperty(exports, '__esModule', {
		value: true
	});
	exports.getJson = getJson;
	exports.getXml = getXml;
	exports.getText = getText;
	exports.putJson = putJson;
	exports.getJsonp = getJsonp;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _lscache = __webpack_require__(11);

	var _lscache2 = _interopRequireDefault(_lscache);

	var _xmlParser = new DOMParser(),
	    jsonpCallbackId = 0,
	    jsonpTimeoutHandler = function jsonpTimeoutHandler() {};

	function checkResponseStatus(res) {
		var error;
		if (res.status < 400) {
			return res;
		} else {
			error = new Error(res.statusText);
			error.statusCode = res.status;
			error.response = res;
			throw error;
		}
	}

	function textParser(res) {
		return res.text();
	}

	function xmlParser(res) {
		return new Promise(function (resolve) {
			res.text().then(function (text) {
				resolve({
					result: _xmlParser.parseFromString(text, 'application/xml'),
					url: res.url
				});
			});
		});
	}

	function parseJson(res) {
		return new Promise(function (resolve) {
			res.json().then(function (data) {
				resolve({
					result: data,
					url: res.url
				});
			});
		});
	}

	function cacheResponse(ttl) {
		return function (data) {
			if (ttl) {
				_lscache2['default'].set(data.url, data.result, ttl); // Last parameter is TTL in minutes
			}
			return data.result;
		};
	}

	function getData(url, responseParser, options) {
		var data = _lscache2['default'].get(url),
		    _options = options || { ttl: 0 };
		if (data) {
			return Promise.resolve(data);
		} else {
			return fetch(url).then(checkResponseStatus).then(responseParser).then(cacheResponse(_options.ttl, url));
		}
	}

	/* ---------------------------------------------------------------------- */

	function getJson(url, options) {
		return getData(url, parseJson, options);
	}

	function getXml(url, options) {
		return getData(url, xmlParser, options);
	}

	function getText(url, options) {
		return getData(url, textParser, options);
	}

	function putJson(url, data) {
		return fetch(url, {
			method: 'put',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data)
		}).then(checkResponseStatus);
	}

	/*
		Idea from http://blog.garstasio.com/you-dont-need-jquery/ajax/#jsonp
	*/

	function getJsonp(url, options) {
		var _options = options || { // TODO Merge options
			cache: false,
			callbackParamName: 'callback',
			timeout: 10000
		};

		return new Promise(function (resolve, reject) {
			var script = document.createElement('script'),
			    callbackFnName = '_pdJsonpCallback_' + jsonpCallbackId++,
			    toHandler;

			// If we get to the timeout before having the response, we reject the promise
			// so we don't have the client waiting forever and we clear the global function
			// so it doesn't get invoked later, if the response arrives
			toHandler = setTimeout(function () {
				reject(new Error('JsonP timeout: ' + url));
				setTimeout(function () {
					window[callbackFnName] = jsonpTimeoutHandler;
				}, 4);
			}, _options.timeout);

			window[callbackFnName] = function (data) {
				resolve(data);
				setTimeout(function () {
					delete window[callbackFnName];
					if (toHandler) {
						clearTimeout(toHandler);
					}
				}, 4);
			};

			script.setAttribute('src', url + '&' + _options.callbackParamName + '=' + callbackFnName);
			document.body.appendChild(script);
		});
	}
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(15)))

/***/ },
/* 15 */
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {/*** IMPORTS FROM imports-loader ***/
	(function() {

	(function() {
	  'use strict';

	  if (self.fetch) {
	    return
	  }

	  function normalizeName(name) {
	    if (typeof name !== 'string') {
	      name = name.toString();
	    }
	    if (/[^a-z0-9\-#$%&'*+.\^_`|~]/i.test(name)) {
	      throw new TypeError('Invalid character in header field name')
	    }
	    return name.toLowerCase()
	  }

	  function normalizeValue(value) {
	    if (typeof value !== 'string') {
	      value = value.toString();
	    }
	    return value
	  }

	  function Headers(headers) {
	    this.map = {}

	    if (headers instanceof Headers) {
	      headers.forEach(function(value, name) {
	        this.append(name, value)
	      }, this)

	    } else if (headers) {
	      Object.getOwnPropertyNames(headers).forEach(function(name) {
	        this.append(name, headers[name])
	      }, this)
	    }
	  }

	  Headers.prototype.append = function(name, value) {
	    name = normalizeName(name)
	    value = normalizeValue(value)
	    var list = this.map[name]
	    if (!list) {
	      list = []
	      this.map[name] = list
	    }
	    list.push(value)
	  }

	  Headers.prototype['delete'] = function(name) {
	    delete this.map[normalizeName(name)]
	  }

	  Headers.prototype.get = function(name) {
	    var values = this.map[normalizeName(name)]
	    return values ? values[0] : null
	  }

	  Headers.prototype.getAll = function(name) {
	    return this.map[normalizeName(name)] || []
	  }

	  Headers.prototype.has = function(name) {
	    return this.map.hasOwnProperty(normalizeName(name))
	  }

	  Headers.prototype.set = function(name, value) {
	    this.map[normalizeName(name)] = [normalizeValue(value)]
	  }

	  Headers.prototype.forEach = function(callback, thisArg) {
	    Object.getOwnPropertyNames(this.map).forEach(function(name) {
	      this.map[name].forEach(function(value) {
	        callback.call(thisArg, value, name, this)
	      }, this)
	    }, this)
	  }

	  function consumed(body) {
	    if (body.bodyUsed) {
	      return Promise.reject(new TypeError('Already read'))
	    }
	    body.bodyUsed = true
	  }

	  function fileReaderReady(reader) {
	    return new Promise(function(resolve, reject) {
	      reader.onload = function() {
	        resolve(reader.result)
	      }
	      reader.onerror = function() {
	        reject(reader.error)
	      }
	    })
	  }

	  function readBlobAsArrayBuffer(blob) {
	    var reader = new FileReader()
	    reader.readAsArrayBuffer(blob)
	    return fileReaderReady(reader)
	  }

	  function readBlobAsText(blob) {
	    var reader = new FileReader()
	    reader.readAsText(blob)
	    return fileReaderReady(reader)
	  }

	  var support = {
	    blob: 'FileReader' in self && 'Blob' in self && (function() {
	      try {
	        new Blob();
	        return true
	      } catch(e) {
	        return false
	      }
	    })(),
	    formData: 'FormData' in self
	  }

	  function Body() {
	    this.bodyUsed = false


	    this._initBody = function(body) {
	      this._bodyInit = body
	      if (typeof body === 'string') {
	        this._bodyText = body
	      } else if (support.blob && Blob.prototype.isPrototypeOf(body)) {
	        this._bodyBlob = body
	      } else if (support.formData && FormData.prototype.isPrototypeOf(body)) {
	        this._bodyFormData = body
	      } else if (!body) {
	        this._bodyText = ''
	      } else {
	        throw new Error('unsupported BodyInit type')
	      }
	    }

	    if (support.blob) {
	      this.blob = function() {
	        var rejected = consumed(this)
	        if (rejected) {
	          return rejected
	        }

	        if (this._bodyBlob) {
	          return Promise.resolve(this._bodyBlob)
	        } else if (this._bodyFormData) {
	          throw new Error('could not read FormData body as blob')
	        } else {
	          return Promise.resolve(new Blob([this._bodyText]))
	        }
	      }

	      this.arrayBuffer = function() {
	        return this.blob().then(readBlobAsArrayBuffer)
	      }

	      this.text = function() {
	        var rejected = consumed(this)
	        if (rejected) {
	          return rejected
	        }

	        if (this._bodyBlob) {
	          return readBlobAsText(this._bodyBlob)
	        } else if (this._bodyFormData) {
	          throw new Error('could not read FormData body as text')
	        } else {
	          return Promise.resolve(this._bodyText)
	        }
	      }
	    } else {
	      this.text = function() {
	        var rejected = consumed(this)
	        return rejected ? rejected : Promise.resolve(this._bodyText)
	      }
	    }

	    if (support.formData) {
	      this.formData = function() {
	        return this.text().then(decode)
	      }
	    }

	    this.json = function() {
	      return this.text().then(JSON.parse)
	    }

	    return this
	  }

	  // HTTP methods whose capitalization should be normalized
	  var methods = ['DELETE', 'GET', 'HEAD', 'OPTIONS', 'POST', 'PUT']

	  function normalizeMethod(method) {
	    var upcased = method.toUpperCase()
	    return (methods.indexOf(upcased) > -1) ? upcased : method
	  }

	  function Request(url, options) {
	    options = options || {}
	    this.url = url

	    this.credentials = options.credentials || 'omit'
	    this.headers = new Headers(options.headers)
	    this.method = normalizeMethod(options.method || 'GET')
	    this.mode = options.mode || null
	    this.referrer = null

	    if ((this.method === 'GET' || this.method === 'HEAD') && options.body) {
	      throw new TypeError('Body not allowed for GET or HEAD requests')
	    }
	    this._initBody(options.body)
	  }

	  function decode(body) {
	    var form = new FormData()
	    body.trim().split('&').forEach(function(bytes) {
	      if (bytes) {
	        var split = bytes.split('=')
	        var name = split.shift().replace(/\+/g, ' ')
	        var value = split.join('=').replace(/\+/g, ' ')
	        form.append(decodeURIComponent(name), decodeURIComponent(value))
	      }
	    })
	    return form
	  }

	  function headers(xhr) {
	    var head = new Headers()
	    var pairs = xhr.getAllResponseHeaders().trim().split('\n')
	    pairs.forEach(function(header) {
	      var split = header.trim().split(':')
	      var key = split.shift().trim()
	      var value = split.join(':').trim()
	      head.append(key, value)
	    })
	    return head
	  }

	  Body.call(Request.prototype)

	  function Response(bodyInit, options) {
	    if (!options) {
	      options = {}
	    }

	    this._initBody(bodyInit)
	    this.type = 'default'
	    this.url = null
	    this.status = options.status
	    this.ok = this.status >= 200 && this.status < 300
	    this.statusText = options.statusText
	    this.headers = options.headers instanceof Headers ? options.headers : new Headers(options.headers)
	    this.url = options.url || ''
	  }

	  Body.call(Response.prototype)

	  self.Headers = Headers;
	  self.Request = Request;
	  self.Response = Response;

	  self.fetch = function(input, init) {
	    // TODO: Request constructor should accept input, init
	    var request
	    if (Request.prototype.isPrototypeOf(input) && !init) {
	      request = input
	    } else {
	      request = new Request(input, init)
	    }

	    return new Promise(function(resolve, reject) {
	      var xhr = new XMLHttpRequest()

	      function responseURL() {
	        if ('responseURL' in xhr) {
	          return xhr.responseURL
	        }

	        // Avoid security warnings on getResponseHeader when not allowed by CORS
	        if (/^X-Request-URL:/m.test(xhr.getAllResponseHeaders())) {
	          return xhr.getResponseHeader('X-Request-URL')
	        }

	        return;
	      }

	      xhr.onload = function() {
	        var status = (xhr.status === 1223) ? 204 : xhr.status
	        if (status < 100 || status > 599) {
	          reject(new TypeError('Network request failed'))
	          return
	        }
	        var options = {
	          status: status,
	          statusText: xhr.statusText,
	          headers: headers(xhr),
	          url: responseURL()
	        }
	        var body = 'response' in xhr ? xhr.response : xhr.responseText;
	        resolve(new Response(body, options))
	      }

	      xhr.onerror = function() {
	        reject(new TypeError('Network request failed'))
	      }

	      xhr.open(request.method, request.url, true)

	      if (request.credentials === 'include') {
	        xhr.withCredentials = true
	      }

	      if ('responseType' in xhr && support.blob) {
	        xhr.responseType = 'blob'
	      }

	      request.headers.forEach(function(value, name) {
	        xhr.setRequestHeader(name, value)
	      })

	      xhr.send(typeof request._bodyInit === 'undefined' ? null : request._bodyInit)
	    })
	  }
	  self.fetch.polyfill = true
	})();


	/*** EXPORTS FROM exports-loader ***/
	module.exports = global.fetch
	}.call(global));
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 16 */
/***/ function(module, exports) {

	module.exports = "<div class=\"col-xs-12 col-sm-3 col-md-3 col-lg-3 podcast-summary\">\n\t<div class=\"box\">\n\t\t<a href=\"/podcast/{{id}}\">\n\t\t\t<div class=\"box-icon\">\n\t\t\t\t<img src=\"{{cover}}\" alt=\"{{name}}\">\n\t\t\t</div>\n\t\t\t<div class=\"info\">\n\t\t\t\t<h4 class=\"text-center\">{{name}}</h4>\n\t\t\t\t<p>\n\t\t\t\t\t<span class=\"text-center\">\n\t\t\t\t\t\t<span>Author: </span>\n\t\t\t\t\t\t<span>{{author}}</span>\n\t\t\t\t\t</span>\n\t\t\t\t</p>\n\t\t\t</div>\n\t\t</a>\n\t</div>\n</div>"

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
		value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _pluginsRouter = __webpack_require__(1);

	var _baseController = __webpack_require__(18);

	var _baseController2 = _interopRequireDefault(_baseController);

	var _viewsPagesHomeHtml = __webpack_require__(12);

	var _viewsPagesHomeHtml2 = _interopRequireDefault(_viewsPagesHomeHtml);

	var _viewsPartialsPodcastSummaryHtml = __webpack_require__(16);

	var _viewsPartialsPodcastSummaryHtml2 = _interopRequireDefault(_viewsPartialsPodcastSummaryHtml);

	var HomeController = (function (_BaseController) {
		_inherits(HomeController, _BaseController);

		function HomeController(data) {
			_classCallCheck(this, HomeController);

			_get(Object.getPrototypeOf(HomeController.prototype), 'constructor', this).call(this, data, _viewsPagesHomeHtml2['default'], {
				podcastSummary: _viewsPartialsPodcastSummaryHtml2['default']
			});

			this.events = {
				'click|.podcast-summary a': this.navToPodcast
			};
		}

		_createClass(HomeController, [{
			key: 'navToPodcast',
			value: function navToPodcast(event, $target) {
				event.preventDefault();
				_pluginsRouter.RouterEngine.navTo($target.getAttribute('href'));
			}
		}]);

		return HomeController;
	})(_baseController2['default']);

	exports['default'] = HomeController;
	module.exports = exports['default'];

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
		value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	var _mustache = __webpack_require__(2);

	var _mustache2 = _interopRequireDefault(_mustache);

	var _pluginsDom = __webpack_require__(13);

	var dom = _interopRequireWildcard(_pluginsDom);

	var BaseController = (function () {
		function BaseController(data, template) {
			var partials = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

			_classCallCheck(this, BaseController);

			this.data = data;
			this.template = template;
			this.partials = partials;
			this.events = {};

			// https://developer.mozilla.org/en-US/docs/Web/API/DOMParser
			// http://caniuse.com/#feat=xml-serializer
			this.domParser = new DOMParser();
		}

		_createClass(BaseController, [{
			key: 'configureEvents',
			value: function configureEvents() {
				for (var key in this.events) {
					var tokens = key.split('|');
					dom.addEvent(this.$el, tokens[0], tokens[1] || undefined, this.events[key].bind(this));
				}
			}
		}, {
			key: 'render',
			value: function render() {
				var doc = this.domParser.parseFromString(_mustache2['default'].render(this.template, this.data, this.partials), 'text/html');
				this.$el = doc.body.firstChild;
				this.configureEvents();
				return this.$el;
			}
		}, {
			key: 'destroy',
			value: function destroy() {
				dom.removeEvents(this.$el);
				this.$el = null;
			}
		}]);

		return BaseController;
	})();

	exports['default'] = BaseController;
	module.exports = exports['default'];

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
		value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _pluginsRouter = __webpack_require__(1);

	var _baseController = __webpack_require__(18);

	var _baseController2 = _interopRequireDefault(_baseController);

	var _viewsPagesPodcastHtml = __webpack_require__(20);

	var _viewsPagesPodcastHtml2 = _interopRequireDefault(_viewsPagesPodcastHtml);

	var _viewsPartialsPodcastSidebarHtml = __webpack_require__(21);

	var _viewsPartialsPodcastSidebarHtml2 = _interopRequireDefault(_viewsPartialsPodcastSidebarHtml);

	var PodcastController = (function (_BaseController) {
		_inherits(PodcastController, _BaseController);

		function PodcastController(data) {
			_classCallCheck(this, PodcastController);

			_get(Object.getPrototypeOf(PodcastController.prototype), 'constructor', this).call(this, data, _viewsPagesPodcastHtml2['default'], {
				podcastSidebar: _viewsPartialsPodcastSidebarHtml2['default']
			});

			// this.events = {
			// 	'click|.podcast-summary a': this.navToPodcast
			// };
		}

		_createClass(PodcastController, [{
			key: 'navToEpisode',
			value: function navToEpisode(event, $target) {
				event.preventDefault();
				_pluginsRouter.RouterEngine.navTo($target.getAttribute('href'));
			}
		}]);

		return PodcastController;
	})(_baseController2['default']);

	exports['default'] = PodcastController;
	module.exports = exports['default'];

/***/ },
/* 20 */
/***/ function(module, exports) {

	module.exports = "<div>\n\t<PodcastSidebar podcast={{podcast}} />\n\n\t<div class=\"col-md-8 col-md-offset-1 section podcast-episodes-count\">\n\t\t<span>\n\t\t\tEpisodes: {{podcast.episodes.length}}\n\t\t</span>\n\t</div>\n\n\t<div class=\"col-md-8 col-md-offset-1 section\">\n\t\t<div class=\"podcast-episodes\">\n\t\t\t<table class=\"table table-hover table-striped\">\n\t\t\t\t<thead>\n\t\t\t\t\t<tr>\n\t\t\t\t\t\t<th>Title</th>\n\t\t\t\t\t\t<th>Date</th>\n\t\t\t\t\t\t<th>Duration</th>\n\t\t\t\t\t</tr>\n\t\t\t\t</thead>\n\t\t\t\t<tbody>\n\t\t\t\t\t{{#podcast.episodes}}\n\t\t\t\t\t\t<tr class=\"podcast-episode-summary\">\n\t\t\t\t\t\t\t<td>\n\t\t\t\t\t\t\t\t<a href=\"/podcast/{{podcast.id}}/episode/{{id}}\" on-click=\"navToEpisode\">{{title}}</a>\n\t\t\t\t\t\t\t</td>\n\t\t\t\t\t\t\t<td>{{date}}</td>\n\t\t\t\t\t\t\t<td class=\"duration\">{{duration}}</td>\n\t\t\t\t\t\t</tr>\n\t\t\t\t\t{{/podcast.episodes}}\n\t\t\t\t</tbody>\n\t\t\t</table>\n\t\t</div>\n\t</div>\n\n</div>"

/***/ },
/* 21 */
/***/ function(module, exports) {

	module.exports = "<div class=\"col-md-3 section\">\n\t<div class=\"podcast-cover text-center\">\n\t\t<a href=\"/podcast/{{podcast.id}}\">\n\t\t\t<img src=\"{{podcast.cover}}\" alt=\"{{podcast.name}}\">\n\t\t</a>\n\t</div>\n\t<hr/>\n\n\t<div class=\"podcast-title\">\n\t\t<a href=\"/podcast/{{podcast.id}}\">\n\t\t\t<div class=\"title\">{{podcast.name}}</div>\n\t\t\t<div class=\"author\"><span>by&nbsp;</span>{{podcast.author}}</div>\t\n\t\t</a>\n\t</div>\n\t<hr/>\n\n\t<div class=\"podcast-description\">\n\t\t<div>Description:</div>\n\t\t<p>{{podcast.description}}</p>\n\t</div>\n</div>"

/***/ }
/******/ ]);