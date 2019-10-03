require('dotenv').config();
const sgMail = require('@sendgrid/mail');
const template = require('../templates/welcome.js');
const orderTemplate = require('../templates/order.js');
const paypalTemplate = require('../templates/paypal.js');
const donationTemplate = require('../templates/donation.js');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

sendEmail = (to, from, subject, data) => {
  const msg = {
    to,
    from,
    subject,
    html: `
    <h2>¡Tienes un nuevo mensaje desde la sección de ${data.seccion} de la web!</h2>
    <b>Nombre:</b> ${data.nombre}<br>
    <b>Empresa:</b> ${data.entidad}<br>
    <b>Email:</b> ${data.email}<br>
    <b>Telefono:</b> ${data.telefono}<br>`,
  };
  return sgMail.send(msg);
}

sendConsulta = (to, from, subject, data) => {
  const msg = {
    to,
    from,
    subject,
    html: `
    <h2>¡Tienes un nuevo mensaje desde la sección de ${data.seccion} de la web!</h2>
    <b>Nombre:</b> ${data.nombre}<br>
    <b>Asunto:</b> ${data.asunto}<br>
    <b>Email:</b> ${data.email}<br>
    <b>Consulta:</b> ${data.mensaje}<br>`,
  };
  return sgMail.send(msg);
}

sendDonacion = (to, from, subject, data) => {
  const msg = {
    to,
    from,
    subject,
    html: `
    <h2>¡Tienes un nuevo mensaje desde la sección de ${data.seccion} de la web!</h2>
    <b>Nombre y Apellido:</b> ${data.nombre}<br>
    <b>DNI:</b> ${data.dni}<br>
    <b>Email:</b> ${data.email}<br>
    <b>Certificado Desgravación:</b> ${data.certificado}<br>
    <b>Politica de Privacidad:</b> ${data.tratamientoDatos}<br>
    <b>Recibir Información:</b> ${data.recibirInfo}<br>
    <b>Recibir Publicidad:</b> ${data.recibirPubli}<br>`,
  };
  return sgMail.send(msg);
}

sendWelcomeEmail = (from, subject, data) => {
  const msg = {
    to: data.to,
    from,
    subject,
    html: template.emailingTemplate(data.personaContacto, data.to),
  };
  return sgMail.send(msg);
}

sendNewOrderEmail = (from, to, data) => {
  const msg = {
    to,
    from,
    subject: 'Nuevo pedido en Acompartir',
    html: orderTemplate.emailingOrderTemplate(data),
  };
  return sgMail.send(msg);
}

sendPaypalOrderEmail = (from, to, data) => {
  const msg = {
    to,
    from,
    subject: 'Pago recibido por Paypal',
    html: paypalTemplate.emailingPaypalTemplate(data),
  };
  return sgMail.send(msg);
}

sendDonationEmail = (to, monto, ong, personaContacto, from) => {
  const msg = {
    to,
    from,
    subject: '¡Has recibido una donación en Acompartir!',
    html: donationTemplate.emailingDonationTemplate(personaContacto, monto, ong),
  };
  return sgMail.send(msg);
}


module.exports = {
  sendEmail, 
  sendConsulta,
  sendWelcomeEmail,
  sendDonacion,
  sendNewOrderEmail,
  sendDonationEmail,
  sendPaypalOrderEmail
};