const TransformPages = require('uni-read-pages')
const {webpack} = new TransformPages()
module.exports = {
	configureWebpack: {
		devServer: {
			disableHostCheck: true
		},
		/* uni-simple-router配置 */
		plugins: [
			new webpack.DefinePlugin({
				ROUTES: webpack.DefinePlugin.runtimeValue(() => {
					const tfPages = new TransformPages({
						includes: ['path', 'name', 'aliasPath']
					});
					return JSON.stringify(tfPages.routes)
				}, true )
			})
		]
	}
}