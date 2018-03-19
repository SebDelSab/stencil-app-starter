exports.config = {
	//namespace: 'advanced-searchbar',
	//generateDistribution: true,
	//generateWWW: true,
	bundles: [
	{ components: ['advanced-searchbar'] }
	],
};

exports.devServer = {
  root: 'www',
  watchGlob: '**/**'
};
