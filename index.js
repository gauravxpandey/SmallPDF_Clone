let imageurl 

// TO SHOW IMAGE PREVIEW

$(function() {
  // Multiple images preview in browser
  var imagesPreview = function(input, placeToInsertImagePreview) {
      if (input.files) {
          var filesAmount = input.files.length;
          console.log(input.files)
          console.log(filesAmount)
          for (i = 0; i < filesAmount; i++) {
              var reader = new FileReader();
              reader.onload = function(event) {
              imageurl = event.target.result;
                  $($.parseHTML('<img>')).attr('src', imageurl).appendTo(placeToInsertImagePreview);
              }
              reader.readAsDataURL(input.files[i]);
          }
      }
  };

  $('#gallery-photo-add').on('change', function() {
      imagesPreview(this, 'div.gallery');
      $('.input_png, .space, .first_line, .hero_line, .navbar-toggler, .navbar-nav, .navbar-text, .btn').css("display", "none")
      $('.gallery, .converts').css("display", "block")
      $('#myElement').css("display", "none")
  });
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
