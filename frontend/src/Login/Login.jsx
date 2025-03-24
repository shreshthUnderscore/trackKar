function (){
    return(
        <form action="/login" method="POST">
            <label>
                Username:
                <input name="username"/>
            </label>
            <label>
                Password:
                <input name="password"/>
            </label>
        </form>
    )
}