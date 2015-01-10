Package.describe({
  name: 'nerdmed:profile-helper',
  summary: 'A handy helper to read and write from your users profile',
  version: '0.0.2',
  git: 'https://github.com/nerdmed/profile-helper.git'
});

Package.onUse(function(api) {
  api.versionsFrom('1.0.2.1');
  api.use('underscore');
  api.use('session', 'client');
  api.addFiles('profile-helper.js');
  api.export("ProfileHelper");
});

// Missing Tests :/ 
