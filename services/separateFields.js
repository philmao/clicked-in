// a helper function that separates frontend & backend skills from req.body
// to easily insert new rows in corresponding frontend/backend skill tables
module.exports = function(body, uId) {

    var propNames = Object.getOwnPropertyNames(body);
    var returnObj = {
        'skills': { 'profileId': uId },
        'projects': []
    };

    // console.log(body);

    propNames.forEach(propName => {
        // split prop name by '-'
        // names on checkboxes in signup follow this convention:
        // name="front-html" || name="back-mysql"
        var splitStr = propName.split('_');
        var refactoredArr;

        if (splitStr[0] === 'front') {

            returnObj.skills[propName] = 1;

        } else if (splitStr[0] === 'back') {

            returnObj.skills[propName] = 1;

        } else if (splitStr[0] === 'design') {

            returnObj.skills[propName] = 1;

        } else if (propName.startsWith('proj')) {

            splitStr = propName.split('-');

            refactoredArr = body[propName].filter(elem => elem !== '');

            refactoredArr.forEach((projVal, i) => {
                if (splitStr[1] === 'name') {
                    var newProject = {};
                    newProject.name = projVal;
                    newProject.profileId = uId;
                    returnObj.projects.push(newProject);
                } else {
                    returnObj.projects[i][splitStr[1]] = projVal;
                }
            });

        }
    });

    return returnObj;
};
