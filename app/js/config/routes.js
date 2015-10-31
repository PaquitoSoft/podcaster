import PodcastModel from '../models/podcast';
import HomePageController from '../controllers/home-controller';
import PodcastPageController from '../controllers/podcast-controller';

export default [
	{
		path: '/',
		handler: function homePageController(context, next) {
			PodcastModel.findAll()
				.then(function(data) {
					next(null, HomePageController, {
						podcasts: data
					});
				})
				.catch(next);
		}
	},
	{
		path: '/podcast/:podcastId',
		handler: function podcastController(context, next) {
			console.log('Routes::podcastController# Context:', context);
			PodcastModel.findById(context.params.namedParams.podcastId)
				.then(function(data) {
					next(null, PodcastPageController, {
						podcast: data
					});
				})
				.catch(next);	
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
