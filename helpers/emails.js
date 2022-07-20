import nodemailer from 'nodemailer';

const emailRegistro = async (datos) => {

    const transport = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });
    
    const {email, nombre, token} = datos;

    // enviar email
    await transport.sendMail({
        from: 'Bienesraices.com',
        to:email,
        subject: 'Confirmar cuenta',
        text:'confirma tu cuenta en bienesracies.com',
        html: `
            <p>Hola ${nombre}, comprueba tu cuenta en bienesraices.com</p>
            <p>Estas a un paso de lograrlo, solo debes confirmar en el siguiente enlace:
            <a href="${process.env.BACKEND_URL}:${process.env.PORT ?? 3000}/auth/confirmar/${token}">
                Confirmar cuenta
            </a>
            </p>
            <p>Si no creaste esta cuenta, simplemente ignora este email.</p>
        `
    })
}

export {
    emailRegistro
}