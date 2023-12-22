import axios from "axios";

const url = `/login`;

const login = async (cred) => {
    try {
        const response = await axios({
            method: 'post',
            url,
            data: cred
        })
        return { success: true, data: response.data };
    }
    catch (err) {
        console.log(err);
        return { success: false, data: {} };
    }
}

export { login }