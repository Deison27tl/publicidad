function generateImage() {
    const nameInput = document.getElementById('nameInput').value;
    const capitalizedFirstLetter = nameInput.charAt(0).toUpperCase() + nameInput.slice(1);
    const nameOverlay = document.getElementById('nameOverlay');
    nameOverlay.textContent = `Yo ${capitalizedFirstLetter} creo en ti !`;

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

  
    const canvasWidth = 370; // Ancho del texto más el espacio alrededor
    const canvasHeight = 595; // Alto deseado de la imagen descargada en dispositivos móviles

    canvas.width = canvasWidth;
    canvas.height = canvasHeight;

    const logoImage = document.getElementById('logo');
    const img = new Image();
    img.onload = function() {
        ctx.drawImage(logoImage, 0, 0, canvas.width, canvas.height);
        ctx.font = 'bold 40px "Brush Script MT", cursive';
        ctx.fillStyle = 'white';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
        ctx.shadowOffsetX = 3;
        ctx.shadowOffsetY = 3;
        ctx.shadowBlur = 5;
        ctx.fillText(nameOverlay.textContent, canvas.width / 2, canvas.height / 2 + 160); // Baja 100 píxeles y mueve 20 píxeles a la derecha

        const link = document.createElement('a');
        link.download = 'imagen_personalizada.png';
        link.href = canvas.toDataURL('image/png');
        link.click();
        shareImage(canvas.toDataURL('image/png'));
    };
    img.src = 'https://barnaby-creoenti.netlify.app/logo.png'; // URL real de la imagen de logo
}

function shareImage(imageUrl) {
    if (navigator.share) {
        navigator.share({
            title: 'Imagen personalizada',
            text: '¡Mira la imagen personalizada que he creado!',
            url: imageUrl,
        })
        .then(() => console.log('Compartido con éxito.'))
        .catch(error => console.log('Error al compartir:', error));
    } else {
        console.log('La API Web Share no está disponible en este navegador.');
    }
}