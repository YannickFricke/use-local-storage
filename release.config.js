module.exports = {
    branches: ['master'],
    repositoryUrl: 'https://github.com/YannickFricke/use-local-storage',
    plugins: [
        '@semantic-release/commit-analyzer',
        '@semantic-release/release-notes-generator',
        ['@semantic-release/changelog', {
            changelogFile: 'CHANGELOG.md',
        }],
        ['@semantic-release/npm', {
            'pkgRoot': 'dist',
        }],
        ['@semantic-release/git', {
            assets: ['package.json', 'CHANGELOG.md'],
            message: 'chore(release): ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}',
        }],
    ],
    ci: false,
};
