import * as React from 'react';


const LoginComponent = ({username="vanessa"}) => {
        return <form>
        <input type="text" value={username} />
        <input type="submit" value = "Se connecter" />
    </form>
};

export default LoginComponent;