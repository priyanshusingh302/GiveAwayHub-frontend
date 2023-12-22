import axios from "axios";

const url = `/register`;

const signup = async (user) => {
    try {
        const response = await axios({
            method: 'post',
            url,
            data: user
        })
        return { success: true, data: response.data };
    }
    catch (err) {
        console.log(err);
        return { success: false, data: {} };
    }
}

export { signup }