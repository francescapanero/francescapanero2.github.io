(function($) {

if (window.location.protocol == "file:") {
  URL = "http://ml-infra.dev/"; // Dev  
} else {
  URL = "http://34.250.87.12/"; // Prod
}

function loadScript(url, callback)
{
    // Adding the script tag to the head as suggested before
    var head = document.getElementsByTagName('head')[0];
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = url;

    // Then bind the event to the callback function.
    // There are several events for cross browser compatibility.
    script.onreadystatechange = callback;
    script.onload = callback;

    // Fire the loading
    head.appendChild(script);
}

var POSTSuccess = function(data) {

console.log(data);

}

var whenClientJSLoaded = function() {
    var client = new ClientJS(); // Create A New Client Object

    var fingerprint = client.getFingerprint(); // Get Client's Fingerprint
    var OS = client.getOS(); // Get OS Version
    var language = client.getLanguage(); // Get User Language
    var browser = client.getBrowser(); // Get Browser
    var browserVersion = client.getBrowserVersion(); // Get Browser Version
    var timeZone = client.getTimeZone(); // Get Time Zone
    var currentResolution = client.getCurrentResolution(); // Get Current Resolution
    var colorDepth = client.getColorDepth(); // Get Color Depth
    var isJava = client.isJava(); // Check For Java
    var isFlash = client.isFlash(); // Check For Flash
    var isSilverlight = client.isSilverlight(); // Check For Silverlight

    var data = [{fingerprint, OS, language, browser, browserVersion, timeZone, currentResolution, colorDepth,
      isJava, isFlash, isSilverlight}];
    
    $.ajax({
      type: "POST",
      // url: "http://0.0.0.0:80/data",
      url: URL + "predict",
      contentType: "application/json",
      data: JSON.stringify(data),
      success: POSTSuccess,
      //dataType: dataType //xml, json, script, text, html
      dataType: "json"
    });

    $('#target').on("click",function(){
      var data = [{fingerprint: fingerprint, worksClicked: 1}];
      
      $.ajax({
      type: "PUT",
      url: URL + "click",
      contentType: "application/json",
      data: JSON.stringify(data),
      // success: POSTSuccess,
      dataType: "json"
    });

    })
};

loadScript("js/client.js", whenClientJSLoaded);

})(jQuery);