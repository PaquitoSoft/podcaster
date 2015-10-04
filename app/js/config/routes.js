(function(APP) {
	'use strict';

	var HomePage = APP.components.pages.HomePage,
		PodcastPage = APP.components.pages.PodcastPage,
		EpisodePage = APP.components.pages.EpisodePage,
		PodcastModel = APP.models.Podcast;
	
	var routes = {
		'/': function homeController(context, next) {
			PodcastModel.findAll()
				.then(function(data) {
					next(null, HomePage, {
						podcasts: data
					});
				})
				.catch(next);
		},
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
		}
	};

	APP.config.routes = routes;

}(window.PodcasterApp));
