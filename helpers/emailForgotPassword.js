import dotenv from 'dotenv'
import nodemailer from 'nodemailer'

const emailForgotPswd = async (data) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "d6cabe0692b014",
      pass: "e886233dc2f533"
    }
  });

  const {email, name, token} = data;

  const info = await transporter.sendMail({
    from: 'ACM Administrador de Clientes Mecano',
    to: email,
    subject: 'Enlace para restablecer tu contraseña',
    text: 'Restablece tu contraseña',
    html: `<p>Hola ${name} parece que has olvidado tu contraseña, puedes restablecerla en el sigiente enlace: 
    <a href="${process.env.FRONTEND_URL}/olvide-password/${token} 
    ">Restablecer</a></p>
      <p>Si no olvidaste tu contraseña, puedes ignorar este mensaje</p>
    `
  })
  console.log(`Mensaje enviado con exito`, info.messageId);
}

export default emailForgotPswd