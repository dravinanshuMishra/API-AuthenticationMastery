const registerUser = async(name: string, email:string, password: string) => {
  console.log("register", name, email, password);

  // later: yaha mongoose model ka use karke DB save karoge
  return { name, email, password }; 
};

export { registerUser };
