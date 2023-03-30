module.exports = {
	globDirectory: 'www/',
	globPatterns: [
		'**/*.{png,svg,webp,js,ico,html,webmanifest}'
	],
	swDest: 'www/sw.js',
	ignoreURLParametersMatching: [
		/^utm_/,
		/^fbclid$/
	],
	skipWaiting: true
};