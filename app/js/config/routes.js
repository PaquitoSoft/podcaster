import PodcastModel from '../models/podcast';
import HomePageController from '../controllers/home-controller';
import PodcastPageController from '../controllers/podcast-controller';
import EpisodePageController from '../controllers/episode-controller';

export default [
	{
		path: '/',
		handler: function homePageController(/*context*/) {
			return new Promise((resolve, reject) => {
				PodcastModel.findAll()
					.then(function(data) {
						resolve({
							Controller: HomePageController,
							data: {
								podcasts: data
							}
						});
					})
					.catch(reject);				
			});
		}
	},
	{
		path: '/podcast/:podcastId',
		handler: function podcastController(context) {
			return new Promise((resolve, reject) => {
				PodcastModel.findById(context.params.namedParams.podcastId)
					.then(function(data) {
						resolve({
							Controller:PodcastPageController, 
							data: {
								podcast: data
							}
						});
					})
					.catch(reject);
			});
		}
	},
	{
		path: '/podcast/:podcastId/episode/:episodeId',
		handler: function episodeController(context) {
			return new Promise((resolve, reject) => {
				// When loading the page in this route we need to fetch the data
				if (!context.state.episode) {
					PodcastModel.findById(context.params.namedParams.podcastId)
						.then(function(podcast) {
							resolve({
								Controller: EpisodePageController,
								data: {
									podcast: podcast,
									episode: podcast.episodes.filter(function(ep) {
										return ep.id === context.params.namedParams.episodeId;
									})[0]
								}
							});
						})
						.catch(reject);
				} else {
					resolve({
						Controller: EpisodePageController,
						data: context.state
					});
				}				
			});
		}
	}
];
