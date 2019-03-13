const path = require('path');

module.exports ={
	resolve: {
		alias : {
			'@components': path.resolve(__dirname, 'src/AppBundle/Resources/public/javascript/common/components/'),
			'@utils': path.resolve(__dirname, 'src/AppBundle/Resources/public/javascript/common/utils/'),
			'@constants': path.resolve(__dirname, 'src/AppBundle/Resources/public/javascript/common/constants.js'),
			'@icons': path.resolve(__dirname, 'src/AppBundle/Resources/public/javascript/main/components/Icons.js'),
			'@translations': path.resolve(__dirname, 'src/AppBundle/Resources/public/javascript/translations/translations.js'),
			'@translate': path.resolve(__dirname, 'src/AppBundle/Resources/public/javascript/common/components/Translator/Translate.js'),
			'@portal': path.resolve(__dirname, 'src/AppBundle/Resources/public/javascript/common/components/Portal/Portal.js'),
		}
	}
};
