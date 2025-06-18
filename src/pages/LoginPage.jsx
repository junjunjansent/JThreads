const LoginPage = () => {
  return (
    <>
      <h1>LoginPage</h1>
      <form>
        <label>Username</label>
        <input type="text" name="username_input"></input>
        <label>Password:</label>
        <input type="text" name="password_input"></input>
        <button>Submit</button>
      </form>
    </>
  );
};

export default LoginPage;
