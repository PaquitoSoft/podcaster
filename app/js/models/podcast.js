import lscache from 'lscache';
import * as ajax from '../plugins/ajax';
import * as dom from '../plugins/dom';

const PODCASTS_DATASOURCE_URL = 'https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json';
const PODCAST_ID_DATASOURCE_URL = 'https://itunes.apple.com/lookup?id=';
const PODCAST_CACHE_PREFIX = 'podcast-data_';
const CORS_SERVICE_URL = 'http://crossorigin.me/';

const PODCASTS_LIST_CACHE_TTL = 1440; // minutes (one day)
const PODCAST_DETAIL_CACHE_TTL = 2880; // (two days)

function getPodcastLite(podcastId) {
	return new Promise(function(resolve, reject) {
		Podcast.findAll()
			.then(function(podcasts) {
				let podcast = podcasts.filter(function(pod) {
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
				let itunesNS = dom.findEl('rss', podcastDoc).getAttribute('xmlns:itunes'),
					episodeIds = 0;

				// https://developer.mozilla.org/en/docs/Web/API/NodeList
				// [...podcastDoc.querySelectorAll('rss channel item')].forEach(p => {
				//	console.log(p);
				// });
				podcast.episodes = dom.findEls('rss channel item', podcastDoc).map((p) => {
					let desc = p.querySelector('description'),
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

class Podcast {

	constructor(rawData) {
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

	static findAll() {
		return ajax.getJson(PODCASTS_DATASOURCE_URL, { ttl: PODCASTS_LIST_CACHE_TTL })
				.then(createModels);
	}

	static findById(podcastId) {
		let cacheKey = PODCAST_CACHE_PREFIX + podcastId,
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
	}

}

export default Podcast;
