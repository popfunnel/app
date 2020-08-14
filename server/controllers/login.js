// todo?

module.exports = {
    post(req, res) {
        console.log("Asking to post login")
        res.json({
            success: true,
        })
    },
};
