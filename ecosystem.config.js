module.exports = {
    apps: [{
        name: 'nextjs-app',
        script: 'npm',
        args: 'start',
        env_production: {
            NODE_ENV: 'production'
        }
    }]
}
