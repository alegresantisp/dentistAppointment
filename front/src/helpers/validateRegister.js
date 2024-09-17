export const validateRegister = (formData) => {
    const errors = {};

    // Validar nombre requerido
    if (!formData.name.trim()) {
        errors.name = "Nombre es requerido";
    }

    // Validar email requerido y formato válido
    if (!formData.email.trim()) {
        errors.email = "Email es requerido";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        errors.email = "Formato de email inválido";
    }

    // Validar fecha de nacimiento requerida y no posterior a 5 años
    const birthdate = new Date(formData.birthdate);
    const fiveYearsAgo = new Date();
    fiveYearsAgo.setFullYear(fiveYearsAgo.getFullYear() - 5);

    if (!formData.birthdate.trim()) {
        errors.birthdate = "Fecha de nacimiento es requerida";
    } else if (birthdate > fiveYearsAgo) {
        errors.birthdate = "Debes ser mayor de 5 años para registrarte";
    }

       // Validar contraseña mínima de 6 caracteres y al menos una mayúscula
    if (formData.password.length < 6) {
        errors.password = "La contraseña debe tener al menos 6 caracteres";
    } else if (!/[A-Z]/.test(formData.password)) {
        errors.password = "La contraseña debe contener al menos una letra mayúscula";
    }

    return errors;
};
