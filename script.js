function downloadImage() {
    const nameInput = document.getElementById('nameInput').value;
    const capitalizedFirstLetter = nameInput.charAt(0).toUpperCase() + nameInput.slice(1);
    const nameOverlay = document.getElementById('nameOverlay');
    nameOverlay.textContent = `Yo ${capitalizedFirstLetter} creo en ti !`;

    const imageContainer = document.getElementById('imageContainer');
    const logoImage = document.getElementById('logo');

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    ctx.font = 'bold 40px "Brush Script MT", cursive';
    const textWidth = ctx.measureText(nameOverlay.textContent).width;

    const padding = 20; // Espacio alrededor del texto
    const canvasWidth = textWidth + 2 * padding; // Ancho del texto más el espacio alrededor
    const canvasHeight = 595; // Alto deseado de la imagen descargada en dispositivos móviles

    canvas.width = canvasWidth;
    canvas.height = canvasHeight;

    const img = new Image();
    img.onload = function() {
        ctx.drawImage(logoImage, 0, 0, canvas.width, canvas.height);
        ctx.fillStyle = 'white';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
        ctx.shadowOffsetX = 3;
        ctx.shadowOffsetY = 3;
        ctx.shadowBlur = 5;
        ctx.fillText(nameOverlay.textContent, canvas.width / 2, canvas.height / 2 + 160);

        const imageUrl = canvas.toDataURL('image/png');
        shareImage(imageUrl); // Llamamos a la función shareImage pasando la URL de la imagen generada
    };
    img.src = 'https://barnaby-creoenti.netlify.app/logo.png'; // URL de la imagen del logo
}

function shareImage(imageUrl) {
    if (navigator.share) {
        navigator.share({
            url: imageUrl,
            title: 'Imagen personalizada',
            text: '¡Mira la imagen personalizada que he creado!',
        })
        .then(() => console.log('Compartido con éxito.'))
        .catch(error => console.log('Error al compartir:', error));
    } else {
        console.log('La API Web Share no está disponible en este navegador.');
    }
}
