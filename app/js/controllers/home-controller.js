import lscache from 'lscache';
import BaseController from './base-controller';
import HomePageTemplate from '../../views/pages/home.html';
import PodcastSummaryPartialTemplate from '../../views/partials/podcast-summary.html';
import * as dom from '../plugins/dom';

const FILTER_KEY = 'prev-filter';

class HomeController extends BaseController {

	constructor(data) {
		super({
			data,
			template: HomePageTemplate,
			partials: {
				podcastSummary: PodcastSummaryPartialTemplate
			},
			domEvents: {
				'keyup|#filter': 'onFilterPodcasts'
			}
		});

		this.data.originalPodcasts = data.podcasts;
		this.data.filter =  lscache.get(FILTER_KEY) || '';
	}

	_filterPodcasts(filter) {
		console.log('HomeController::filterPodcasts# Filtering...', filter);
		this.data.filter = filter;
		let regExp = new RegExp(filter, 'i');
		
		console.debug('HomeController::filteringPodcasts# Previous podcasts length:', this.data.podcasts.length);
		console.time('filteringPodcasts');		
		this.data.podcasts = this.data.originalPodcasts.filter((podcast) => {
			return regExp.test(podcast.name + podcast.author);
		});
		console.timeEnd('filteringPodcasts');

		this.update();

		lscache.set(FILTER_KEY, filter);
	}

	onMounted() {
		if (this.data.filter) {
			this._filterPodcasts(this.data.filter);
		}
	}

	onFilterPodcasts(event, $target) {
		this._filterPodcasts($target.value);
	}

	update() {
		let $updatedEl = this.render(),
			$prevPodcasts = dom.findEl('.podcasts', this.$el);

		dom.findEl('.badge', this.$el).innerHTML = this.data.podcasts.length;
		$prevPodcasts.parentNode.replaceChild(dom.findEl('.podcasts', $updatedEl), $prevPodcasts);
	}

}

export default HomeController;