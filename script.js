const qrCodeData = "https://qr-motivation.netlify.app/motivation.html";
const qrOptions = {
  width: 200,
  height: 200,
  colorDark: "#24E0FF", // baskın olan renk
  colorLight: "transparent", // arkaplan rengi
};
const qrcode = new QRCode(document.getElementById("qrcode"), qrOptions);
qrcode.makeCode(qrCodeData);
$(function () {
  const accessKey = "kWS6BZHQxOt0OypyqG0DlnMpqqKAdTW4ns2NdAlvyyE";
  const term = "wonderful";
  const imgArray = [];

  function fetchBackground() {
    function randomNumber(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    $.ajax({
      url: `https://api.unsplash.com/search/photos?per_page=50&orientation=landscape&query=${term}`,
      type: "GET",
      headers: {
        Authorization: `Client-ID ${accessKey}`,
      },
      success: function (data) {
        const images = data.results;
        images.forEach((element) => {
          imgArray.push(element.urls.raw);
        });
        if (imgArray.length > 0) {
          let currentNumber = randomNumber(0, imgArray.length - 1);
          //   $(".motivation").css(
          //     "background-image",
          //     "url(" + imgArray[currentNumber] + ")"
          //   );
          $(".motivation").html(imgArray[currentNumber]);
        }
      },
      error: function (error) {
        console.error("başarısız oldu", error);
      },
    });
  }
  fetchBackground();
});
