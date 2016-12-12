process.env.NODE_ENV = 'development';

var path = require('path');
var webpack = require('webpack');
var chalk = require('chalk');
var historyApiFallback = require('connect-history-api-fallback');
var httpProxyMiddleware = require('http-proxy-middleware');
var exec = require('child_process').exec;
var WebpackDevServer = require('webpack-dev-server');
// var config = require('./webpack.dev.config');

// var DEFAULT_PORT = process.env.PORT || 1314;
var compiler;

var friendlySyntaxErrorLabel = 'Syntax error:';

function clearConsole() {
	process.stdout.write('\x1bc');
}

function handleCompile(err, stats) {
	if (err || stats.hasErrors() || stats.hasWarnings()) {
		console.log(stats.toString({
			chunks: false, // Makes the build much quieter
			colors: true
		}));
		process.exit(1);
	} else {
		// process.exit(0);
	}
}

function openBrowser(port) {
	exec('start http://localhost:' + port + '/');
}

function resolveApp(relativePath) {
	return path.resolve(relativePath);
}

function isLikelyASyntaxError(message) {
	return message.indexOf(friendlySyntaxErrorLabel) !== -1;
}

function formatMessage(message) {
	return message
		// Make some common errors shorter:
		.replace(
			// Babel syntax error
			'Module build failed: SyntaxError:',
			friendlySyntaxErrorLabel
		)
		.replace(
			// Webpack file not found error
			/Module not found: Error: Cannot resolve 'file' or 'directory'/,
			'Module not found:'
		)
		// Internal stacks are generally useless so we strip them
		.replace(/^\s*at\s.*:\d+:\d+[\s\)]*\n/gm, '') // at ... ...:x:y
		// Webpack loader names obscure CSS filenames
		.replace('./~/css-loader!./~/postcss-loader!', '');
}

function addMiddleware(devServer) {
	// `proxy` lets you to specify a fallback server during development.
	// Every unrecognized request will be forwarded to it.
	var proxy = require(resolveApp('package.json')).proxy;
	devServer.use(historyApiFallback({
		// Allow paths with dots in them to be loaded, reference issue #387
		disableDotRule: true,
		// For single page apps, we generally want to fallback to /index.html.
		// However we also want to respect `proxy` for API calls.
		// So if `proxy` is specified, we need to decide which fallback to use.
		// We use a heuristic: if request `accept`s text/html, we pick /index.html.
		// Modern browsers include text/html into `accept` header when navigating.
		// However API calls like `fetch()` won’t generally won’t accept text/html.
		// If this heuristic doesn’t work well for you, don’t use `proxy`.
		htmlAcceptHeaders: proxy ?
			['text/html'] : ['text/html', '*/*']
	}));
	if (proxy) {
		if (typeof proxy !== 'string') {
			console.log(chalk.red('When specified, "proxy" in package.json must be a string.'));
			console.log(chalk.red('Instead, the type of "proxy" was "' + typeof proxy + '".'));
			console.log(chalk.red('Either remove "proxy" from package.json, or make it a string.'));
			process.exit(1);
		}

		// Otherwise, if proxy is specified, we will let it handle any request.
		// There are a few exceptions which we won't send to the proxy:
		// - /index.html (served as HTML5 history API fallback)
		// - /*.hot-update.json (WebpackDevServer uses this too for hot reloading)
		// - /sockjs-node/* (WebpackDevServer uses this for hot reloading)
		// Tip: use https://www.debuggex.com/ to visualize the regex
		var mayProxy = /^(?!\/(index\.html$|.*\.hot-update\.json$|sockjs-node\/)).*$/;
		devServer.use(mayProxy,
			// Pass the scope regex both to Express and to the middleware for proxying
			// of both HTTP and WebSockets to work without false positives.
			httpProxyMiddleware(pathname => mayProxy.test(pathname), {
				target: proxy,
				logLevel: 'silent',
				secure: false,
				changeOrigin: true
			})
		);
	}
	// Finally, by now we have certainly resolved the URL.
	// It may be /index.html, so let the dev server try serving it again.
	devServer.use(devServer.middleware);
}

function setupCompile(port, config) {
	compiler = webpack(config, handleCompile);

	compiler.plugin('invalid', function() {
		clearConsole();
		console.log('Compiling...');
	});

	compiler.plugin('done', function(stats) {
		clearConsole();

		var hasErrors = stats.hasErrors();
		var hasWarnings = stats.hasWarnings();

		if (!hasErrors && !hasWarnings) {
			console.log(chalk.green('Compiled successfully!'));
			console.log();
			console.log('The app is running at:');
			console.log();
			console.log('  ' + chalk.cyan('http://localhost:' + port + '/'));
			console.log();
			console.log('Note that the development build is not optimized.');
			console.log('To create a production build, use ' + chalk.cyan('npm run build') + '.');
			console.log();

			return;
		}

		var json = stats.toJson({}, true);
		var formattedErrors = json.errors.map(message =>
			'Error in ' + formatMessage(message)
		);
		var formattedWarnings = json.warnings.map(message =>
			'Warning in ' + formatMessage(message)
		);

		if (hasErrors) {
			console.log(chalk.red('Failed to compile.'));
			console.log();

			if (formattedErrors.some(isLikelyASyntaxError)) {
				formattedErrors = formattedErrors.filter(isLikelyASyntaxError);
			}

			formattedErrors.forEach(message => {
				console.log(message);
				console.log();
			});
			// If errors exist, ignore warnings.
			return;
		}

		if (hasWarnings) {
			console.log(chalk.yellow('Compiled with warnings.'));
			console.log();

			formattedWarnings.forEach(message => {
				console.log(message);
				console.log();
			});

			// Teach some ESLint tricks.
			console.log('You may use special comments to disable some warnings.');
			console.log('Use ' + chalk.yellow('// eslint-disable-next-line') + ' to ignore the next line.');
			console.log('Use ' + chalk.yellow('/* eslint-disable */') + ' to ignore all warnings in a file.');
		}

	});
}

function runDevServer(port, config) {
	var myDevServer = new WebpackDevServer(compiler, {
		// contentBase: path.resolve('.', 'src'),
		hot: true,
		publicPath: config.output.publicPath,
		quiet: true,
		compress: true,
		// filename: "bundle.js",
		noInfo: false,
		stats: {
			colors: true
		},
		watchOptions: {
			ignored: /node_modules/
		}
	});

	// addMiddleware(myDevServer);

	myDevServer.listen(port, (err, result) => {
		if (err) {
			return console.log(err);
		}

		clearConsole();
		console.log(chalk.cyan('Starting the development server...'));
		console.log();
		openBrowser(port);
	});
}

function run(port, config) {
	setupCompile(port, config);
	runDevServer(port, config);
}



module.exports = run;