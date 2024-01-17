const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const MessagingResponse = require('twilio').twiml.MessagingResponse;
const https = require('https');
const app = express();
const port = 5500;

app.use(bodyParser.urlencoded({ extended: true }));

app.post('/actualizar-imagen', async (req, res) => {
    try {
      const mensaje = req.body.Body;
      const mediaUrl = req.body.MediaUrl0;
      const remitenteNumero = req.body.From;
  
      // Verificar que el mensaje provenga del número específico
      if (remitenteNumero === 'whatsapp:' + '5491169741367') {
        if (mediaUrl) {
          // Descargar la imagen y guardarla en Firestore
          const imagenBuffer = await downloadImage(mediaUrl);
          const imagenRef = await uploadImageToFirestore(imagenBuffer);
  
          const twiml = new MessagingResponse();
          twiml.message('Imagen actualizada correctamente');
  
          // También puedes enviar la URL de la imagen almacenada en Firestore en la respuesta si lo deseas
          // twiml.message(`Imagen almacenada en: ${imagenRef}`);
  
          res.writeHead(200, { 'Content-Type': 'text/xml' });
          res.end(twiml.toString());
        } else {
          throw new Error('No se proporcionó una URL de imagen válida');
        }
      } else {
        throw new Error('Número no autorizado para enviar imágenes');
      }
    } catch (error) {
      console.error('Error al procesar la solicitud:', error.message);
      res.status(500).send('Error al procesar la solicitud');
    }
  });
  
  async function downloadImage(mediaUrl) {
    return new Promise((resolve, reject) => {
      https.get(mediaUrl, (response) => {
        const chunks = [];
        response.on('data', (chunk) => chunks.push(chunk));
        response.on('end', () => resolve(Buffer.concat(chunks)));
        response.on('error', reject);
      });
    });
  }
  
  async function uploadImageToFirestore(imageBuffer) {
    const imagenRef = await db.collection('imagenes').add({
      imagen: imageBuffer.toString('base64'),
    });
  
    return imagenRef.id;
  }
  app.get('/imagen-actual', async (req, res) => {
    try {
      const imagenDoc = await db.collection('imagenes').doc('ID_DE_LA_IMAGEN').get(); // Reemplaza 'ID_DE_LA_IMAGEN' con la ID real de la imagen
  
      if (imagenDoc.exists) {
        const imagenData = imagenDoc.data();
        const imagenBuffer = Buffer.from(imagenData.imagen, 'base64');
  
        res.writeHead(200, { 'Content-Type': 'image/jpeg' });
        res.end(imagenBuffer, 'binary');
      } else {
        throw new Error('La imagen no existe en Firestore');
      }
    } catch (error) {
      console.error('Error al obtener la imagen desde Firestore:', error.message);
      res.status(500).send('Error al obtener la imagen desde Firestore');
    }
  });