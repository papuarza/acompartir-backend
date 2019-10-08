module.exports = {
  emailingOrderTemplate: (data) => {
    let type = '';
    let pesoTotal = 0;
    let paletsTotal = 0;
if(data.deliver == 'Entrega') {
  type = 'Envío'
} else {
  type = 'Recogida en almacén'
}
    let emailHTML = `
<!doctype html>
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
  <head>
    <title>
      
    </title>
    <!--[if !mso]><!-- -->
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <!--<![endif]-->
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <style type="text/css">
      #outlook a { padding:0; }
      .ReadMsgBody { width:100%; }
      .ExternalClass { width:100%; }
      .ExternalClass * { line-height:100%; }
      body { margin:0;padding:0;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%; }
      table, td { border-collapse:collapse;mso-table-lspace:0pt;mso-table-rspace:0pt; }
      img { border:0;height:auto;line-height:100%; outline:none;text-decoration:none;-ms-interpolation-mode:bicubic; }
      p { display:block;margin:13px 0; }
    </style>
    <!--[if !mso]><!-->
    <style type="text/css">
      @media only screen and (max-width:480px) {
        @-ms-viewport { width:320px; }
        @viewport { width:320px; }
      }
    </style>
    <!--<![endif]-->
    <!--[if mso]>
    <xml>
    <o:OfficeDocumentSettings>
      <o:AllowPNG/>
      <o:PixelsPerInch>96</o:PixelsPerInch>
    </o:OfficeDocumentSettings>
    </xml>
    <![endif]-->
    <!--[if lte mso 11]>
    <style type="text/css">
      .outlook-group-fix { width:100% !important; }
    </style>
    <![endif]-->
    
  <!--[if !mso]><!-->
    <link href="https://fonts.googleapis.com/css?family=Ubuntu:300,400,500,700" rel="stylesheet" type="text/css">
    <style type="text/css">
      @import url(https://fonts.googleapis.com/css?family=Ubuntu:300,400,500,700);
    </style>
  <!--<![endif]-->


    
<style type="text/css">
  @media only screen and (min-width:480px) {
    .mj-column-per-100 { width:100% !important; }
  }
</style>


    <style type="text/css">
    
    
    </style>
    
  </head>
  <body style="background-color:#eee;">
    
    
  <div
     style="background-color:#eee;"
  >
    
  
  <!--[if mso | IE]>
  <table
     align="center" border="0" cellpadding="0" cellspacing="0" style="width:600px;" width="600"
  >
    <tr>
      <td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;">
  <![endif]-->

  
  <div  style="Margin:0px auto;max-width:600px;">
    
    <table
       align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;"
    >
      <tbody>
        <tr>
          <td
             style="direction:ltr;font-size:0px;padding:20px 0;text-align:center;vertical-align:top;"
          >
            <!--[if mso | IE]>
              <table role="presentation" border="0" cellpadding="0" cellspacing="0">
            
    <tr>
  
    </tr>
  
              </table>
            <![endif]-->
          </td>
        </tr>
      </tbody>
    </table>
    
  </div>

  
  <!--[if mso | IE]>
      </td>
    </tr>
  </table>
  
  <table
     align="center" border="0" cellpadding="0" cellspacing="0" style="width:600px;" width="600"
  >
    <tr>
      <td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;">
  <![endif]-->

  
  <div  style="Margin:0px auto;max-width:600px;">
    
    <table
       align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;"
    >
      <tbody>
        <tr>
          <td
             style="direction:ltr;font-size:0px;padding:20px 0;text-align:center;vertical-align:top;"
          >
            <!--[if mso | IE]>
              <table role="presentation" border="0" cellpadding="0" cellspacing="0">
            
    <tr>
  
        <td
           style="vertical-align:top;width:600px;"
        >
      <![endif]-->
        
  <div
     class="mj-column-per-100 outlook-group-fix" style="font-size:13px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;"
  >
    
  <table
     border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%"
  >
    
        <tr>
          <td
             align="center" style="font-size:0px;padding:10px 25px;word-break:break-word;"
          >
            
  <table
     align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:collapse;border-spacing:0px;"
  >
    <tbody>
      <tr>
        <td  style="width:200px;">
          
  <img
     height="auto" src="https://res.cloudinary.com/acompartirapp/image/upload/v1568221650/images/logos/positivo_wbmqfu.png" style="border:0;display:block;outline:none;text-decoration:none;width:100%;" width="200"
  />

        </td>
      </tr>
    </tbody>
  </table>

          </td>
        </tr>
      
  </table>

  </div>

      <!--[if mso | IE]>
        </td>
      
    </tr>
  
              </table>
            <![endif]-->
          </td>
        </tr>
      </tbody>
    </table>
    
  </div>

  
  <!--[if mso | IE]>
      </td>
    </tr>
  </table>
  
  <table
     align="center" border="0" cellpadding="0" cellspacing="0" style="width:600px;" width="600"
  >
    <tr>
      <td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;">
  <![endif]-->

  
  <div  style="background:#fff;background-color:#fff;Margin:0px auto;max-width:600px;">
    
    <table
       align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="background:#fff;background-color:#fff;width:100%;"
    >
      <tbody>
        <tr>
          <td
             style="direction:ltr;font-size:0px;padding:20px 0;text-align:center;vertical-align:top;"
          >
            <!--[if mso | IE]>
              <table role="presentation" border="0" cellpadding="0" cellspacing="0">
            
    <tr>
  
        <td
           style="vertical-align:top;width:600px;"
        >
      <![endif]-->
        
  <div
     class="mj-column-per-100 outlook-group-fix" style="font-size:13px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;"
  >
    
  <table
     border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%"
  >
    
        <tr>
          <td
             align="center" style="font-size:0px;padding:10px 25px;word-break:break-word;"
          >
            
  <div
     style="font-family:Ubuntu, Helvetica, Arial, sans-serif;font-size:13px;line-height:1;text-align:center;color:#555;"
  >
    <p align="left">Hola, ${data.user.name}:</p> 

<p align="left">¡Hemos recibido tu pedido en Acompartir! </p>

<p align="left">A continuación te detallamos la información del pedido: </p>
<p align="left"><b>Número de referencia:</b> ${data.ref} </p>
<p align="left">Cualquier duda, estamos a tu disposición. </p>
<br>
      <p align="left"><u>Detalles del pedido </u></p>

<p align="left"><b>FORMA DE PAGO:</b>${data.payment}</p> 
<p align="left"><b>DELIVERY: </b>${type}</p>`
if (data.deliverAddress) {
  emailHTML += `<p align="left"><b>DIRECCIÓN DE ENTREGA: </b>${data.deliverAddress.principal}, ${data.deliverAddress.codigoPostal}. ${data.deliverAddress.ciudad}, ${data.deliverAddress.provincia}</p>`
}
emailHTML +=  `<br>

<p align="left"><u>RESUMEN DEL PEDIDO</u> </p>
<table style="width: 100%">
<tr>
<th align="left">Nombre</th>
<th align="left">Cantidad</th>
<th align="left">Participación</th>
<th align="left">Total</th>
</tr>`
let sumPrice = 0;
for(i=0; i<data.products.length; i++) {
  sumPrice += data.products[i].product.precioAcompartir * data.products[i].qty;
  emailHTML += `<tr height: 25px;">
  <td align="left">${data.products[i].product.titulo}</td>
  <td align="left">${data.products[i].qty}</td>
  <td align="left">${data.products[i].product.precioAcompartir}€</td>
  <td align="left">${data.products[i].product.precioAcompartir * data.products[i].qty}€</td>
  </tr>`
}
emailHTML += `</table>
<br>
<p align="left"><b>Total de la participación solidaria: </b>${sumPrice}€</p>
<br>
<p align="left"><u>DETALLES DE LA CUENTA:</u> </p>
<p align="left">Fundación ACOMPARTIR </p>
<p align="left">La Caixa ES13 2100 9605 7002 0012 7795</p>
<br>
<p align="left">
Si ha marcado la opción RECOGIDA EN ALMACÉN por favor llame a Atención al Cliente de SEUR ( 91 205 95 20) antes de recoger su pedido para asegurarse de que está preparado (indicar que es un pedido de ACOMPARTIR + numero de pedido). 
</p>
<p align="left"><u>DIRECCIÓN DEL ALMACÉN:</u></p>
<p align="left">Almacén de SEUR </p>
<p align="left">C/ Juan Huarte de San Juan </p>
<p align="left">Poligono Industrial Inbisa II </p>
<p align="left">28806 Alcalá de Henares (Madrid) </p>
<br>
<p align="left">Si ha marcado la opción de ENVÍO A SU CENTRO llame a Atención al Cliente de SEUR (91 205 95 20) para que le confirmen horario de entrega.</p>
<br>
<p align="left">¡Cualquier consulta que tenga sobre el pedido, comúniquese con nosotros! </p>
<br>

<p align="left">¡Muchas gracias! </p>

<br>
<p align="left"> El equipo ACOMPARTIR.</p> 
<p align="left">hola@acompartir.es </p>
<p align="left">91 369 46 97 - 649 55 95 80 </p>
<p align="left">www.acompartir.es </p>
  </div>

          </td>
        </tr>
      
  </table>

  </div>

      <!--[if mso | IE]>
        </td>
      
    </tr>
  
              </table>
            <![endif]-->
          </td>
        </tr>
      </tbody>
    </table>
    
  </div>

  
  <!--[if mso | IE]>
      </td>
    </tr>
  </table>
  
  <table
     align="center" border="0" cellpadding="0" cellspacing="0" style="width:600px;" width="600"
  >
    <tr>
      <td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;">
  <![endif]-->

  
  <div  style="Margin:0px auto;max-width:600px;">
    
    <table
       align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;"
    >
      <tbody>
        <tr>
          <td
             style="direction:ltr;font-size:0px;padding:20px 0;text-align:center;vertical-align:top;"
          >
            <!--[if mso | IE]>
              <table role="presentation" border="0" cellpadding="0" cellspacing="0">
            
    <tr>
  
        <td
           style="vertical-align:top;width:600px;"
        >
      <![endif]-->
        
  <div
     class="mj-column-per-100 outlook-group-fix" style="font-size:13px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;"
  >
    
  <table
     border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%"
  >
    
        <tr>
          <td
             align="center" style="font-size:0px;padding:10px 25px;word-break:break-word;"
          >
            
  <div
     style="font-family:Ubuntu, Helvetica, Arial, sans-serif;font-size:10px;line-height:1;text-align:center;color:#555;"
  >
    En cumplimiento de la Ley Orgánica 15/1.999 de 13 de diciembre de Protección de Datos de Carácter Personal, le informamos que la recepción de su mensaje mediante correo electrónico lleva implícita su autorización, para tratar e incorporar su dirección de correo electrónico así como el resto de datos personales que nos facilite por este u otro medio, el fichero/s del Responsable FUNDACION ACOMPARTIR y cuya finalidad es mantener futuras comunicaciones respecto a información sobre productos/servicios que puedan ser de su interés o para la empresa en la que trabaja, facilitar la gestión de FUNDACION ACOMPARTIR y cumplir con los requisitos que la legislación vigente exige a nuestra organización. Podrá ejercitar los derechos recogidos en la Ley 15/1999 en la dirección del Responsable del Fichero, con sede en C/ MORETO 4, MADRID .  En virtud de la ley 34/2002 de 11 de Julio de Servicios de la Sociedad de la Información y Correo Electrónico (LSSI-CE), este mensaje y sus archivos adjuntos pueden contener información confidencial, por lo que se informa de que su uso no autorizado está prohibido por la ley. Si ha recibido este mensaje por equivocación, por favor notifíquelo inmediatamente a través de esta misma vía y borre el mensaje original junto con sus ficheros adjuntos sin leerlo o grabarlo total o parcialmente."
  </div>

          </td>
        </tr>
      
  </table>

  </div>

      <!--[if mso | IE]>
        </td>
      
    </tr>
  
              </table>
            <![endif]-->
          </td>
        </tr>
      </tbody>
    </table>
    
  </div>

  
  <!--[if mso | IE]>
      </td>
    </tr>
  </table>
  <![endif]-->


  </div>

  </body>
</html>
`
return emailHTML;
  }
}