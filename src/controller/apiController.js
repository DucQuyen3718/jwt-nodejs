const testApi = (req, res) => {
    return res.status(200).json({
        message: 'OK',
        data: 'Test api'
    })
}

const handleRegister = (req, res) => {
    console.log("Call me", req.body);
}

module.exports = {
    testApi,
    handleRegister
}