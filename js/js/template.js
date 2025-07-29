var SetLanguage = function()
{
    var languageInfo = document.getElementById("leftLangImg");
    var titleInfo = document.getElementById("leftLegacyTitle");
    
    if(languageInfo != undefined)
    {
        var languageValue = languageInfo.innerHTML;
        
        if(languageValue == "EN")
        {
            languageValue == "FR";
            CUR_LANGUAGE = LANGUAGE_FR;
            languageInfo.innerHTML = "FR";
            languageInfo.title = "EN";
            
            if(titleInfo != undefined)
            {
                titleInfo.innerHTML = "HERITAGE";
            }
        }
        else
        {
            languageValue == "EN";
            CUR_LANGUAGE = LANGUAGE_EN;
            languageInfo.innerHTML = "EN";
            languageInfo.title = "FR";
            
            if(titleInfo != undefined)
            {
                titleInfo.innerHTML = "LEGACY";
            }
        }
    }
}