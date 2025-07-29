var expectedElementToLoad = 0;
var actualElementLoaded = 0;

var LoadAllAssets = function(assetsList)
{
    alert("LoadAllAssets");
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
        
        if(expectedElementToLoad)
        {
            
        }
        
        for(var curIndex = 0; curIndex < assetsToLoad.length ; curIndex++)
        {
            if(assetsToLoad[curIndex] != undefined) 
            {
                if(assetsToLoad[curIndex]["AssetType"] == IMG_ASSET)
                {
                    if(assetsToLoad[curIndex]["Path"] != undefined && assetsToLoad[curIndex]["Path"] != "")
                    {
                        var elemToLoad = "<img src='"+ assetsToLoad[curIndex]["Path"] + "' onload='OnAssetLoaded()'>"
                        $('#hiddenLoadContainer').append(elemToLoad);
                    }  
                }
            }   
        }
    }

}


var OnAssetLoaded = function()
{
    actualElementLoaded++;
    
    if(actualElementLoaded >= expectedElementToLoad)
    {
        HideLoadingPanel();
    }
}

var ShowLaodingManel = function()
{
    $('#assetLoader').show();
}

var HideLoadingPanel = function()
{
    $('#assetLoader').hide();
}
