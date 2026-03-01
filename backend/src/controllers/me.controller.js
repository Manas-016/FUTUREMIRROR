

async function userMeController(req,res){
    const user = req.user;
    res.status(200).json({
        name:user.name
    })
}

module.exports = {userMeController}