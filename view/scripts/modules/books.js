let urlBase = "http://127.0.0.1:8080/"

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('upload-form');
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const title = document.getElementById('book-title').value;
        const file = document.getElementById('pdf-file').files[0];

        if (!title || !file) {
            alert('Por favor, completa todos los campos.');
            return;
        }

        const reader = new FileReader();

        reader.onload = async (event) => {
            const pdfBase64 = event.target.result.split(',')[1];

            const data = {
                title: title,
                pdf_base64: pdfBase64,
            };
            try {
                const response = await fetch(urlBase+"save/book", {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data),
                });

                if (response.ok) {
                    alert('Libro subido con éxito.');
                    form.reset();
                } else {
                    alert('Hubo un problema al subir el libro.');
                }
            } catch (error) {
                console.error('Error:', error);
                alert('Hubo un error en la comunicación con la API.');
            }
        };

        reader.readAsDataURL(file);
    });
});
