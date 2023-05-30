export const validatePassword = (password) => {
    if (!password) {
        return ""
    }

    if (password.length <= 6) {
        return "Password harus lebih atau sama dengan 6 karakter"
    }
};