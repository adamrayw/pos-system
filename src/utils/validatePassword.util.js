export const validatePassword = (password) => {
    if (!password) {
        return ""
    }

    if (password.length <= 5) {
        return "Password harus lebih atau sama dengan 6 karakter"
    }
};