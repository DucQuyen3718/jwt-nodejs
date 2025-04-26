import loginRegisterService from '../service/loginRegisterService'

const testApi = (req, res) => {
    return res.status(200).json({
        message: 'OK',
        data: 'Test api'
    })
}

const handleRegister = async (req, res) => {
    try {
        //req.body: email, phone, usename, password
        if (!req.body.email || !req.body.phone || !req.body.password) {
            return res.status(200).json({
                EM: 'missing required parameters',
                EC: '1',
                DT: ''
            })
        }

        if (req.body.password && req.body.password.length < 4) {
            return res.status(200).json({
                EM: 'your pass word must have more than 3 letter',
                EC: '-1',
                DT: ''
            })
        }

        //service: create user

        let data = await loginRegisterService.registerNewUser(req.body)


        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: ''
        })

    } catch (e) {
        return res.status(500).json({
            EM: 'error from server',    //error message
            EC: '-1',         //error code
            DT: '',         //Date
        })
    }
}

const handleLogin = async (req, res) => {
    try {
        let data = await loginRegisterService.handleUserLogin(req.body);

        //set cookie
        if (data && data.DT.access_token) {
            res.cookie("jwt", data.DT.access_token, { httpOnly: true, maxAge: 60 * 60 * 1000 });
        }

        return res.status(200).json({
            EM: data.EM,    //error message
            EC: data.EC,         //error code
            DT: data.DT,         //Data
        })
    } catch (error) {
        console.log("Check error: ", error)
        return res.status(500).json({
            EM: 'error from server',    //error message
            EC: '-1',         //error code
            DT: '',         //Date
        })
    }
}

const handleLogout = (req, res) => {
    try {
        res.clearCookie("jwt");

        return res.status(200).json({
            EM: 'Clear cookies done!',    //error message
            EC: 0,         //error code
            DT: '',         //Data
        })
    } catch (error) {
        console.log("Check error: ", error)
        return res.status(500).json({
            EM: 'error from server',    //error message
            EC: '-1',         //error code
            DT: '',         //Date
        })
    }
}


module.exports = {
    testApi,
    handleRegister,
    handleLogin,
    handleLogout
}