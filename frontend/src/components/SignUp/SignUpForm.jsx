function SignUpForm() {
  return (
    <form action={`${import.meta.env.VITE_BACKEND_URL}/sign-up`} method="POST">
      <label>
        Username:
        <input name="username" />
      </label>
      <label>
        Password:
        <input name="password" />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
}

export default SignUpForm;
