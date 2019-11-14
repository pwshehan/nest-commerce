const axios = require('axios');

(async () => {
    try {
        const { data } = await axios.post('http://localhost:3000/auth/login', {
            username: 'username',
            password: 'password',
            // seller: true
        })
        console.log(data);

        const { token } = data;
        const { data: res2 } = await axios.get('http://localhost:3000/auth', {
            headers: { Authorization: `bearer ${token}`} 
        });

        console.table(res2);
    } catch (err) {
        console.log(err); 
    }
})();