module.exports = {
    'env': {
        'browser': true,
        'node': true,
    },
    'extends': 'airbnb-base',
    'globals': {},
    'rules': {
        'arrow-body-style': [ 'off' ],
        'function-paren-newline': 'off',
        'global-require': 'off',
        'import/no-dynamic-require': 'off',
        'import/no-extraneous-dependencies': 'off',
        'indent': [ 'error', 4 ],
        'linebreak-style': 'off',
        'max-len': 'off',
        'no-console': 'off',
        'no-multi-spaces': 'off',
        'no-param-reassign': [ 'error', { 'props': false } ],
        'no-shadow': [ 2, { 'allow': ['data', 'err'] } ],
        'no-underscore-dangle': 'off',
        'padded-blocks': 'off',
    },
    'settings': {
        'import/extensions': ['.js', '.es'],
        'import/resolver': {}
    },
};
