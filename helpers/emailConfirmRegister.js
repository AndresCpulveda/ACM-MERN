import dotenv from 'dotenv'
import nodemailer from 'nodemailer'

const emailConfirm = async (data) => {
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  const {email, name, token} = data;

  const info = await transporter.sendMail({
    from: '"APV - Administrador Pacientes Veterinaria" <apv@correo.com>',
    to: email,
    subject: 'Enlace para confirmar tu cuenta',
    text: 'Confirma tu cuenta',
    html: `<p>Hola ${name} tu usuario fue creado, por favor confirma tu cuenta en el sigiente enlace: 
    <a href="${process.env.FRONTEND_URL}/confirm/${token} 
    ">Confirmar Cuenta</a></p>
      <p>Si no creaste esta cuenta, puedes ignorar este mensaje</p>
    `
  })
  console.log(`Mensaje enviado con exito`, info.messageId);
}

export default emailConfirm