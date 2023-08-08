function generateImage() {
    const nameInput = document.getElementById('nameInput').value;
    const capitalizedFirstLetter = nameInput.charAt(0).toUpperCase() + nameInput.slice(1);
    const nameOverlay = document.getElementById('nameOverlay');
    nameOverlay.textContent = `Yo ${capitalizedFirstLetter} creo en ti !`;

    downloadImage();
}

function downloadImage() {
    const imageContainer = document.getElementById('imageContainer');
    const logoImage = document.getElementById('logo');
    const nameOverlay = document.getElementById('nameOverlay');

    const canvasWidth = 350; // Ancho deseado de la imagen descargada en dispositivos móviles
    const canvasHeight = 595; // Alto deseado de la imagen descargada en dispositivos móviles

    const canvas = document.createElement('canvas');
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    const ctx = canvas.getContext('2d');

    const img = new Image();
    img.onload = function() {
        ctx.drawImage(logoImage, 0, 0, canvas.width, canvas.height);
        ctx.font = '45px "Brush Script MT", cursive';
        ctx.fillStyle = 'white';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
        ctx.shadowOffsetX = 3;
        ctx.shadowOffsetY = 3;
        ctx.shadowBlur = 5;
        ctx.fillText(nameOverlay.textContent, canvas.width / 2, canvas.height / 2 + 150); // Baja 100 píxeles y mueve 20 píxeles a la derecha

        const link = document.createElement('a');
        link.download = 'imagen_personalizada.png';
        link.href = canvas.toDataURL('image/png');
        link.click();

    };

    img.src = logoImage.src;
}

function shareImage() {
    const canvas = document.createElement('canvas');
    const imageContainer = document.getElementById('imageContainer');
    canvas.width = imageContainer.offsetWidth;
    canvas.height = imageContainer.offsetHeight;
    const ctx = canvas.getContext('2d');
    const logoImage = document.getElementById('logo');
    const nameOverlay = document.getElementById('nameOverlay');

    ctx.drawImage(logoImage, 0, 0, canvas.width, canvas.height);
    ctx.fillText(nameOverlay.textContent, canvas.width / 2, canvas.height / 2);

    canvas.toBlob(blob => {
        const filesArray = [new File([blob], 'imagen_personalizada.png', { type: 'image/png' })];
        if (navigator.share && navigator.canShare({ files: filesArray })) {
            navigator.share({
                files: filesArray,
                title: 'Imagen personalizada',
                text: '¡Mira la imagen personalizada que he creado!',
            })
                .then(() => console.log('Compartido con éxito.'))
                .catch(error => console.log('Error al compartir:', error));
        } else {
            console.log('La API Web Share no está disponible en este navegador.');
        }
    }, 'image/png');
}





