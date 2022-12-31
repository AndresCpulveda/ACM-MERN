import dotenv from 'dotenv'
import nodemailer from 'nodemailer'

const emailForgotPswd = async (data) => {
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
    from: 'ACM Administrador de Clientes Mecano',
    to: email,
    subject: 'Enlace para restablecer tu contraseña',
    text: 'Restablece tu contraseña',
    html: `<p>Hola ${name} parece que has olvidado tu contraseña, puedes restablecerla en el sigiente enlace: 
    <a href="${process.env.FRONTEND_URL}/forgot-password/${token} 
    ">Restablecer</a></p>
      <p>Si no olvidaste tu contraseña, puedes ignorar este mensaje</p>
    `
  })
  console.log(`Mensaje enviado con exito`, info.messageId);
}

export default emailForgotPswd