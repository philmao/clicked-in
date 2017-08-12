module.exports = function(req) {
    var linkedinUser;

    if (req.isAuthenticated()) {
        if (req.user.provider === 'linkedin') {
            linkedinUser = true;
        } else {
            linkedinUser = false;
        }
    }

    return linkedinUser;
};
