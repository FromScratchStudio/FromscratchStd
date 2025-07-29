// CONSTANTES 
var IMG_ASSET = "IMG_ASSET";
var TXT_ASSET = "TXT_ASSET";
var BUL_TXT_ASSET = "BUL_TXT_ASSET";
var PLAY_AUDIO_ASSET = "PLAY_AUDIO_ASSET";
var STOP_AUDIO_ASSET = "STOP_AUDIO_ASSET";


var GBL_AUDIO_ON = false;

/***************************************************************************************/
/***************************************************************************************/

                  
/***************************************************************************************/
/*********************           View-Model Controller            **********************/
/*********************          Simplifyed Version 4 BD           **********************/

var CURRENT_FRAM_INDEX = -1;
var LAYER_INTERVAL_FACTOR = 10;
var LANGUAGE_EN = "EN";
var LANGUAGE_FR = "FR";
var CUR_LANGUAGE = LANGUAGE_EN;

var ChaptersDescriptions;
var Assets;
var Model;

var expectedElementToLoad = 0;
var actualElementLoaded = 0;

var ShowLoadingPanel = function()
{
    $('#assetLoader').css("display","block");
}

var HideLoadingPanel = function()
{
    $('#assetLoader').css("display","none");
    $('#audioConfirm').css("visibility","visible");
    
}

var onAssetLoaded = function(event)
{
    var target = event.target || event.srcElement;
    
    if (target.complete)
    {
        actualElementLoaded++;
        //alert("img loaded ++");
        if(actualElementLoaded >= expectedElementToLoad)
        {
            HideLoadingPanel();
        }
    }
}


// Controller managing the display of element and the link with model
var DisplayController = function()
{
    this.CurrentChapterId       = -1;
    this.NbFrames               = 0;
    this.CurrentFrame           = null;
    this.NbFramesKeys           = 0;
    this.CurrentFrameIndex      = -1;
    this.CurrentFrameKeyIndex   = -1;
    this.Assets                  = null;
    this.Model                  = null;
}

DisplayController.prototype.SetUpChaptersDesc = function(data)
{
    //alert(data);
    
    ChaptersDescriptions = data;
    
}

DisplayController.prototype.SetCurrentChapterAssets = function(data)
{
    Assets = JSON.parse(data);
}

DisplayController.prototype.SetCurrentChapterModel = function(data)
{
    Model = JSON.parse(data);
}

DisplayController.prototype.InitChaptersDescData = function()
{
    var ajaxManager = new AjaxManager();
    ajaxManager.SetJSONPath('/JSON_MODEL/LegacyChaptersDesc.json');
    ajaxManager.LoadJSON(this.SetUpChaptersDesc);

}

DisplayController.prototype.LoadAllAssets = function(assetsList)
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
            else
            {
                HideLoadingPanel();
            }

            for(var curIndex = 0; curIndex < assetsToLoad.length ; curIndex++)
            {
                if(assetsToLoad[curIndex] != undefined) 
                {
                    if(assetsToLoad[curIndex]["AssetType"] == IMG_ASSET)
                    {
                        if(assetsToLoad[curIndex]["Path"] != undefined && assetsToLoad[curIndex]["Path"] != "")
                        {
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
                    
                    if(assetsToLoad[curIndex]["AssetType"] == PLAY_AUDIO_ASSET)
                    {
                            continue;
                            var newAssetElement = $("<div> "+curIndex+" </div>");

                            var createdElement = document.createElement('audio');
                            createdElement.src = ""+ assetsToLoad[curIndex]["Path"] + "";
                            createdElement.muted = true;
                            createdElement.pause();    
                        
                            createdElement.addEventListener("load", onAssetLoaded, true);


                            var targetElem = document.getElementById("hiddenLoadContainer");
                            //alert($('#hiddenLoadContainer'));
                            $('#hiddenLoadContainer').append(createdElement);
                            //$('#hiddenLoadContainer').append(newAssetElement);
                    }
                }   
            }
        }   
    }
    catch(ex){
        alert(ex.message);
    }
}


DisplayController.prototype.InitIntro = function ()
{
    this.Assets                 = Assets;
    this.LoadAllAssets(this.Assets);
}

DisplayController.prototype.LoadIntro = function()
{
    var ajaxManager = new AjaxManager();
    var jsonAssetsPath = "/JSON_MODEL/IntroAssets.json";
    ajaxManager.SetJSONPath(jsonAssetsPath);
    ajaxManager.LoadJSON(this.SetCurrentChapterAssets);

    var sender = this;
    //setTimeout(function(){callFunction(chapterId);}, 1000);
    setTimeout(function(){sender.InitIntro();}, 1000);
}

DisplayController.prototype.Init = function(/*nbChapters, assets, model,*/ chapterId){

    //this.NbChapters             = nbChapters;
    this.CurrentChapterId       = chapterId;
    this.CurrentFrameIndex      = -1;
    this.CurrentFrameKeysNumber = 0;
    this.CurrentFrameKeyIndex   = -1;
    /*this.Assets                 = assets;
    this.Model                  = model;*/
        
    this.Assets                 = Assets;
    this.Model                  = Model["chapter_" + chapterId]; // from mockup
    
    this.NbFrames               = this.Model.length;
    
    this.LoadAllAssets(this.Assets);

}



DisplayController.prototype.ReturnFalse = function(){ return false;}


DisplayController.prototype.GetAssetDesc = function (AssetId)
{
    var returnedAsset;
    
    for(var assetIdx = 0; assetIdx < this.Assets["Assets"].length; assetIdx++)
    {
        if(this.Assets["Assets"][assetIdx]["AssetId"] == AssetId)
        {
            returnedAsset = this.Assets["Assets"][assetIdx];
            break;
        }
    }
    return returnedAsset;
}

////////Navigation functions part
var PlayerClick = function(sElemName)
{
    switch(sElemName)
    {	
            case "goPrevious":
                displayController.GoToPrevious();
            break;
				
			case "doPlay":
				break;
			
        case "goNext":
                displayController.GoToNext();
            break;

				
        default:
            break;
    }
}


//// ADD IS TO INITIATE DISPLAY CONTROLLER AND ASSET LOADING
//var displayController = new DisplayController();
//displayController.Init(0);







