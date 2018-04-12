exports.config = {
	namespace: 'advanced-searchbar',
	generateDistribution: true,
	generateWWW: false,
	bundles: [
	{ components: ['advanced-searchbar'] }
	],
};

exports.devServer = {
  root: 'www',
  watchGlob: '**/**'
};
