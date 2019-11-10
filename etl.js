const axios = require('axios');

(async () => {
    const {
        data: { token }
    } = await axios.post('http://localhost:3000/auth/login', {
        username: 'username',
        password: 'password'
    })

    try {
        const { data } = await axios.get('http://localhost:3000/auth', {
            headers: { Authorization: `bearer ${token}`} 
        });
        console.table(data);
    } catch (err) {
        console.log(err);
    }
})();