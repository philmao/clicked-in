// a helper function that separates frontend & backend skills from req.body
// to easily insert new rows in corresponding frontend/backend skill tables
module.exports = function(body, uId) {

    var propNames = Object.getOwnPropertyNames(body);
    var returnObj = {
        'frontEnd': { 'profileId': uId },
        'backEnd': { 'profileId': uId },
        'projects': [

        ]
    };

    // console.log(body);

    propNames.forEach(propName => {
        // split prop name by '-'
        // names on checkboxes in signup follow this convention:
        // name="front-html" || name="back-mysql"
        var splitStr = propName.split('-');
        var refactoredArr;

        if (splitStr[0] === 'front') {

            returnObj.frontEnd[splitStr[1]] = 1;

        } else if (splitStr[0] === 'back') {

            returnObj.backEnd[splitStr[1]] = 1;

        } else if (splitStr[0] === 'proj') {

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
