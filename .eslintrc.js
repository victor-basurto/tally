module.exports = {
	root: true,
	parser: '@typescript-eslint/parser',
	plugins: [
		'@typescript-eslint',
	],
	env: {
		node: true,
	},
	extends: [
		'airbnb-typescript/base',
		'plugin:import/recommended',
		'plugin:@typescript-eslint/eslint-recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:@typescript-eslint/recommended-requiring-type-checking',
	],
	parserOptions: {
		ecmaVersion: 2021,
		sourceType: 'module',
		project: './tsconfig.json',
	},
	rules: {
		/**
		 * Allow for methods that *don't* use `this`.
		 */
		'class-methods-use-this': 'off',
		indent: ['error', 'tab'],
		/**
		 * eslint-config-airbnb-base sets max-len to 100. max-len is increased here to 120.
		 * https://github.com/airbnb/javascript/blob/master/packages/eslint-config-airbnb-base/rules/style.js#L205
		 */
		'max-len': ['error', 120, 2, {
			ignoreUrls: true,
			ignoreComments: false,
			ignoreRegExpLiterals: true,
			ignoreStrings: true,
			ignoreTemplateLiterals: true
		}],
		'no-cond-assign': ['error', 'except-parens'],
		'no-continue': 'off',
		'no-plusplus': 'off',
		'no-restricted-syntax': [
			'error',
			{
				selector: 'ForInStatement',
				message: 'for..in loops iterate over the entire prototype chain, which is virtually never what you want. Use Object.{keys,values,entries}, and iterate over the resulting array.'
			},
			{
				selector: 'LabeledStatement',
				message: 'Labels are a form of GOTO; using them makes code confusing and hard to maintain and understand.'
			},
			{
				selector: 'WithStatement',
				message: '`with` is disallowed in strict mode because it makes code impossible to predict and optimize.'
			},
		],
		'no-tabs': 'off',
		'no-void': ['error', { allowAsStatement: true }],
		'object-curly-newline': ['error', {
			ObjectExpression: {  minProperties: 8, multiline: true, consistent: true },
			ObjectPattern: {     minProperties: 8, multiline: true, consistent: true },
			ImportDeclaration: { minProperties: 8, multiline: true, consistent: true },
			ExportDeclaration: { minProperties: 8, multiline: true, consistent: true },
		}],
		'one-var': ['error', { initialized: 'never' }],
		'one-var-declaration-per-line': ['error', 'initializations'],
		'template-curly-spacing': ['error', 'always'],
		'@typescript-eslint/indent': ['error', 'tab'],
	},
	overrides: [{
		/**
		 * Allow the use of unused expressions in tests. For instance: `expect(foo).to.be.true;`
		 * https://stackoverflow.com/a/37777342
		 * https://eslint.org/docs/user-guide/configuring/rules#using-configuration-files-1
		 */
		files: ['*.test.ts', '*.spec.ts'],
		rules: {
			'@typescript-eslint/no-unused-expressions': 'off',
		},
	}, {
		files: ['src/workers/**/index.ts'],
		rules: {
			'@typescript-eslint/no-unused-vars': 'off',
		},
	}],
};