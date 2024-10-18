const { getDataSource } = require('./src/data-loader');

exports.createPages = async ({ actions}) => {   // 1
    const { createPage } = actions;
    const dataSource = await getDataSource();  // 2

    createPage({   // 3
        path: '/', // 4
        component: require.resolve('./src/templates/single-page.js'),
        context: { dataSource },
    });
};