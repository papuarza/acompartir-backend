const express = require('express');
const uploadCloud = require('../config/cloudinary.js');
const router  = express.Router();
const sendGrid = require('../config/sendgrid');

router.post('/empresa', (req, res, next) => {
  const { 
    nombre = 'No ha especificado', 
    empresa = 'No ha especificado', 
    email = 'No ha especificado', 
    telefono = 'No ha especificado' } = req.body.mensaje;
  const data = { seccion: 'Empresas', nombre, entidad: empresa, email, telefono}
  const subject = 'Nuevo mensaje de una empresa desde la web de Acompartir'
  sendGrid.sendEmail(process.env.ADMIN_EMAIL, process.env.FROM_EMAIL, subject, data)
  .then(response => {
    res.status(200).json({status: 200, message: 'Ha sido enviado'})
  })
  .catch(error => {
    res.status(500).json({message: 'Hubo un error'})
  })
});

router.post('/ong', (req, res, next) => {
  const { 
    nombre = 'No ha especificado', 
    ong = 'No ha especificado', 
    email = 'No ha especificado', 
    telefono = 'No ha especificado' } = req.body.mensaje;
  const data = { seccion: 'ONGs', nombre, entidad: ong, email, telefono}
  const subject = 'Nuevo mensaje de una ONG desde la web de Acompartir'
  sendGrid.sendEmail(process.env.ONG_EMAIL, process.env.FROM_EMAIL, subject, data)
  .then(response => {
    res.status(200).json({status: 200, message: 'Ha sido enviado'})
  })
  .catch(error => {
    res.status(500).json({message: 'Hubo un error'})
  })
});

router.post('/consulta', (req, res, next) => {
  const { 
    nombre = 'No ha especificado', 
    asunto = 'No ha especificado', 
    email = 'No ha especificado', 
    mensaje = 'No ha especificado' } = req.body.mensaje;
  const data = { seccion: 'Inicio', nombre, asunto, email, mensaje}
  const subject = 'Nuevo mensaje desde la HOME de la web de Acompartir';
  sendGrid.sendConsulta(process.env.ADMIN_EMAIL, process.env.FROM_EMAIL, subject, data)
  .then(response => {
    res.status(200).json({status: 200, message: 'Ha sido enviado'})
  })
  .catch(error => {
    res.status(500).json({message: 'Hubo un error'})
  })
});


router.post('/donacion', (req, res, next) => {
  let { 
    nombre = 'No ha especificado', 
    dni = 'No ha especificado', 
    email = 'No ha especificado', 
    certificado = 'No ha especificado',
    tratamientoDatos = 'No ha especificado',
    recibirInfo = 'No ha especificado',
    recibirPubli = 'No ha especificado' } = req.body.data;
  certificado ? certificado = 'Aceptado' : certificado = 'Rechazado';
  tratamientoDatos ? tratamientoDatos = 'Aceptado' : tratamientoDatos = 'Rechazado';
  recibirInfo ? recibirInfo = 'Aceptado' : recibirInfo = 'Rechazado';
  recibirPubli ? recibirPubli = 'Aceptado' : recibirPubli = 'Rechazado';
  const data = { seccion: 'Donación', nombre, dni, email, certificado, tratamientoDatos, recibirInfo, recibirPubli}
  const subject = 'Nuevo mensaje desde DONACIONES de la web de Acompartir';
  sendGrid.sendDonacion(process.env.ADMIN_EMAIL, process.env.FROM_EMAIL, subject, data)
  .then(response => {
    res.status(200).json({status: 200, message: 'Ha sido enviado'})
  })
  .catch(error => {
    res.status(500).json({message: 'Hubo un error'})
  })
});

module.exports = router;