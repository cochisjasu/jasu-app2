module.exports = {
    apps: [{
        script: 'npm',
	args: "start",
        watch: '.',
        name: 'jasu-app',
        instances: 1,
        env: {
            NODE_ENV: 'production',
            PORT: '3054'
        }
    }
    ]
};

