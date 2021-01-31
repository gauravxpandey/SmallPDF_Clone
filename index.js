let imageurl 

// TO SHOW IMAGE PREVIEW

const inputs = document.getElementsByClassName("input")
const inpfile = document.getElementById("inpFile");
const previewContainer = document.getElementById("imagePreview");
const previewImage = document.getElementsByClassName("image-preview__preview");

inpfile.addEventListener("change", function() {
    const file = this.files[0];

    if (file) {
        const reader = new FileReader();

        $('.input_png, .space, .first_line, .hero_line, .navbar-toggler, .navbar-nav, .navbar-text, .btn').css("display", "none")
        $('.image-preview, .converts').css("display", "block")
        $('#myElement').css("display", "none")

        reader.addEventListener("load", function() {
        console.log(this)
        imageurl = this.result
        $('.image-preview__preview').attr("src", imageurl);  
    });

        reader.readAsDataURL(file);
    }
});


// TO CONVERT IMAGE INTO PDF

const { PDFDocument } = PDFLib

    async function embedImages() {
			// Fetch JPEG image
        const jpgUrl = imageurl;
        const jpgImageBytes = await fetch(jpgUrl).then((res) => res.arrayBuffer())

      // Create a new PDFDocument
        const pdfDoc = await PDFDocument.create()
        const jpgImage = await pdfDoc.embedJpg(jpgImageBytes)
        const jpgDims = jpgImage.scale(0.25)

      // Add a blank page to the document
        const page = pdfDoc.addPage()

      // Draw the JPG image in the center of the page
        page.drawImage(jpgImage, {
            x: page.getWidth() / 2 - jpgDims.width / 2,
            y: page.getHeight() / 2 - jpgDims.height / 2,
            width: jpgDims.width,
            height: jpgDims.height,
    })

      // Serialize the PDFDocument to bytes (a Uint8Array)
        const pdfBytes = await pdfDoc.save()

			// Trigger the browser to download the PDF document
        download(pdfBytes, "jpg_image.pdf", "application/pdf");
}
