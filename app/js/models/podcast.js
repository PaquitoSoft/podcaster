(function() {
	'use strict';

	define(['lscache', 'plugins/ajax'], function(lscache, ajax) {

		var PODCASTS_DATASOURCE_URL = 'https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json',
			PODCAST_ID_DATASOURCE_URL = 'https://itunes.apple.com/lookup?id=',
			PODCAST_CACHE_PREFIX = 'podcast-data_',
			CORS_SERVICE_URL = 'http://crossorigin.me/',
			FAVORITES_SERVICE_URL = 'https://ps-podcaster.firebaseio.com/favorites.json',

			PODCASTS_LIST_CACHE_TTL = 1440, // minutes (one day)
			PODCAST_DETAIL_CACHE_TTL = 2880; // (two days)

		// Enhance dom collections with array functions
		// (https://gist.github.com/DavidBruant/1016007)
		// We add this to help XML parsing (podcast RSS)
		NodeList.prototype.forEach = Array.prototype.forEach;
		NodeList.prototype.map = Array.prototype.map;

		function getPodcastLite(podcastId) {
			return new Promise(function(resolve, reject) {
				Podcast.findAll()
					.then(function(podcasts) {
						var podcast = podcasts.filter(function(pod) {
							return podcastId === pod.id;
						});
						if (podcast.length) {
							resolve(podcast[0]);
						} else {
							reject(new Error('Podcast not found: ' + podcastId));
						}
					})
					.catch(reject);
			});
		}

		function fetchPodcastFeedUrl(podcast) {
			return new Promise(function(resolve, reject) {
				ajax.getJsonp(PODCAST_ID_DATASOURCE_URL + podcast.id)
					.then(function(data) {
						if (data.results.length) {
							podcast.feedUrl = data.results[0].feedUrl;
							resolve(podcast);
						} else {
							reject(new Error('No feed Url found for podcast: ' + podcast.id));
						}
					})
					.catch(reject);
			});
		}

		function fetchPodcastEpisodes(podcast) {
			return new Promise(function(resolve, reject) {
				ajax.getXml(CORS_SERVICE_URL + podcast.feedUrl)
					.then(function(podcastDoc) {
						// We need to get iTunes XML namespace for accessing episodes duration
						var itunesNS = podcastDoc.querySelector('rss').getAttribute('xmlns:itunes'),
							episodeIds = 0;

						// https://developer.mozilla.org/en/docs/Web/API/NodeList
						// [...podcastDoc.querySelectorAll('rss channel item')].forEach(p => {
						//	console.log(p);
						// });
						// NodeList has been enhaced in app.js file
						podcast.episodes = podcastDoc.querySelectorAll('rss channel item').map(function(p) {
							var desc = p.querySelector('description'),
								pubDate = p.querySelector('pubDate'),
								duration = p.getElementsByTagNameNS(itunesNS, 'duration')[0],
								enclosure = p.querySelector('enclosure');					

							return {
								id: podcast.id + '_' + (episodeIds++),
								title: p.querySelector('title').textContent,
								description: desc ? desc.textContent : '',
								date: pubDate ? new Date(pubDate.textContent).toLocaleDateString() : '',
								timestamp: pubDate ? (new Date(pubDate.textContent)).getTime() : 0,
								// http://stackoverflow.com/questions/4288232/javascript-xml-parser-how-to-get-nodes-that-have-in-the-name
								duration: duration ? duration.textContent : '--',
								mediaUrl: enclosure ? enclosure.getAttribute('url') : ''
							};
						});

						resolve(podcast);
					})
					.catch(reject);
			});
		}

		function createModels(rawPodcastData) {
			return Promise.resolve(rawPodcastData.feed.entry.map(function(raw) {
				return new Podcast(raw);
			}));
		}

		function processFavoritePodcasts(podcasts) {
			return new Promise(function(resolve, reject) {
				ajax.getJson(FAVORITES_SERVICE_URL)
					.then(function(favoritePodcasts) {
						var _favoritePodcasts = favoritePodcasts || [];
						// TODO Mark favorite podcasts
						return resolve(podcasts.map(function(podcast) {
							podcast.isFavorite = _favoritePodcasts.indexOf(podcast.id) !== -1;
							return podcast;
						}));
					})
					.catch(reject);
			});
		}

		function saveFavoritePodcast(podcast) {
			return new Promise(function(resolve, reject) {
				ajax.getJson(FAVORITES_SERVICE_URL).
					then(function(favoritePodcasts) {
						var _favoritePodcasts = favoritePodcasts || [],
							podcastIndex = _favoritePodcasts.indexOf(podcast.id),
							originalLength = _favoritePodcasts.length;

						if (podcast.isFavorite && podcastIndex === -1) {
							_favoritePodcasts.push(podcast.id);
						} else if (!podcast.isFavorite && podcastIndex !== -1) {
							_favoritePodcasts.splice(podcastIndex, 1);
						}

						if (_favoritePodcasts.length !== originalLength) {
							ajax.putJson(FAVORITES_SERVICE_URL, _favoritePodcasts)
								.then(function() {
									resolve(podcast);
								})
								.catch(reject);
						} else {
							resolve(podcast);	
						}
					})
					.catch(reject);
			});
		}


		function Podcast(rawData) {
			if (rawData) {
				this.id = rawData.id.attributes['im:id'];
				this.name = rawData['im:name'].label;
				this.author = rawData['im:artist'].label;
				this.description = rawData.summary ? rawData.summary.label : '';
				if (rawData['im:releaseDate']) {
					this.releaseDate = rawData['im:releaseDate'].attributes.label; // rawData['im:releaseDate'].label => zulu date
					this.lastEpisodeDate = (new Date(rawData['im:releaseDate'].label)).getTime();
				}
				this.cover = rawData['im:image'].filter(function(imageData) {
					return imageData.attributes.height === '170';
				})[0].label;	
			} else {
				this.id = '';
			}
			
			this.episodes = [];
		}

		Podcast.prototype.toggleFavorite = function() {
			this.isFavorite = !this.isFavorite;
			return saveFavoritePodcast(this);
		};

		Podcast.findAll = function() {
			return ajax.getJson(PODCASTS_DATASOURCE_URL, { ttl: PODCASTS_LIST_CACHE_TTL })
					.then(createModels)
					.then(processFavoritePodcasts);
		};

		Podcast.findById = function(podcastId) {
			var cacheKey = PODCAST_CACHE_PREFIX + podcastId,
				podcast = lscache.get(cacheKey);

			if (podcast) {
				return Promise.resolve(podcast);
			} else {
				return new Promise(function(resolve, reject) {
					getPodcastLite(podcastId)
						.then(fetchPodcastFeedUrl)
						.then(fetchPodcastEpisodes)
						.then(function(data) {
							lscache.set(cacheKey, data, PODCAST_DETAIL_CACHE_TTL);
							resolve(data);
						})
						.catch(reject);
				});
			}
		};

		return Podcast;

	});

}());
