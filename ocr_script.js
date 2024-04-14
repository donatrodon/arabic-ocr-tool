document.getElementById('imageInput').addEventListener('change', function(e) {
    if (e.target.files.length === 0) {
        console.log('No file selected!');
        return;
    }
    const imageFile = e.target.files[0];
    recognizeText(imageFile);
});

function recognizeText(imageFile) {
    const language = document.getElementById('languageSelect').value; // Get the selected language from dropdown
    console.log('Recognizing in ' + language + '...');
    const reader = new FileReader();
    reader.onload = function() {
        const img = new Image();
        img.src = reader.result;
        img.onload = function() {
            Tesseract.recognize(
                img,
                language, // Use the selected language for OCR
                {
                    logger: m => console.log(m), // Log OCR progress
                    errorHandler: e => console.error(e)
                }
            ).then(({ data: { text } }) => {
                document.getElementById('output').textContent = text; // Display the recognized text
                console.log(text);
            });
        };
    };
    reader.readAsDataURL(imageFile);
}
