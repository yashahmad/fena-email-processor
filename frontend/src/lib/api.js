const getSession = async () => {
    const res = await fetch('http://localhost:5000',{
        method:'GET'
    });
    if(res.ok){
        return res.text();
    }
}

const setSession = async () => {
    const session = await getSession();
    localStorage.setItem('sessionToken',session);
}

const checkSession = () => {
    const sessionToken = localStorage.getItem('sessionToken');
    if(!sessionToken){
        setSession();
    }
    return sessionToken; 
}

const sendEmail = async (numEmail) => {
    const token = checkSession();
    try {
        const res = await fetch('http://localhost:5000/send', {
            method: 'POST',
            body: JSON.stringify({ "numEmail": numEmail }),
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': token,
            },
        });
        return res.json();
    }
    catch (error) {
        console.error(error);
    }
}


export { checkSession, sendEmail };