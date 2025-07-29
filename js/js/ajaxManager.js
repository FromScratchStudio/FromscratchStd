var AjaxManager = function()
{
    this.JsonPath = "";
}

AjaxManager.prototype.SetJSONPath = function(jsonPath)
{
    this.JsonPath = jsonPath;
}


AjaxManager.prototype.LoadJSON = function(JSONCallback)
{
   var http_request = new XMLHttpRequest();
   var currentJSONCallback = JSONCallback;
   try{
      // Opera 8.0+, Firefox, Chrome, Safari
      http_request = new XMLHttpRequest();
   }catch (e){
      // Internet Explorer Browsers
      try{
         http_request = new ActiveXObject("Msxml2.XMLHTTP");
      }catch (e) {
         try{
            http_request = new ActiveXObject("Microsoft.XMLHTTP");
         }catch (e){
            // Something went wrong
            alert("Your browser broke!");
            return false;
         }
      }
   }
   var callbackToCall = function(data){ currentJSONCallback(data);}
   http_request.onreadystatechange  = function(){
      if (http_request.readyState == 4  )
      {
        //alert(http_request.responseText);
        callbackToCall(http_request.responseText);
        // Javascript function JSON.parse to parse JSON data
        /*var jsonObj = JSON.parse(http_request.responseText);*/

        // jsonObj variable now contains the data structure and can
        // be accessed as jsonObj.name and jsonObj.country.
        /*document.getElementById("Name").innerHTML =  jsonObj.name;
        document.getElementById("Country").innerHTML = jsonObj.country;*/
      }
   }
   http_request.open("GET", this.JsonPath, true);
   http_request.send();
}




var LoadAllAssets = function(assetsList)
{
    try{
    
        expectedElementToLoad = 0;
        if(assetsList["Assets"] != undefined)
        {
            var assetsToLoad = assetsList["Assets"];


            for(var curIndex = 0; curIndex < assetsToLoad.length ; curIndex++)
            {
                if(assetsToLoad[curIndex] != undefined) 
                {
                    if(assetsToLoad[curIndex]["AssetType"] == IMG_ASSET)
                    {
                        if(assetsToLoad[curIndex]["Path"] != undefined && assetsToLoad[curIndex]["Path"] != "")
                        {
                            expectedElementToLoad++;
                        }            

                    }
                }   
            }

            if(expectedElementToLoad > 0)
            {
                ShowLoadingPanel();
            }

            for(var curIndex = 0; curIndex < assetsToLoad.length ; curIndex++)
            {
                if(assetsToLoad[curIndex] != undefined) 
                {
                    if(assetsToLoad[curIndex]["AssetType"] == IMG_ASSET)
                    {
                        if(assetsToLoad[curIndex]["Path"] != undefined && assetsToLoad[curIndex]["Path"] != "")
                        {
                            //alert("Append image");
                            /*var elemToLoad = "<div>img id='img_Asset_"+curIndex+"' src='url('"+ assetsToLoad[curIndex]["Path"] + "')' onload='onAssetLoaded(this);'</div>"
                            $('#hiddenLoadContainer').append(elemToLoad);
                            var u = 0;*/

                            //alert("appliedClass" + appliedClass);
                            var newAssetElement = $("<div> "+curIndex+" </div>");

                            var createdElement = document.createElement('img');
                            createdElement.src = ""+ assetsToLoad[curIndex]["Path"] + "";
                            createdElement.addEventListener("load", onAssetLoaded, true);


                            var targetElem = document.getElementById("hiddenLoadContainer");
                            //alert($('#hiddenLoadContainer'));
                            $('#hiddenLoadContainer').append(createdElement);
                            //$('#hiddenLoadContainer').append(newAssetElement);

                            //alert("Appended image ok!!!");
                        }  
                    }
                }   
            }
        }   
    }
    catch(ex){
        alert(ex.message);
    }
}