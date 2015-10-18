(function(APP) {
	'use strict';

	define(['components/pages/home-page', 'components/pages/podcast-page',
		'components/pages/episode-page', 'models/podcast'],
		function(HomePage, PodcastPage, EpisodePage, PodcastModel) {

			return {
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
					// When first loading the website in this route we need to fetch the data
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
						next(null, EpisodePage, context.state);
					}
				}
			};

		}
	);

}());
