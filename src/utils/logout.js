export const logout = (router) => {
    localStorage.removeItem("token");
    console.log("User logged out. Token removed.");

    router.replace("/");
};
