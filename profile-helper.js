// -----------------------------------------------------------------------------
// Client & server functions

ProfileHelper = function() {};

_.extend(ProfileHelper.prototype, {
    get: function(path) {
        var user = Meteor.user();
        if (!user || !user.profile) {
            if (Meteor.isClient) {
                return Session.get("profile." + path);
            }
        }
        return findIn(user.profile, path)
    },
    set: function(path, value, operator, options, callback) {
        check(path, String);

        var user = Meteor.user();
        var operator = operator || "$set";
        var modifier = {};
        var valueMap = {};

        modifier[operator] = valueMap;
        valueMap["profile." + path] = value;

        this.checkPath(path, user);

        if (!user || !user.profile) {
            if (operator) throw new Meteor.Error("Using Operators with no existing User is currently not supported");
            if (Meteor.isClient) {
                return Session.set("profile." + path, value);
            }
        }

        Meteor.users.update(user._id, modifier, options, callback);
    },
    checkPath: function(path, user) {

        var path = path
            .replace(/\[(\w+)\]/g, '.$1') // convert [] indexes to dot indexes
            .replace(/^\./, ''); // strip any leading dot


        var pathArray = path.split('.');

        if (user) {
            _.each(pathArray, function(name, index, pathArray) {
                // ensure that something along the way to our path doesn't already contain a (non-object) value

                // We don't care if the _full_ path already has a value set, skip it here
                if (index === pathArray.length - 1) return;

                // Reconstruct the path bit by bit on each iteration
                // 1) "settings"
                // 2) "settings.local"
                // 3) "settings.local.debug" etc.
                var deeperPath = pathArray.slice(0, index + 1).join(".");
                var deeperValue = findIn(user.profile, deeperPath);

                if (deeperValue !== undefined && !_.isObject(deeperValue)) {
                    throw new Meteor.Error("There is already a value set on the way to your path");
                }
            });
        }

    }

});

// handy little helper
var findIn = function(o, s) {
    if (typeof o === 'undefined') return undefined;
    s = s.replace(/\[(\w+)\]/g, '.$1') // change [subObj] to .subObj notation
    .replace(/^\./, ''); // strip a leading dot
    var a = s.split('.');
    while (a.length) {
        var n = a.shift();
        if (typeof o[n] !== 'undefined') { // checking for the namespace 
            o = o[n];
        } else {
            return undefined;
        }
    }
    return o;
};