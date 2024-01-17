const twilio = require('twilio');
const { validateRequest } = twilio.webhook;

const authToken = 'f27ffa50cc0b80f7921168df2c84cbc5';

app.use('/actualizar-imagen', validateRequest({ authToken }));
https.get(mediaUrl, function (response) {
    response.pipe(imagenStream);
  
    response.on('end', () => {
      // Devolver una respuesta
      const twiml = new MessagingResponse();
      twiml.message('Imagen actualizada correctamente');
      res.writeHead(200, { 'Content-Type': 'text/xml' });
      res.end(twiml.toString());
    });
  });