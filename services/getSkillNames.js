module.exports = function(frontEnd, backEnd) {

    var trueFrontSkills = frontEnd[0]._options.attributes.map(attr => {
        // console.log(frontEnd[0][attr])
        if (attr !== 'profileId'
            && attr !== 'id'
            && attr !== 'createdAt'
            && attr !== 'updatedAt'
            && frontEnd[0][attr]) {
            return attr;
        }
    });

    var trueBackSkills = backEnd[0]._options.attributes.map(attr => {
        if (attr !== 'profileId'
            && attr !== 'id'
            && attr !== 'createdAt'
            && attr !== 'updatedAt'
            && backEnd[0][attr]) {
            return attr;
        }
    });

    return { trueFrontSkills, trueBackSkills};
};
