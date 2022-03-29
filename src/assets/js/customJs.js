
var ip="";
function calljsapi_as(url){

    $.ajax({
        type: "GET",
        url: url,
        async:false,
        success: function (response) {
            ip = response.ClientIP;
            return response.ClientIP;

            // Your next function 
           
        }
    });
}

  function calljsapi(path) {
    calljsapi_as(path);
   
    return ip;
}
