

// un chapitre se compose d'une liste de Frames - à chaque Frame est associée une duree (pour le mode autoplay)
// un Frame est défini pas: - une liste de Layer (chaque layer etant une div contenant une liste d'Asset la position du layer correspond a son z-index) - une liste de clés de transition TransitKey (id des différents état trnsitionnels d'affichage) - une structure descriptive de chaque transition TransitKeyData (AssetId, StaticCss, DynamicCss, Actions, Duréé/Offset...)
// Description d'un Layer: - LayerId - z-index*10 - une liste d'asset contenus  (chaque layer comprends 10 couches maxi. - constante d'application)


/*********************   Basis decription of needed objects model   **************************/

// StateData object example
/*var StateObj = {
    "AssetId": "IMG_ID",
    "StaticCss" : [{"CssProperty1":"value"},{"CssProperty2":"value"},{"CssProperty3":"value"}],
    "DynamicCss" : [{"CssProperty":"value"},{"CssProperty2":"value"},{"CssProperty3":"value"}]
}


// KeyData object model example - multidimensionnal indexed array - key is [KeyId][LayerId][AssetId] = StateObj
var KeyData = {
    
}

// Keys is an array with the Frame keys indexes
var KeysNb = 0;
var Keys = []


// LayerObj objet model example for a display layer
var LayerObj = {
    "LayerId" : "Layer_1",
    "LayerIndex" : 1,   // when interpreted for display LayerIndex will be multiplied per 10 to provide z-index value to use.
    "AssetsIdsList" : ["IMG_1", "IMG_2", "TXT_1", "TXT_2", "TXT_3"],
    "Comment" : "" // Comment for user to describe if specific role for the layer
}

// FrameObj is the object model representing a transitionnal Frame for display - Frame object can be 1 image to display or a set of display transition of elements
var FrameObj = {
    "Layers": [
        {
        "LayerId" : "Layer_0",
        "LayerIndex" : 0,
        "AssetsIdsList" : ["IMG_1", "IMG_2", "TXT_1"],
        "Comment" : "Backgroung Layer - May be empty"
        }
        ,{
        "LayerId" : "Layer_1",
        "LayerIndex" : 1,
        "AssetsIdsList" : ["IMG_2", "TXT_2"],
        "Comment" : "Pictures layer"
        }
        ,{
        "LayerId" : "Layer_2",
        "LayerIndex" : 2,
        "AssetsIdsList" : ["TXT_1", "TXT_2", "TXT_3"],
        "Comment" : "Text Layer"
        }
              ],
    "FrameKeys": [0],
    "FrameKeysData": {
        "1": {
                "Layer_0": {
                            "IMG_1" : {
                                        "AssetId": "IMG_1",
                                        "StaticCss" : [
                                                        {"width":"100%"}
                                                        ,{"height":"100%"}
                                                    ],
                                        "DynamicCss" : [
                                                    ]
                                    }
                },
                "Layer_1": {
                            "IMG_2" : {
                                        "AssetId": "IMG_2",
                                        "StaticCss" : [
                                                        {"width":"100%"}
                                                        ,{"height":"100%"}
                                                    ],
                                        "DynamicCss" : [
                                                    ]
                                    }
                
                },
                "Layer_2": {
                            "TXT_1" : {
                                        "AssetId": "TXT_1",
                                        "StaticCss" : [
                                                        {"width":"100%"}
                                                        ,{"height":"100%"}
                                                    ],
                                        "DynamicCss" : [
                                                    ]
                                    }
                }
        }
    }
}


var Chapter = {
    "chapter_0" : [
                    {
                        "Layers": [
                            {
                                "LayerId" : "Layer_1",
                                "LayerIndex" : 1,
                                "AssetsIdsList" : ["IMG_1", "IMG_2", "TXT_1"],
                                "Comment" : "Backgroung Layer - May be empty"
                            }
                            ,{
                                "LayerId" : "Layer_2",
                                "LayerIndex" : 2,
                                "AssetsIdsList" : ["IMG_2", "TXT_2"],
                                "Comment" : "Pictures layer"
                            }
                            ,{
                                "LayerId" : "Layer_3",
                                "LayerIndex" : 3,
                                "AssetsIdsList" : ["TXT_1", "TXT_2", "TXT_3"],
                                "Comment" : "Text Layer"
                            }
                        ],
                        
                        "FrameKeys": [1],
                        
                        "FrameKeysData": {
                            "1": {
                                    "Layer_1": {
                                                    "IMG_1" : {
                                                                "AssetId": "IMG_1",
                                                                "StaticCss" : [
                                                                                {"width":"100%"}
                                                                                ,{"height":"100%"}
                                                                ],
                                                                "DynamicCss" : [
                                                                ]
                                                    }
                                    },
                                    "Layer_2": {
                                                    "IMG_2" : {
                                                                "AssetId": "IMG_2",
                                                                "StaticCss" : [
                                                                                {"width":"100%"}
                                                                                ,{"height":"100%"}
                                                                ],
                                                                "DynamicCss" : [
                                                                            ]
                                                    }
                
                                    },
                                    "Layer_3": {
                                                    "TXT_1" : {
                                                                "AssetId": "TXT_1",
                                                                "StaticCss" : [
                                                                        {"width":"100%"}
                                                                        ,{"height":"100%"}
                                                                ],
                                                                "DynamicCss" : [
                                                                ]
                                                    }
                                    }
                            }
                        }
                }
    ]
}
*/

/****************************************************************************************************/
/*********************   End of basis decription of needed objects model   **************************/


/******************************     Mockup model for test        ************************************/
// CONSTANTES 
var IMG_ASSET = "img";
var TXT_ASSET = "text";
var BUL_TXT_ASSET = "bulleText";
var PLAY_AUDIO_ASSET = "playAudio";
var STOP_AUDIO_ASSET = "stopAudio";


var GBL_AUDIO_ON = false;

// ASSETS
// 1- Assets list
var Assets =
{
    "Assets":
    [   
        {
            "AssetId" : "IMG_COVER",
            "AssetType" : IMG_ASSET,
            "Path" : "/img/gallery/heritage/chapter_0/PrologueCover.jpg"
        },
        {
            "AssetId" : "IMG_1",
            "AssetType" : IMG_ASSET,
            "Path" : "/img/gallery/heritage/chapter_0/chap_0_1.jpg"
    },
    {
            "AssetId" : "IMG_2",
            "AssetType" : IMG_ASSET,
            "Path" : "/img/gallery/heritage/chapter_0/chap_0_2.jpg"
    }, 
    {
            "AssetId" : "IMG_3",
            "AssetType" : IMG_ASSET,
            "Path" : "/img/gallery/heritage/chapter_0/chap_0_3.jpg"
    },
    {
            "AssetId" : "IMG_4",
            "AssetType" : IMG_ASSET,
            "Path" : "/img/gallery/heritage/chapter_0/chap_0_4.jpg"
    },
    {
            "AssetId" : "IMG_5",
            "AssetType" : IMG_ASSET,
            "Path" : "/img/gallery/heritage/chapter_0/chap_0_5.jpg"
    },
     {
            "AssetId" : "IMG_6",
            "AssetType" : IMG_ASSET,
            "Path" : "/img/gallery/heritage/chapter_0/chap_0_6.jpg"
    },
     {
            "AssetId" : "IMG_7",
            "AssetType" : IMG_ASSET,
            "Path" : "/img/gallery/heritage/chapter_0/chap_0_7.jpg"
    },
     {
            "AssetId" : "IMG_8",
            "AssetType" : IMG_ASSET,
            "Path" : "/img/gallery/heritage/chapter_0/chap_0_8.jpg"
    },
     {
            "AssetId" : "IMG_9",
            "AssetType" : IMG_ASSET,
            "Path" : "/img/gallery/heritage/chapter_0/chap_0_9.jpg"
    },
     {
            "AssetId" : "IMG_10",
            "AssetType" : IMG_ASSET,
            "Path" : "/img/gallery/heritage/chapter_0/chap_0_10.jpg"
    },
     {
            "AssetId" : "IMG_11",
            "AssetType" : IMG_ASSET,
            "Path" : "/img/gallery/heritage/chapter_0/chap_0_11.jpg"
    },
     {
            "AssetId" : "IMG_12",
            "AssetType" : IMG_ASSET,
            "Path" : "/img/gallery/heritage/chapter_0/chap_0_12.jpg"
    },
     {
            "AssetId" : "IMG_13",
            "AssetType" : IMG_ASSET,
            "Path" : "/img/gallery/heritage/chapter_0/chap_0_13.jpg"
    },
     {
            "AssetId" : "IMG_14",
            "AssetType" : IMG_ASSET,
            "Path" : "/img/gallery/heritage/chapter_0/chap_0_14.jpg"
    },
     {
            "AssetId" : "IMG_15",
            "AssetType" : IMG_ASSET,
            "Path" : "/img/gallery/heritage/chapter_0/chap_0_15.jpg"
    },
     {
            "AssetId" : "IMG_16",
            "AssetType" : IMG_ASSET,
            "Path" : "/img/gallery/heritage/chapter_0/chap_0_16.jpg"
    },
     {
            "AssetId" : "IMG_17",
            "AssetType" : IMG_ASSET,
            "Path" : "/img/gallery/heritage/chapter_0/chap_0_17.jpg"
    },
     {
            "AssetId" : "IMG_18",
            "AssetType" : IMG_ASSET,
            "Path" : "/img/gallery/heritage/chapter_0/chap_0_18.jpg"
    },
     {
            "AssetId" : "IMG_19",
            "AssetType" : IMG_ASSET,
            "Path" : "/img/gallery/heritage/chapter_0/chap_0_19.jpg"
    },
     {
            "AssetId" : "IMG_20",
            "AssetType" : IMG_ASSET,
            "Path" : "/img/gallery/heritage/chapter_0/chap_0_20.jpg"
    },
     {
            "AssetId" : "IMG_21",
            "AssetType" : IMG_ASSET,
            "Path" : "/img/gallery/heritage/chapter_0/chap_0_21.jpg"
    },
     {
            "AssetId" : "IMG_22",
            "AssetType" : IMG_ASSET,
            "Path" : "/img/gallery/heritage/chapter_0/chap_0_22.jpg"
    },
     {
            "AssetId" : "IMG_23",
            "AssetType" : IMG_ASSET,
            "Path" : "/img/gallery/heritage/chapter_0/chap_0_23.jpg"
    },
     {
            "AssetId" : "IMG_24",
            "AssetType" : IMG_ASSET,
            "Path" : "/img/gallery/heritage/chapter_0/chap_0_24.jpg"
    },
     {
            "AssetId" : "IMG_25",
            "AssetType" : IMG_ASSET,
            "Path" : "/img/gallery/heritage/chapter_0/chap_0_25.jpg"
    },
     {
            "AssetId" : "IMG_26",
            "AssetType" : IMG_ASSET,
            "Path" : "/img/gallery/heritage/chapter_0/chap_0_26.jpg"
    },
     {
            "AssetId" : "IMG_27",
            "AssetType" : IMG_ASSET,
            "Path" : "/img/gallery/heritage/chapter_0/chap_0_27.jpg"
    },
     {
            "AssetId" : "IMG_28",
            "AssetType" : IMG_ASSET,
            "Path" : "/img/gallery/heritage/chapter_0/chap_0_28.jpg"
    },
     {
            "AssetId" : "IMG_29",
            "AssetType" : IMG_ASSET,
            "Path" : "/img/gallery/heritage/chapter_0/chap_0_29.jpg"
    },
     {
            "AssetId" : "IMG_30",
            "AssetType" : IMG_ASSET,
            "Path" : "/img/gallery/heritage/chapter_0/chap_0_30.jpg"
    },
     {
            "AssetId" : "IMG_31",
            "AssetType" : IMG_ASSET,
            "Path" : "/img/gallery/heritage/chapter_0/chap_0_31.jpg"
    },
     {
            "AssetId" : "IMG_32",
            "AssetType" : IMG_ASSET,
            "Path" : "/img/gallery/heritage/chapter_0/chap_0_32.jpg"
    },
     {
            "AssetId" : "IMG_33",
            "AssetType" : IMG_ASSET,
            "Path" : "/img/gallery/heritage/chapter_0/chap_0_33.jpg"
    },
     {
            "AssetId" : "IMG_34",
            "AssetType" : IMG_ASSET,
            "Path" : "/img/gallery/heritage/chapter_0/chap_0_34.jpg"
    },
     {
            "AssetId" : "IMG_35",
            "AssetType" : IMG_ASSET,
            "Path" : "/img/gallery/heritage/chapter_0/chap_0_35.jpg"
    },
     {
            "AssetId" : "IMG_36",
            "AssetType" : IMG_ASSET,
            "Path" : "/img/gallery/heritage/chapter_0/chap_0_36.jpg"
    },
     {
            "AssetId" : "IMG_37",
            "AssetType" : IMG_ASSET,
            "Path" : "/img/gallery/heritage/chapter_0/chap_0_37.jpg"
    },
     {
            "AssetId" : "IMG_38",
            "AssetType" : IMG_ASSET,
            "Path" : "/img/gallery/heritage/chapter_0/chap_0_38.jpg"
    },
     {
            "AssetId" : "IMG_39",
            "AssetType" : IMG_ASSET,
            "Path" : "/img/gallery/heritage/chapter_0/chap_0_39.jpg"
    },
     {
            "AssetId" : "IMG_40",
            "AssetType" : IMG_ASSET,
            "Path" : "/img/gallery/heritage/chapter_0/chap_0_40.jpg"
    },
     {
            "AssetId" : "IMG_41",
            "AssetType" : IMG_ASSET,
            "Path" : "/img/gallery/heritage/chapter_0/whatsNext.jpg"
    },
     {
            "AssetId" : "BUL_1",
            "AssetType" : IMG_ASSET,
            "Path" : "/img/gallery/heritage/templateAssets/bulle_carre_down_D.png"
    }
     ,
     {
            "AssetId" : "BUL_2",
            "AssetType" : IMG_ASSET,
            "Path" : "/img/gallery/heritage/templateAssets/bulle_carre_down_G.png"
    },
     {
            "AssetId" : "BUL_3",
            "AssetType" : IMG_ASSET,
            "Path" : "/img/gallery/heritage/templateAssets/bulle_carre_down_M.png"
    },
     {
            "AssetId" : "BUL_4",
            "AssetType" : IMG_ASSET,
            "Path" : "/img/gallery/heritage/templateAssets/bulle_carre_up_D.png"
    },
     {
            "AssetId" : "BUL_5",
            "AssetType" : IMG_ASSET,
            "Path" : "/img/gallery/heritage/templateAssets/bulle_carre_up_G.png"
    },
     {
            "AssetId" : "BUL_6",
            "AssetType" : IMG_ASSET,
            "Path" : "/img/gallery/heritage/templateAssets/bulle_carre_up_M.png"
    }
     ,
     {
            "AssetId" : "BUL_7",
            "AssetType" : IMG_ASSET,
            "Path" : "/img/gallery/heritage/templateAssets/bulle_carre_right_U.png"
    },
     {
            "AssetId" : "BUL_8",
            "AssetType" : IMG_ASSET,
            "Path" : "/img/gallery/heritage/templateAssets/bulle_carre_right_M.png"
    },
     {
            "AssetId" : "BUL_9",
            "AssetType" : IMG_ASSET,
            "Path" : "/img/gallery/heritage/templateAssets/bulle_carre_right_B.png"
    },
     {
            "AssetId" : "BUL_10",
            "AssetType" : IMG_ASSET,
            "Path" : "/img/gallery/heritage/templateAssets/bulle_carre_left_U.png"
    },
     {
            "AssetId" : "BUL_11",
            "AssetType" : IMG_ASSET,
            "Path" : "/img/gallery/heritage/templateAssets/bulle_carre_left_M.png"
    },
     {
            "AssetId" : "BUL_12",
            "AssetType" : IMG_ASSET,
            "Path" : "/img/gallery/heritage/templateAssets/bulle_carre_left_B.png"
    },
     {
            "AssetId" : "BUL_13",
            "AssetType" : IMG_ASSET,
            "Path" : "/img/gallery/heritage/templateAssets/bulle_down_D.png"
    }
     ,
     {
            "AssetId" : "BUL_14",
            "AssetType" : IMG_ASSET,
            "Path" : "/img/gallery/heritage/templateAssets/bulle_down_G.png"
    },
     {
            "AssetId" : "BUL_15",
            "AssetType" : IMG_ASSET,
            "Path" : "/img/gallery/heritage/templateAssets/bulle_down_M.png"
    },
     {
            "AssetId" : "BUL_16",
            "AssetType" : IMG_ASSET,
            "Path" : "/img/gallery/heritage/templateAssets/bulle_up_D.png"
    },
     {
            "AssetId" : "BUL_17",
            "AssetType" : IMG_ASSET,
            "Path" : "/img/gallery/heritage/templateAssets/bulle_up_G.png"
    },
     {
            "AssetId" : "BUL_18",
            "AssetType" : IMG_ASSET,
            "Path" : "/img/gallery/heritage/templateAssets/bulle_up_M.png"
    }
     ,
     {
            "AssetId" : "BUL_19",
            "AssetType" : IMG_ASSET,
            "Path" : "/img/gallery/heritage/templateAssets/bulle_right_U.png"
    },
     {
            "AssetId" : "BUL_20",
            "AssetType" : IMG_ASSET,
            "Path" : "/img/gallery/heritage/templateAssets/bulle_right_M.png"
    },
     {
            "AssetId" : "BUL_21",
            "AssetType" : IMG_ASSET,
            "Path" : "/img/gallery/heritage/templateAssets/bulle_right_B.png"
    },
     {
            "AssetId" : "BUL_22",
            "AssetType" : IMG_ASSET,
            "Path" : "/img/gallery/heritage/templateAssets/bulle_left_U.png"
    },
     {
            "AssetId" : "BUL_23",
            "AssetType" : IMG_ASSET,
            "Path" : "/img/gallery/heritage/templateAssets/bulle_left_M.png"
    },
     {
            "AssetId" : "BUL_24",
            "AssetType" : IMG_ASSET,
            "Path" : "/img/gallery/heritage/templateAssets/bulle_left_B.png"
    },
     {
            "AssetId" : "BUL_TXT_0",
            "AssetType" : BUL_TXT_ASSET,
            "Path" : "",
            "TextFR" : "Alors que certains s'interrogent sur le monde que nous allons laisser à nos enfants...<br><br> ... d'autres s'interrogent sur les enfants que nous laisserons à notre monde...",
            "TextEN": "While some are wondering about the world we'll leave to our children... <br><br> ... Some others are wondering about the children we'll leave to this world ..."
    }
     ,
     {
            "AssetId" : "BUL_TXT_25",
            "AssetType" : BUL_TXT_ASSET,
            "Path" : "",
            "TextFR" : "T'as entendu parlé de la nouvelle loi qu'ils préparent?",
            "TextEN": "Yo did you hear about the new law in preparation?"
    },
     {
            "AssetId" : "BUL_TXT_26",
            "AssetType" : BUL_TXT_ASSET,
            "Path" : "",
            "TextFR" : "Nop, c'est quoi?",
            "TextEN": "No, I didn't heard about it..."
    },
     {
            "AssetId" : "BUL_TXT_27",
            "AssetType" : BUL_TXT_ASSET,
            "Path" : "",
            "TextFR" : "Ils prévoient de compléter la loi sur l'interdiction de l'écriture manuscrite,<br> pour encadrer les réunions publiques...",
            "TextEN": "It's about completing the manuscrite writing interdiction.<br> They are talking about recording any public meeting..."
    },
     {
            "AssetId" : "BUL_TXT_28",
            "AssetType" : BUL_TXT_ASSET,
            "Path" : "",
            "TextFR" : "Non! Sérieux??!!!",
            "TextEN": "Seriously??!!!"
    },
     {
            "AssetId" : "BUL_TXT_29",
            "AssetType" : BUL_TXT_ASSET,
            "Path" : "",
            "TextFR" : "Oui, ils veulent que toutes les réunions publiques soit enregistrées pour les rendre disponibles à tous...",
            "TextEN": "Yeah, they want to record all public meeting and make them available for everybody..."
    },
     {
            "AssetId" : "BUL_TXT_30",
            "AssetType" : BUL_TXT_ASSET,
            "Path" : "",
            "TextFR" : "Comment ça?",
            "TextEN": "How's that?"
    },
     {
            "AssetId" : "BUL_TXT_31",
            "AssetType" : BUL_TXT_ASSET,
            "Path" : "",
            "TextFR" : "Ben je sais pas trop. Le gouverneur doit faire une annonce demain à la télé...<br> Bon, sinon t'as bientôt fini Samô? ",
            "TextEN": "I don't really know. The governor must do a press conference tomorrow on TV...<br>... So... then haven't you finished yet?"
    },
     {
            "AssetId" : "BUL_TXT_32",
            "AssetType" : BUL_TXT_ASSET,
            "Path" : "",
            "TextFR" : "Ouep, bientôt terminé mec! Ensuite on s'arrache...",
            "TextEN": "Yep, almost done man! Then we'll leave..."
    },
     {
            "AssetId" : "BUL_TXT_33",
            "AssetType" : BUL_TXT_ASSET,
            "Path" : "",
            "TextFR" : "OK, car tu risques gros à faire ça... <br>...surtout depuis que l'écriture à la main a été interdite.",
            "TextEN": "OK, cauz'doing what you do is risky dude... <br><br> ...Further more since <br>handwritting <br>has been prohibited..."
    }
     ,
     {
            "AssetId" : "BUL_TXT_34",
            "AssetType" : BUL_TXT_ASSET,
            "Path" : "",
            "TextFR" : "Ca c'est sûr... <br>Mais de toute façon ils mettent jamais les pieds ici, au quartier Barbare...",
            "TextEN": "Sure I know... Anyway... <br>They never come here at 'Barbarians' district... "
    },
     {
            "AssetId" : "BUL_TXT_35",
            "AssetType" : BUL_TXT_ASSET,
            "Path" : "",
            "TextFR" : "... et c'est ce qui rend les choses interessantes!",
            "TextEN": "... and that's what makes things interesting bro'!"
    },
     {
            "AssetId" : "BUL_TXT_36",
            "AssetType" : BUL_TXT_ASSET,
            "Path" : "",
            "TextFR" : "SHOOOOOOOOOTTTTT!!!!!!!!",
            "TextEN": "SHOOOOOOOOOTTTTT!!!!!!!!"
    }
     ,
     {
            "AssetId" : "BUL_TXT_37",
            "AssetType" : BUL_TXT_ASSET,
            "Path" : "",
            "TextFR" : "SAMO?!!!!!!!!",
            "TextEN": "SAMO?!!!!!!!"
    }
     ,
     {
            "AssetId" : "BUL_TXT_38",
            "AssetType" : BUL_TXT_ASSET,
            "Path" : "",
            "TextFR" : "BLAST",
            "TextEN": "BLAST"
    },
     {
            "AssetId" : "BUL_TXT_39",
            "AssetType" : BUL_TXT_ASSET,
            "Path" : "",
            "TextFR" : "GGRRhhhrrrrrr....",
            "TextEN": "GGRRhhhrrrrrr...."
    }
     ,
     {
            "AssetId" : "BUL_TXT_40",
            "AssetType" : BUL_TXT_ASSET,
            "Path" : "",
            "TextFR" : "Choppez-le! Il ne faut pas qu'il nous échappe.",
            "TextEN": "Go get him! He mustn't run away."
    }
     ,
     {
            "AssetId" : "BUL_TXT_41",
            "AssetType" : BUL_TXT_ASSET,
            "Path" : "",
            "TextFR" : "Feu!!!",
            "TextEN": "Shoot him!!!"
    }
        ,
        {
            "AssetId" : "AUDIO_GUN_SHOT",
            "AssetType" : PLAY_AUDIO_ASSET,
            "Path" : "/audio/effects/shotgun1.mp3",
        }
        ,
        {
            "AssetId" : "AUDIO_DRAMA_1",
            "AssetType" : PLAY_AUDIO_ASSET,
            "Path" : "/audio/effects/drama1.mp3",
        }
        ,
        {
            "AssetId" : "AUDIO_DRAMA_2",
            "AssetType" : PLAY_AUDIO_ASSET,
            "Path" : "/audio/effects/drama2.mp3",
        }
        ,
        {
            "AssetId" : "AUDIO_DRAMA_3",
            "AssetType" : PLAY_AUDIO_ASSET,
            "Path" : "/audio/effects/drama3.mp3",
        }
        ,
        {
            "AssetId" : "AUDIO_DRAMA_4",
            "AssetType" : PLAY_AUDIO_ASSET,
            "Path" : "/audio/effects/drama4.mp3",
        }
        /*,
        {
            "AssetId" : "AUDIO_MUSIC",
            "AssetType" : PLAY_AUDIO_ASSET,
            "Path" : "/audio/effects/music.mp3",
        }*/ // trop lourd
    ]
}


// MODEL
var Model = 
{
    "chapter_0" : [
        
                        // Cover Frame object
                        {
                            "Layers": [
                                {
                                    "LayerId" : "Layer_Main_0",
                                    "LayerIndex" : 0,
                                    "AssetsIdsList" : ["IMG_COVER"],
                                    "Comment" : "Pictures Layer"
                                }
                            ],

                            "FrameKeys": [0],

                            "FrameKeysData": {
                                "0": {
                                        "Layer_Main_0": {
                                                        "IMG_COVER" : {
                                                                    "AssetId": "IMG_COVER",
                                                                    "StaticCss" : [
                                                                                    {"cssProperty":"width", "cssValue":"100%"},
                                                                                    {"cssProperty":"height", "cssValue":"100%"},
                                                                                    {"cssProperty":"visibility", "cssValue":"visible"}
                                                                    ]
                                                        }
                                        }
                                }
                            }
                    }
        
                    ,// Ost Frame object
                    {
                        "Layers": [
                            /*{
                                "LayerId" : "Layer_Main_0",
                                "LayerIndex" : 0,
                                "AssetsIdsList" : [],
                                "Comment" : "Pictures Layer"
                            }
                            ,*/{
                                "LayerId" : "Layer_1",
                                "LayerIndex" : 1,
                                "AssetsIdsList" : ["BUL_TXT_0"],
                                "Comment" : "Bubbles layer",
                                "CustomLayerCssClass": "BUBBLE_ROOT_CSS"
                            }
                        ],
                        
                        "FrameKeys": [0],
                        
                        "FrameKeysData": {
                            "0": {
                                    "Layer_1": {
                                                    "BUL_TXT_0" : {
                                                                "AssetId": "BUL_TXT_0",
                                                                "CssClass" : "BUBBLE_CENTER",
                                                                "StaticCss" : [
                                                                                {"cssProperty":"color", "cssValue":"white"},
                                                                                {"cssProperty":"background-color", "cssValue":"black"}/*,
                                                                                {"cssProperty":"visibility", "cssValue":"visible"}*/
                                                                ]
                                                    }
                                    }
                            }
                        }
                }
                ,
                    // 1st Frame object
                    {
                        "Layers": [
                            {
                                "LayerId" : "Layer_Main_0",
                                "LayerIndex" : 0,
                                "AssetsIdsList" : ["IMG_1"],
                                "Comment" : "Pictures Layer"
                            }
                        ],
                        
                        "FrameKeys": [0],
                        
                        "FrameKeysData": {
                            "0": {
                                    "Layer_Main_0": {
                                                    "IMG_1" : {
                                                                "AssetId": "IMG_1",
                                                                "StaticCss" : [
                                                                                {"cssProperty":"width", "cssValue":"100%"},
                                                                                {"cssProperty":"height", "cssValue":"100%"},
                                                                                {"cssProperty":"visibility", "cssValue":"visible"}
                                                                ]
                                                    }
                                    }
                            }
                        }
                }
                // 2nd Frame object
                , {
                        "Layers": [
                            {
                                "LayerId" : "Layer_Main_0",
                                "LayerIndex" : 0,
                                "AssetsIdsList" : ["IMG_2"],
                                "Comment" : "Pictures Layer"
                            }
                        ],
                        
                        "FrameKeys": [0],
                        
                        "FrameKeysData": {
                            "0": {
                                    "Layer_Main_0": {
                                                    "IMG_2" : {
                                                                "AssetId": "IMG_2",
                                                                "StaticCss" : [
                                                                                {"cssProperty":"width", "cssValue":"100%"},
                                                                                {"cssProperty":"height", "cssValue":"100%"},
                                                                                {"cssProperty":"visibility", "cssValue":"visible"}
                                                                ]
                                                    }
                                    }
                            }
                        }
                }
                // 3rd Frame object
                , {
                        "Layers": [
                            {
                                "LayerId" : "Layer_Main_0",
                                "LayerIndex" : 0,
                                "AssetsIdsList" : ["IMG_3"],
                                "Comment" : "Pictures Layer"
                            }
                            ,{
                                "LayerId" : "Layer_1",
                                "LayerIndex" : 1,
                                "AssetsIdsList" : ["BUL_TXT_25","BUL_TXT_26"],
                                "Comment" : "Bubbles layer",
                                "CustomLayerCssClass": "BUBBLE_ROOT_CSS"
                            }
                        ],
                        
                        "FrameKeys": [0,1,2],
                        
                        "FrameKeysData": {
                            "0": {
                                    "Layer_Main_0": {
                                                    "IMG_3" : {
                                                                "AssetId": "IMG_3",
                                                                "StaticCss" : [
                                                                                {"cssProperty":"width", "cssValue":"100%"},
                                                                                {"cssProperty":"height", "cssValue":"100%"},
                                                                                {"cssProperty":"visibility", "cssValue":"visible"}
                                                                ]
                                                    }
                                    }
                            }
                            ,"1": {
                                    "Layer_1": {
                                                    "BUL_TXT_25" : {
                                                                "AssetId": "BUL_TXT_25",
                                                                "CssClass" : "BUBBLE_UP"/*,
                                                                "StaticCss" : [
                                                                                {"cssProperty":"width", "cssValue":"100%"},
                                                                                {"cssProperty":"height", "cssValue":"100%"},
                                                                                {"cssProperty":"visibility", "cssValue":"visible"}
                                                                ]*/
                                                    }
                                    }
                                    
                            }
                            ,"2": {
                                    "Layer_1": {
                                                    "BUL_TXT_26" : {
                                                                "AssetId": "BUL_TXT_26",
                                                                "CssClass" : "BUBBLE_DOWN"/*,
                                                                "StaticCss" : [
                                                                                {"width":"100%"}
                                                                                ,{"height":"100%"}
                                                                                ,{visibility:"visible"}
                                                                ]*/
                                                    }
                                    }
                            }
                        }
                }
                // 4th Frame object
                , {
                        "Layers": [
                            {
                                "LayerId" : "Layer_Main_0",
                                "LayerIndex" : 0,
                                "AssetsIdsList" : ["IMG_4"],
                                "Comment" : "Pictures Layer"
                            }
                            ,{
                                "LayerId" : "Layer_1",
                                "LayerIndex" : 1,
                                "AssetsIdsList" : ["BUL_TXT_26","BUL_TXT_27"],
                                "Comment" : "Bubbles layer",
                                "CustomLayerCssClass": "BUBBLE_ROOT_CSS"
                            }
                        ],
                        
                        "FrameKeys": [0,1],
                        
                        "FrameKeysData": {
                            "0": {
                                    "Layer_Main_0": {
                                                    "IMG_4" : {
                                                                "AssetId": "IMG_4",
                                                                "StaticCss" : [
                                                                                {"cssProperty":"width", "cssValue":"100%"},
                                                                                {"cssProperty":"height", "cssValue":"100%"},
                                                                                {"cssProperty":"visibility", "cssValue":"visible"}
                                                                ]
                                                    }
                                    }
                            }
                        , "1": {
                                    "Layer_1": {
                                                    "BUL_TXT_27" : {
                                                                "AssetId": "BUL_TXT_27",
                                                                "CssClass" : "BUBBLE_UP"/*,
                                                                "StaticCss" : [
                                                                                {"cssProperty":"width", "cssValue":"100%"},
                                                                                {"cssProperty":"height", "cssValue":"100%"},
                                                                                {"cssProperty":"visibility", "cssValue":"visible"}
                                                                ]*/
                                                    }
                                    }
                        }
                    }
                }
                // 5th Frame object
                , {
                        "Layers": [
                            {
                                "LayerId" : "Layer_Main_0",
                                "LayerIndex" : 0,
                                "AssetsIdsList" : ["IMG_5"],
                                "Comment" : "Pictures Layer"
                            }
                            ,{
                                "LayerId" : "Layer_1",
                                "LayerIndex" : 1,
                                "AssetsIdsList" : ["BUL_TXT_28"],
                                "Comment" : "Bubbles layer",
                                "CustomLayerCssClass": "BUBBLE_ROOT_CSS"
                            }
                        ],
                        
                        "FrameKeys": [0,1],
                        
                        "FrameKeysData": {
                            "0": {
                                    "Layer_Main_0": {
                                                    "IMG_5" : {
                                                                "AssetId": "IMG_5",
                                                                "StaticCss" : [
                                                                                {"cssProperty":"width", "cssValue":"100%"},
                                                                                {"cssProperty":"height", "cssValue":"100%"},
                                                                                {"cssProperty":"visibility", "cssValue":"visible"}
                                                                ]
                                                    }
                                    }
                            }
                            , "1": {
                                    "Layer_1": {
                                                    "BUL_TXT_28" : {
                                                                "AssetId": "BUL_TXT_28",
                                                                "CssClass" : "BUBBLE_RIGHT"/*,
                                                                "StaticCss" : [
                                                                                {"cssProperty":"width", "cssValue":"100%"},
                                                                                {"cssProperty":"height", "cssValue":"100%"},
                                                                                {"cssProperty":"visibility", "cssValue":"visible"}
                                                                ]*/
                                                    }
                                    }
                            }
                        }
                }
                // 6th Frame object
                , {
                        "Layers": [
                            {
                                "LayerId" : "Layer_Main_0",
                                "LayerIndex" : 0,
                                "AssetsIdsList" : ["IMG_6"],
                                "Comment" : "Pictures Layer"
                            }
                            ,{
                                "LayerId" : "Layer_1",
                                "LayerIndex" : 1,
                                "AssetsIdsList" : ["BUL_TXT_29"],
                                "Comment" : "Bubbles layer",
                                "CustomLayerCssClass": "BUBBLE_ROOT_CSS"
                            }
                        ],
                        
                        "FrameKeys": [0,1],
                        
                        "FrameKeysData": {
                            "0": {
                                    "Layer_Main_0": {
                                                    "IMG_6" : {
                                                                "AssetId": "IMG_6",
                                                                "StaticCss" : [
                                                                                {"cssProperty":"width", "cssValue":"100%"},
                                                                                {"cssProperty":"height", "cssValue":"100%"},
                                                                                {"cssProperty":"visibility", "cssValue":"visible"}
                                                                ]
                                                    }
                                    }
                            }
                            , "1": {
                                    "Layer_1": {
                                                    "BUL_TXT_29" : {
                                                                "AssetId": "BUL_TXT_29",
                                                                "CssClass" : "BUBBLE_UP"/*,
                                                                "StaticCss" : [
                                                                                {"cssProperty":"width", "cssValue":"100%"},
                                                                                {"cssProperty":"height", "cssValue":"100%"},
                                                                                {"cssProperty":"visibility", "cssValue":"visible"}
                                                                ]*/
                                                    }
                                    }
                            }
                        }
                }
                // 7th Frame object
                , {
                        "Layers": [
                            {
                                "LayerId" : "Layer_Main_0",
                                "LayerIndex" : 0,
                                "AssetsIdsList" : ["IMG_7"],
                                "Comment" : "Pictures Layer"
                            }
                            ,{
                                "LayerId" : "Layer_1",
                                "LayerIndex" : 1,
                                "AssetsIdsList" : ["BUL_TXT_30"],
                                "Comment" : "Bubbles layer",
                                "CustomLayerCssClass": "BUBBLE_ROOT_CSS"
                            }
                        ],
                        
                        "FrameKeys": [0,1],
                        
                        "FrameKeysData": {
                            "0": {
                                    "Layer_Main_0": {
                                                    "IMG_7" : {
                                                                "AssetId": "IMG_7",
                                                                "StaticCss" : [
                                                                                {"cssProperty":"width", "cssValue":"100%"},
                                                                                {"cssProperty":"height", "cssValue":"100%"},
                                                                                {"cssProperty":"visibility", "cssValue":"visible"}
                                                                ]
                                                    }
                                    }
                            }
                            , "1": {
                                    "Layer_1": {
                                                    "BUL_TXT_30" : {
                                                                "AssetId": "BUL_TXT_30",
                                                                "CssClass" : "BUBBLE_DOWN"/*,
                                                                "StaticCss" : [
                                                                                {"cssProperty":"width", "cssValue":"100%"},
                                                                                {"cssProperty":"height", "cssValue":"100%"},
                                                                                {"cssProperty":"visibility", "cssValue":"visible"}
                                                                ]*/
                                                    }
                                    }
                            }
                        }
                }
                // 8th Frame object
                , {
                        "Layers": [
                            {
                                "LayerId" : "Layer_Main_0",
                                "LayerIndex" : 0,
                                "AssetsIdsList" : ["IMG_8"],
                                "Comment" : "Pictures Layer"
                            }
                            ,{
                                "LayerId" : "Layer_1",
                                "LayerIndex" : 1,
                                "AssetsIdsList" : ["BUL_TXT_31"],
                                "Comment" : "Bubbles layer",
                                "CustomLayerCssClass": "BUBBLE_ROOT_CSS"
                            }
                        ],
                        
                        "FrameKeys": [0,1],
                        
                        "FrameKeysData": {
                            "0": {
                                    "Layer_Main_0": {
                                                    "IMG_8" : {
                                                                "AssetId": "IMG_8",
                                                                "StaticCss" : [
                                                                                {"cssProperty":"width", "cssValue":"100%"},
                                                                                {"cssProperty":"height", "cssValue":"100%"},
                                                                                {"cssProperty":"visibility", "cssValue":"visible"}
                                                                ]
                                                    }
                                    }
                            }
                            , "1": {
                                    "Layer_1": {
                                                    "BUL_TXT_31" : {
                                                                "AssetId": "BUL_TXT_31",
                                                                "CssClass" : "BUBBLE_DOWN"/*,
                                                                "StaticCss" : [
                                                                                {"cssProperty":"width", "cssValue":"100%"},
                                                                                {"cssProperty":"height", "cssValue":"100%"},
                                                                                {"cssProperty":"visibility", "cssValue":"visible"}
                                                                ]*/
                                                    }
                                    }
                            }
                        }
                }
                // 9th Frame object
                , {
                        "Layers": [
                            {
                                "LayerId" : "Layer_Main_0",
                                "LayerIndex" : 0,
                                "AssetsIdsList" : ["IMG_9"],
                                "Comment" : "Pictures Layer"
                            }
                            ,{
                                "LayerId" : "Layer_1",
                                "LayerIndex" : 1,
                                "AssetsIdsList" : ["BUL_TXT_32"],
                                "Comment" : "Bubbles layer",
                                "CustomLayerCssClass": "BUBBLE_ROOT_CSS"
                            }
                        ],
                        
                        "FrameKeys": [0],
                        
                        "FrameKeysData": {
                            "0": {
                                    "Layer_Main_0": {
                                                    "IMG_9" : {
                                                                "AssetId": "IMG_9",
                                                                "StaticCss" : [
                                                                                {"cssProperty":"width", "cssValue":"100%"},
                                                                                {"cssProperty":"height", "cssValue":"100%"},
                                                                                {"cssProperty":"visibility", "cssValue":"visible"}
                                                                ]
                                                    }
                                    }
                                    ,"Layer_1": {
                                                    "BUL_TXT_32" : {
                                                                "AssetId": "BUL_TXT_32",
                                                                "CssClass" : "BUBBLE_DOWN"/*,
                                                                "StaticCss" : [
                                                                                {"cssProperty":"width", "cssValue":"100%"},
                                                                                {"cssProperty":"height", "cssValue":"100%"},
                                                                                {"cssProperty":"visibility", "cssValue":"visible"}
                                                                ]*/
                                                    }
                                    }
                            }
                        }
                }
                // 10th Frame object
                , {
                        "Layers": [
                            {
                                "LayerId" : "Layer_Main_0",
                                "LayerIndex" : 0,
                                "AssetsIdsList" : ["IMG_10"],
                                "Comment" : "Pictures Layer"
                            }
                            ,{
                                "LayerId" : "Layer_1",
                                "LayerIndex" : 1,
                                "AssetsIdsList" : ["BUL_TXT_33"],
                                "Comment" : "Bubbles layer",
                                "CustomLayerCssClass": "BUBBLE_ROOT_CSS"
                            }
                        ],
                        
                        "FrameKeys": [0],
                        
                        "FrameKeysData": {
                            "0": {
                                    "Layer_Main_0": {
                                                    "IMG_10" : {
                                                                "AssetId": "IMG_10",
                                                                "StaticCss" : [
                                                                                {"cssProperty":"width", "cssValue":"100%"},
                                                                                {"cssProperty":"height", "cssValue":"100%"},
                                                                                {"cssProperty":"visibility", "cssValue":"visible"}
                                                                ]
                                                    }
                                    }
                                    ,"Layer_1": {
                                                    "BUL_TXT_33" : {
                                                                "AssetId": "BUL_TXT_33",
                                                                "CssClass" : "BUBBLE_LEFT"/*,
                                                                "StaticCss" : [
                                                                                {"cssProperty":"width", "cssValue":"100%"},
                                                                                {"cssProperty":"height", "cssValue":"100%"},
                                                                                {"cssProperty":"visibility", "cssValue":"visible"}
                                                                ]*/
                                                    }
                                    }
                            }
                        }
                }
                // 11th Frame object
                , {
                        "Layers": [
                            {
                                "LayerId" : "Layer_Main_0",
                                "LayerIndex" : 0,
                                "AssetsIdsList" : ["IMG_11"],
                                "Comment" : "Pictures Layer"
                            }
                            ,{
                                "LayerId" : "Layer_1",
                                "LayerIndex" : 1,
                                "AssetsIdsList" : ["BUL_TXT_34"],
                                "Comment" : "Bubbles layer",
                                "CustomLayerCssClass": "BUBBLE_ROOT_CSS"
                            }
                        ],
                        
                        "FrameKeys": [0,1],
                        
                        "FrameKeysData": {
                            "0": {
                                    "Layer_Main_0": {
                                                    "IMG_11" : {
                                                                "AssetId": "IMG_11",
                                                                "StaticCss" : [
                                                                                {"cssProperty":"width", "cssValue":"100%"},
                                                                                {"cssProperty":"height", "cssValue":"100%"},
                                                                                {"cssProperty":"visibility", "cssValue":"visible"}
                                                                ]
                                                    }
                                    }
                            }
                            , "1":{
                                    "Layer_1": {
                                                            "BUL_TXT_34" : {
                                                                        "AssetId": "BUL_TXT_34",
                                                                        "CssClass" : "BUBBLE_DOWN"/*,
                                                                        "StaticCss" : [
                                                                                        {"cssProperty":"width", "cssValue":"100%"},
                                                                                        {"cssProperty":"height", "cssValue":"100%"},
                                                                                        {"cssProperty":"visibility", "cssValue":"visible"}
                                                                        ]*/
                                                            }
                                            }
                            
                            }
                        }
                }
                // 12th Frame object
                , {
                        "Layers": [
                            {
                                "LayerId" : "Layer_Main_0",
                                "LayerIndex" : 0,
                                "AssetsIdsList" : ["IMG_12"],
                                "Comment" : "Pictures Layer"
                            }
                            ,{
                                "LayerId" : "Layer_1",
                                "LayerIndex" : 1,
                                "AssetsIdsList" : ["BUL_TXT_35"],
                                "Comment" : "Bubbles layer",
                                "CustomLayerCssClass": "BUBBLE_ROOT_CSS"
                            }
                        ],
                        
                        "FrameKeys": [0,1],
                        
                        "FrameKeysData": {
                            "0": {
                                    "Layer_Main_0": {
                                                    "IMG_12" : {
                                                                "AssetId": "IMG_12",
                                                                "StaticCss" : [
                                                                                {"cssProperty":"width", "cssValue":"100%"},
                                                                                {"cssProperty":"height", "cssValue":"100%"},
                                                                                {"cssProperty":"visibility", "cssValue":"visible"}
                                                                ]
                                                    }
                                    }
                            }
                            , "1":{
                                    "Layer_1": {
                                                            "BUL_TXT_35" : {
                                                                        "AssetId": "BUL_TXT_35",
                                                                        "CssClass" : "BUBBLE_DOWN"/*,
                                                                        "StaticCss" : [
                                                                                        {"cssProperty":"width", "cssValue":"100%"},
                                                                                        {"cssProperty":"height", "cssValue":"100%"},
                                                                                        {"cssProperty":"visibility", "cssValue":"visible"}
                                                                        ]*/
                                                            }
                                            }
                            
                            }
                        }
                }
                // 13th Frame object
                /*, {
                        "Layers": [
                            {
                                "LayerId" : "Layer_Main_0",
                                "LayerIndex" : 0,
                                "AssetsIdsList" : ["IMG_13"],
                                "Comment" : "Pictures Layer"
                            }
                        ],
                        
                        "FrameKeys": [0],
                        
                        "FrameKeysData": {
                            "0": {
                                    "Layer_Main_0": {
                                                    "IMG_13" : {
                                                                "AssetId": "IMG_13",
                                                                "StaticCss" : [
                                                                                {"cssProperty":"width", "cssValue":"100%"},
                                                                                {"cssProperty":"height", "cssValue":"100%"},
                                                                                {"cssProperty":"visibility", "cssValue":"visible"}
                                                                ]
                                                    }
                                    }
                            }
                        }
                }*/
                // 14th Frame object
                /*, {
                        "Layers": [
                            {
                                "LayerId" : "Layer_Main_0",
                                "LayerIndex" : 0,
                                "AssetsIdsList" : ["IMG_14"],
                                "Comment" : "Pictures Layer"
                            }
                        ],
                        
                        "FrameKeys": [0],
                        
                        "FrameKeysData": {
                            "0": {
                                    "Layer_Main_0": {
                                                    "IMG_14" : {
                                                                "AssetId": "IMG_14",
                                                                "StaticCss" : [
                                                                                {"cssProperty":"width", "cssValue":"100%"},
                                                                                {"cssProperty":"height", "cssValue":"100%"},
                                                                                {"cssProperty":"visibility", "cssValue":"visible"}
                                                                ]
                                                    }
                                    }
                            }
                        }
                }*/
                // 15th Frame object
                /*, {
                        "Layers": [
                            {
                                "LayerId" : "Layer_Main_0",
                                "LayerIndex" : 0,
                                "AssetsIdsList" : ["IMG_15"],
                                "Comment" : "Pictures Layer"
                            }
                        ],
                        
                        "FrameKeys": [0],
                        
                        "FrameKeysData": {
                            "0": {
                                    "Layer_Main_0": {
                                                    "IMG_15" : {
                                                                "AssetId": "IMG_15",
                                                                "StaticCss" : [
                                                                                {"cssProperty":"width", "cssValue":"100%"},
                                                                                {"cssProperty":"height", "cssValue":"100%"},
                                                                                {"cssProperty":"visibility", "cssValue":"visible"}
                                                                ]
                                                    }
                                    }
                            }
                        }
                }*/
                // 16th Frame object
                , {
                        "Layers": [
                            {
                                "LayerId" : "Layer_Main_0",
                                "LayerIndex" : 0,
                                "AssetsIdsList" : ["IMG_16","AUDIO_GUN_SHOT"],
                                "Comment" : "Pictures Layer"
                            }
                        ],
                        
                        "FrameKeys": [0],
                        
                        "FrameKeysData": {
                            "0": {
                                    "Layer_Main_0": {
                                                    "IMG_16" : {
                                                                "AssetId": "IMG_16",
                                                                "StaticCss" : [
                                                                                {"cssProperty":"width", "cssValue":"100%"},
                                                                                {"cssProperty":"height", "cssValue":"100%"},
                                                                                {"cssProperty":"visibility", "cssValue":"visible"}
                                                                ]
                                                    }
                                                    , "AUDIO_GUN_SHOT" : {
                                                                "AssetId" : "AUDIO_GUN_SHOT"
                                                            }
                                    }
                            }
                        }
                }
                // 17th Frame object
                , {
                        "Layers": [
                            {
                                "LayerId" : "Layer_Main_0",
                                "LayerIndex" : 0,
                                "AssetsIdsList" : ["IMG_17","AUDIO_DRAMA_1"],
                                "Comment" : "Pictures Layer"
                            }
                        ],
                        
                        "FrameKeys": [0],
                        
                        "FrameKeysData": {
                            "0": {
                                    "Layer_Main_0": {
                                                    "IMG_17" : {
                                                                "AssetId": "IMG_17",
                                                                "StaticCss" : [
                                                                                {"cssProperty":"width", "cssValue":"100%"},
                                                                                {"cssProperty":"height", "cssValue":"100%"},
                                                                                {"cssProperty":"visibility", "cssValue":"visible"}
                                                                ]
                                                    }
                                                    , "AUDIO_DRAMA_1" : {
                                                                "AssetId" : "AUDIO_DRAMA_1"
                                                            }
                                    }
                            }
                        }
                }
                // 18th Frame object
                , {
                        "Layers": [
                            {
                                "LayerId" : "Layer_Main_0",
                                "LayerIndex" : 0,
                                "AssetsIdsList" : ["IMG_18","AUDIO_DRAMA_2"],
                                "Comment" : "Pictures Layer"
                            }
                        ],
                        
                        "FrameKeys": [0],
                        
                        "FrameKeysData": {
                            "0": {
                                    "Layer_Main_0": {
                                                    "IMG_18" : {
                                                                "AssetId": "IMG_18",
                                                                "StaticCss" : [
                                                                                {"cssProperty":"width", "cssValue":"100%"},
                                                                                {"cssProperty":"height", "cssValue":"100%"},
                                                                                {"cssProperty":"visibility", "cssValue":"visible"}
                                                                ]
                                                    }
                                                    , "AUDIO_DRAMA_2" : {
                                                                "AssetId" : "AUDIO_DRAMA_2"
                                                    }
                                    }
                            }
                        }
                }
                // 19th Frame object
                , {
                        "Layers": [
                            {
                                "LayerId" : "Layer_Main_0",
                                "LayerIndex" : 0,
                                "AssetsIdsList" : ["IMG_19","AUDIO_DRAMA_3"],
                                "Comment" : "Pictures Layer"
                            }
                        ],
                        
                        "FrameKeys": [0],
                        
                        "FrameKeysData": {
                            "0": {
                                    "Layer_Main_0": {
                                                    "IMG_19" : {
                                                                "AssetId": "IMG_19",
                                                                "StaticCss" : [
                                                                                {"cssProperty":"width", "cssValue":"100%"},
                                                                                {"cssProperty":"height", "cssValue":"100%"},
                                                                                {"cssProperty":"visibility", "cssValue":"visible"}
                                                                ]
                                                    }
                                                    , "AUDIO_DRAMA_3" : {
                                                                "AssetId" : "AUDIO_DRAMA_3"
                                                    }
                                    }
                            }
                        }
                }
                // 20th Frame object
                , {
                        "Layers": [
                            {
                                "LayerId" : "Layer_Main_0",
                                "LayerIndex" : 0,
                                "AssetsIdsList" : ["IMG_20","AUDIO_DRAMA_4"],
                                "Comment" : "Pictures Layer"
                            }
                        ],
                        
                        "FrameKeys": [0],
                        
                        "FrameKeysData": {
                            "0": {
                                    "Layer_Main_0": {
                                                    "IMG_20" : {
                                                                "AssetId": "IMG_20",
                                                                "StaticCss" : [
                                                                                {"cssProperty":"width", "cssValue":"100%"},
                                                                                {"cssProperty":"height", "cssValue":"100%"},
                                                                                {"cssProperty":"visibility", "cssValue":"visible"}
                                                                ]
                                                    }
                                                    , "AUDIO_DRAMA_4" : {
                                                                "AssetId" : "AUDIO_DRAMA_4"
                                                    }
                                    }
                            }
                        }
                }
                // 21th Frame object
                , {
                        "Layers": [
                            {
                                "LayerId" : "Layer_Main_0",
                                "LayerIndex" : 0,
                                "AssetsIdsList" : ["IMG_21"],
                                "Comment" : "Pictures Layer"
                            }
                        ],
                        
                        "FrameKeys": [0],
                        
                        "FrameKeysData": {
                            "0": {
                                    "Layer_Main_0": {
                                                    "IMG_21" : {
                                                                "AssetId": "IMG_21",
                                                                "StaticCss" : [
                                                                                {"cssProperty":"width", "cssValue":"100%"},
                                                                                {"cssProperty":"height", "cssValue":"100%"},
                                                                                {"cssProperty":"visibility", "cssValue":"visible"}
                                                                ]
                                                    }
                                    }
                            }
                        }
                }
                // 22th Frame object
                , {
                        "Layers": [
                            {
                                "LayerId" : "Layer_Main_0",
                                "LayerIndex" : 0,
                                "AssetsIdsList" : ["IMG_22"],
                                "Comment" : "Pictures Layer"
                            }
                        ],
                        
                        "FrameKeys": [0],
                        
                        "FrameKeysData": {
                            "0": {
                                    "Layer_Main_0": {
                                                    "IMG_22" : {
                                                                "AssetId": "IMG_22",
                                                                "StaticCss" : [
                                                                                {"cssProperty":"width", "cssValue":"100%"},
                                                                                {"cssProperty":"height", "cssValue":"100%"},
                                                                                {"cssProperty":"visibility", "cssValue":"visible"}
                                                                ]
                                                    }
                                    }
                            }
                        }
                }
                // 23th Frame object
                , {
                        "Layers": [
                            {
                                "LayerId" : "Layer_Main_0",
                                "LayerIndex" : 0,
                                "AssetsIdsList" : ["IMG_23"],
                                "Comment" : "Pictures Layer"
                            }
                        ],
                        
                        "FrameKeys": [0],
                        
                        "FrameKeysData": {
                            "0": {
                                    "Layer_Main_0": {
                                                    "IMG_23" : {
                                                                "AssetId": "IMG_23",
                                                                "StaticCss" : [
                                                                                {"cssProperty":"width", "cssValue":"100%"},
                                                                                {"cssProperty":"height", "cssValue":"100%"},
                                                                                {"cssProperty":"visibility", "cssValue":"visible"}
                                                                ]
                                                    }
                                    }
                            }
                        }
                }
                // 24th Frame object
                , {
                        "Layers": [
                            {
                                "LayerId" : "Layer_Main_0",
                                "LayerIndex" : 0,
                                "AssetsIdsList" : ["IMG_24"],
                                "Comment" : "Pictures Layer"
                            }
                            ,{  
                                "LayerId":"Layer_1",
                                "LayerIndex" : 0,
                                "AssetsIdsList" : ["BUL_TXT_40"],
                                "Comment" : "Bubbles layer",
                                "CustomLayerCssClass": "BUBBLE_ROOT_CSS"
                                }
                        ],
                        
                        "FrameKeys": [0],
                        
                        "FrameKeysData": {
                            "0": {
                                    "Layer_Main_0": {
                                                    "IMG_24" : {
                                                                "AssetId": "IMG_24",
                                                                "StaticCss" : [
                                                                                {"cssProperty":"width", "cssValue":"100%"},
                                                                                {"cssProperty":"height", "cssValue":"100%"},
                                                                                {"cssProperty":"visibility", "cssValue":"visible"}
                                                                ]
                                                    }
                                    }
                                    ,"Layer_1": {
                                                            "BUL_TXT_40" : {
                                                                        "AssetId": "BUL_TXT_40",
                                                                        "CssClass" : "BUBBLE_DOWN"/*,
                                                                        "StaticCss" : [
                                                                                        {"cssProperty":"width", "cssValue":"100%"},
                                                                                        {"cssProperty":"height", "cssValue":"100%"},
                                                                                        {"cssProperty":"visibility", "cssValue":"visible"}
                                                                        ]*/
                                                            }
                                            }
                            }
                        }
                }
                // 25th Frame object
                , {
                        "Layers": [
                            {
                                "LayerId" : "Layer_Main_0",
                                "LayerIndex" : 0,
                                "AssetsIdsList" : ["IMG_25"],
                                "Comment" : "Pictures Layer"
                            }
                        ],
                        
                        "FrameKeys": [0],
                        
                        "FrameKeysData": {
                            "0": {
                                    "Layer_Main_0": {
                                                    "IMG_25" : {
                                                                "AssetId": "IMG_25",
                                                                "StaticCss" : [
                                                                                {"cssProperty":"width", "cssValue":"100%"},
                                                                                {"cssProperty":"height", "cssValue":"100%"},
                                                                                {"cssProperty":"visibility", "cssValue":"visible"}
                                                                ]
                                                    }
                                    }
                            }
                        }
                }
                // 26th Frame object
                , {
                        "Layers": [
                            {
                                "LayerId" : "Layer_Main_0",
                                "LayerIndex" : 0,
                                "AssetsIdsList" : ["IMG_26"],
                                "Comment" : "Pictures Layer"
                            }
                        ],
                        
                        "FrameKeys": [0],
                        
                        "FrameKeysData": {
                            "0": {
                                    "Layer_Main_0": {
                                                    "IMG_26" : {
                                                                "AssetId": "IMG_26",
                                                                "StaticCss" : [
                                                                                {"cssProperty":"width", "cssValue":"100%"},
                                                                                {"cssProperty":"height", "cssValue":"100%"},
                                                                                {"cssProperty":"visibility", "cssValue":"visible"}
                                                                ]
                                                    }
                                    }
                            }
                        }
                }
                // 27th Frame object
                , {
                        "Layers": [
                            {
                                "LayerId" : "Layer_Main_0",
                                "LayerIndex" : 0,
                                "AssetsIdsList" : ["IMG_27"],
                                "Comment" : "Pictures Layer"
                            }
                        ],
                        
                        "FrameKeys": [0],
                        
                        "FrameKeysData": {
                            "0": {
                                    "Layer_Main_0": {
                                                    "IMG_27" : {
                                                                "AssetId": "IMG_27",
                                                                "StaticCss" : [
                                                                                {"cssProperty":"width", "cssValue":"100%"},
                                                                                {"cssProperty":"height", "cssValue":"100%"},
                                                                                {"cssProperty":"visibility", "cssValue":"visible"}
                                                                ]
                                                    }
                                    }
                            }
                        }
                }
                // 28th Frame object
                , {
                        "Layers": [
                            {
                                "LayerId" : "Layer_Main_0",
                                "LayerIndex" : 0,
                                "AssetsIdsList" : ["IMG_28"],
                                "Comment" : "Pictures Layer"
                            }
                        ],
                        
                        "FrameKeys": [0],
                        
                        "FrameKeysData": {
                            "0": {
                                    "Layer_Main_0": {
                                                    "IMG_28" : {
                                                                "AssetId": "IMG_28",
                                                                "StaticCss" : [
                                                                                {"cssProperty":"width", "cssValue":"100%"},
                                                                                {"cssProperty":"height", "cssValue":"100%"},
                                                                                {"cssProperty":"visibility", "cssValue":"visible"}
                                                                ]
                                                    }
                                    }
                            }
                        }
                }
                // 29th Frame object
                , {
                        "Layers": [
                            {
                                "LayerId" : "Layer_Main_0",
                                "LayerIndex" : 0,
                                "AssetsIdsList" : ["IMG_29"],
                                "Comment" : "Pictures Layer"
                            }
                        ],
                        
                        "FrameKeys": [0],
                        
                        "FrameKeysData": {
                            "0": {
                                    "Layer_Main_0": {
                                                    "IMG_29" : {
                                                                "AssetId": "IMG_29",
                                                                "StaticCss" : [
                                                                                {"cssProperty":"width", "cssValue":"100%"},
                                                                                {"cssProperty":"height", "cssValue":"100%"},
                                                                                {"cssProperty":"visibility", "cssValue":"visible"}
                                                                ]
                                                    }
                                    }
                            }
                        }
                }
                // 30th Frame object
                , {
                        "Layers": [
                            {
                                "LayerId" : "Layer_Main_0",
                                "LayerIndex" : 0,
                                "AssetsIdsList" : ["IMG_30"],
                                "Comment" : "Pictures Layer"
                            }
                        ],
                        
                        "FrameKeys": [0],
                        
                        "FrameKeysData": {
                            "0": {
                                    "Layer_Main_0": {
                                                    "IMG_30" : {
                                                                "AssetId": "IMG_30",
                                                                "StaticCss" : [
                                                                                {"cssProperty":"width", "cssValue":"100%"},
                                                                                {"cssProperty":"height", "cssValue":"100%"},
                                                                                {"cssProperty":"visibility", "cssValue":"visible"}
                                                                ]
                                                    }
                                    }
                            }
                        }
                }
                // 31th Frame object
                , {
                        "Layers": [
                            {
                                "LayerId" : "Layer_Main_0",
                                "LayerIndex" : 0,
                                "AssetsIdsList" : ["IMG_31"],
                                "Comment" : "Pictures Layer"
                            }
                        ],
                        
                        "FrameKeys": [0],
                        
                        "FrameKeysData": {
                            "0": {
                                    "Layer_Main_0": {
                                                    "IMG_31" : {
                                                                "AssetId": "IMG_31",
                                                                "StaticCss" : [
                                                                                {"cssProperty":"width", "cssValue":"100%"},
                                                                                {"cssProperty":"height", "cssValue":"100%"},
                                                                                {"cssProperty":"visibility", "cssValue":"visible"}
                                                                ]
                                                    }
                                    }
                            }
                        }
                }
                // 32th Frame object
                , {
                        "Layers": [
                            {
                                "LayerId" : "Layer_Main_0",
                                "LayerIndex" : 0,
                                "AssetsIdsList" : ["IMG_32"],
                                "Comment" : "Pictures Layer"
                            }
                        ],
                        
                        "FrameKeys": [0],
                        
                        "FrameKeysData": {
                            "0": {
                                    "Layer_Main_0": {
                                                    "IMG_32" : {
                                                                "AssetId": "IMG_32",
                                                                "StaticCss" : [
                                                                                {"cssProperty":"width", "cssValue":"100%"},
                                                                                {"cssProperty":"height", "cssValue":"100%"},
                                                                                {"cssProperty":"visibility", "cssValue":"visible"}
                                                                ]
                                                    }
                                    }
                            }
                        }
                }
                // 33th Frame object
                , {
                        "Layers": [
                            {
                                "LayerId" : "Layer_Main_0",
                                "LayerIndex" : 0,
                                "AssetsIdsList" : ["IMG_33"],
                                "Comment" : "Pictures Layer"
                            }
                        ],
                        
                        "FrameKeys": [0],
                        
                        "FrameKeysData": {
                            "0": {
                                    "Layer_Main_0": {
                                                    "IMG_33" : {
                                                                "AssetId": "IMG_33",
                                                                "StaticCss" : [
                                                                                {"cssProperty":"width", "cssValue":"100%"},
                                                                                {"cssProperty":"height", "cssValue":"100%"},
                                                                                {"cssProperty":"visibility", "cssValue":"visible"}
                                                                ]
                                                    }
                                    }
                            }
                        }
                }
                // 34th Frame object
                , {
                        "Layers": [
                            {
                                "LayerId" : "Layer_Main_0",
                                "LayerIndex" : 0,
                                "AssetsIdsList" : ["IMG_34"],
                                "Comment" : "Pictures Layer"
                            }
                        ],
                        
                        "FrameKeys": [0],
                        
                        "FrameKeysData": {
                            "0": {
                                    "Layer_Main_0": {
                                                    "IMG_34" : {
                                                                "AssetId": "IMG_34",
                                                                "StaticCss" : [
                                                                                {"cssProperty":"width", "cssValue":"100%"},
                                                                                {"cssProperty":"height", "cssValue":"100%"},
                                                                                {"cssProperty":"visibility", "cssValue":"visible"}
                                                                ]
                                                    }
                                    }
                            }
                        }
                }
                // 35th Frame object
                /* , {
                        "Layers": [
                            {
                                "LayerId" : "Layer_Main_0",
                                "LayerIndex" : 0,
                                "AssetsIdsList" : ["IMG_35"],
                                "Comment" : "Pictures Layer"
                            }
                        ],
                        
                        "FrameKeys": [0],
                        
                        "FrameKeysData": {
                            "0": {
                                    "Layer_Main_0": {
                                                    "IMG_35" : {
                                                                "AssetId": "IMG_35",
                                                                "StaticCss" : [
                                                                                {"cssProperty":"width", "cssValue":"100%"},
                                                                                {"cssProperty":"height", "cssValue":"100%"},
                                                                                {"cssProperty":"visibility", "cssValue":"visible"}
                                                                ]
                                                    }
                                    }
                            }
                        }
                }*/
                // 36th Frame object
                , {
                        "Layers": [
                            {
                                "LayerId" : "Layer_Main_0",
                                "LayerIndex" : 0,
                                "AssetsIdsList" : ["IMG_36"],
                                "Comment" : "Pictures Layer"
                            }
                        ],
                        
                        "FrameKeys": [0],
                        
                        "FrameKeysData": {
                            "0": {
                                    "Layer_Main_0": {
                                                    "IMG_36" : {
                                                                "AssetId": "IMG_36",
                                                                "StaticCss" : [
                                                                                {"cssProperty":"width", "cssValue":"100%"},
                                                                                {"cssProperty":"height", "cssValue":"100%"},
                                                                                {"cssProperty":"visibility", "cssValue":"visible"}
                                                                ]
                                                    }
                                    }
                            }
                        }
                }
                // 37th Frame object
                , {
                        "Layers": [
                            {
                                "LayerId" : "Layer_Main_0",
                                "LayerIndex" : 0,
                                "AssetsIdsList" : ["IMG_37"],
                                "Comment" : "Pictures Layer"
                            }
                        ],
                        
                        "FrameKeys": [0],
                        
                        "FrameKeysData": {
                            "0": {
                                    "Layer_Main_0": {
                                                    "IMG_37" : {
                                                                "AssetId": "IMG_37",
                                                                "StaticCss" : [
                                                                                {"cssProperty":"width", "cssValue":"100%"},
                                                                                {"cssProperty":"height", "cssValue":"100%"},
                                                                                {"cssProperty":"visibility", "cssValue":"visible"}
                                                                ]
                                                    }
                                    }
                            }
                        }
                }
                // 38th Frame object
                , {
                        "Layers": [
                            {
                                "LayerId" : "Layer_Main_0",
                                "LayerIndex" : 0,
                                "AssetsIdsList" : ["IMG_38"],
                                "Comment" : "Pictures Layer"
                            }
                        ],
                        
                        "FrameKeys": [0],
                        
                        "FrameKeysData": {
                            "0": {
                                    "Layer_Main_0": {
                                                    "IMG_38" : {
                                                                "AssetId": "IMG_38",
                                                                "StaticCss" : [
                                                                                {"cssProperty":"width", "cssValue":"100%"},
                                                                                {"cssProperty":"height", "cssValue":"100%"},
                                                                                {"cssProperty":"visibility", "cssValue":"visible"}
                                                                ]
                                                    }
                                    }
                            }
                        }
                }
                // 39th Frame object
                , {
                        "Layers": [
                            {
                                "LayerId" : "Layer_Main_0",
                                "LayerIndex" : 0,
                                "AssetsIdsList" : ["IMG_39"],
                                "Comment" : "Pictures Layer"
                            }
                        ],
                        
                        "FrameKeys": [0],
                        
                        "FrameKeysData": {
                            "0": {
                                    "Layer_Main_0": {
                                                    "IMG_39" : {
                                                                "AssetId": "IMG_39",
                                                                "StaticCss" : [
                                                                                {"cssProperty":"width", "cssValue":"100%"},
                                                                                {"cssProperty":"height", "cssValue":"100%"},
                                                                                {"cssProperty":"visibility", "cssValue":"visible"}
                                                                ]
                                                    }
                                    }
                            }
                        }
                }
                // 40th Frame object
                , {
                        "Layers": [
                            {
                                "LayerId" : "Layer_Main_0",
                                "LayerIndex" : 0,
                                "AssetsIdsList" : ["IMG_40"],
                                "Comment" : "Pictures Layer"
                            }
                        ],
                        
                        "FrameKeys": [0],
                        
                        "FrameKeysData": {
                            "0": {
                                    "Layer_Main_0": {
                                                    "IMG_40" : {
                                                                "AssetId": "IMG_40",
                                                                "StaticCss" : [
                                                                                {"cssProperty":"width", "cssValue":"100%"},
                                                                                {"cssProperty":"height", "cssValue":"100%"},
                                                                                {"cssProperty":"visibility", "cssValue":"visible"}
                                                                ]
                                                    }
                                    }
                            }
                        }
                }
                , // whats next img
                {
                    "Layers": [
                            {
                                "LayerId" : "Layer_Main_0",
                                "LayerIndex" : 0,
                                "AssetsIdsList" : ["IMG_41"],
                                "Comment" : "Pictures Layer"
                            }
                        ],

                        "FrameKeys": [0],

                        "FrameKeysData": {
                            "0": {
                                    "Layer_Main_0": {
                                                    "IMG_41" : {
                                                                "AssetId": "IMG_41",
                                                                "StaticCss" : [
                                                                                {"cssProperty":"width", "cssValue":"100%"},
                                                                                {"cssProperty":"height", "cssValue":"100%"},
                                                                                {"cssProperty":"visibility", "cssValue":"visible"}
                                                                ]
                                                    }
                                    }
                            }
                        }
                    }
    ] 
}    
    
    
    
    


/***************************************************************************************/
/***************************************************************************************/



                function loaded(sender) {
                    if (sender.complete) {                      
                        alert('loaded')
                        hideLoadProgress();
                    }
                }
                 
                /*
                if (img.complete) {
                      loaded()
                } else {
                    img.addEventListener('load', loaded)
                    img.addEventListener('error', function() {
                                                        alert('error')
                                                    })
                }
                */ 
                  



/***************************************************************************************/
/*********************           View-Model Controller            **********************/
/*********************          Simplifyed Version 4 BD           **********************/

var CURRENT_FRAM_INDEX = -1;
var LAYER_INTERVAL_FACTOR = 10;
var LANGUAGE_EN = "EN";
var LANGUAGE_FR = "FR";
var CUR_LANGUAGE = LANGUAGE_EN;

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
    
    /*if(model = undefined)
    {
        this.Model = Model["chapter_" + chapterId];
    }*/
    
    // Implement a method that retrieves assets and model from server
    //this.Assets = GetChapterAsset();
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



DisplayController.prototype.GoToPrevious = function(){
    
    //alert("prototype.GoToPrevious ");
    
    if(this.CurrentFrameIndex == -1)
    {
        // We go to previous chapter.
        //GoToPreviousChapter(this.CurrentChapterId - 1);
    }
    else
    {
        if(this.CurrentFrameKeyIndex <= 0)
        {
            if(this.CurrentFrameIndex <= 0)
            {
                // We go to previous chapter.
                //GoToPreviousChapter(this.CurrentChapterId - 1);
            }
            else
            {
                this.CurrentFrameIndex--;
                this.GoToPreviousFrame(this.CurrentFrameIndex);
            }
        }
        else
        {
            this.CurrentFrameKeyIndex--;
            this.GoToPreviousFrameKey(this.CurrentFrameKeyIndex);
        }
    }
}

DisplayController.prototype.GoToNext = function(){    
    
    //alert("prototype.GoToNext: this.CurrentFrameIndex: " + this.CurrentFrameIndex + " - NbFrames: " + this.NbFrames);
    
    // we check if we stay in the same frame or we need to change frame
    // First Frame for chapter
    if(this.CurrentFrameIndex == -1 && this.NbFrames > 0)
    {
        //alert(this.CurrentFrameIndex == -1 && this.NbFrames > 0);
        this.CurrentFrameIndex          = 0;
        this.CurrentFrame               = this.Model[this.CurrentFrameIndex];
        
        //alert("this.CurrentFrame['FrameKeys'].length : " + this.CurrentFrame["FrameKeys"].length);
        if(this.CurrentFrame["FrameKeys"].length > 0)
        {
            this.CurrentFrameKeyIndex   = 0;
            this.CurrentFrameKeysNumber = this.CurrentFrame["FrameKeys"].length;
        }
        this.SetFrameLayers();   
        this.GoToNextFrameKey(this.CurrentFrameKeyIndex);
    }
    else
    {
        //alert("Else - " + this.CurrentFrameIndex);
        // if in last frame key within the current Frame
        if(this.CurrentFrameKeyIndex + 1 >= this.CurrentFrame["FrameKeys"].length)
        {
            if(this.CurrentFrameIndex + 1 < this.NbFrames)
                this.CurrentFrameIndex++;
            else
                this.CurrentFrameIndex = 0;
            
            //this.CurrentFrameKeyIndex = 0;
            this.GoToNextFrame(this.CurrentFrameIndex);
        }
        else // In current Frame we go to next listed Frame key
        {
            this.CurrentFrameKeyIndex++;
            //this.GoToNextFrameKey(this.CurrentFrameKeyIndex);
            
            try{
                this.GoToNextFrameKey(this.CurrentFrameKeyIndex);
            }catch(ex){
                Console.log(ex.message);
            }
        }
    }
}



DisplayController.prototype.GoToPreviousFrame = function(frameIndex){
    
    //alert("prototype.GoToPreviousFrame ");
    
    this.CurrentFrameIndex      = frameIndex;
    this.CurrentFrame           = this.Model[this.CurrentFrameIndex];
    this.CurrentFrameKeysNumber = this.CurrentFrame["FrameKeys"].length;
    this.CurrentFrameKeyIndex   = 0; //this.CurrentFrameKeysNumber - 1; // 0 when we want to replay entierly a Frame
    
    // We prepare the target layers here
    this.SetFrameLayers();
    //alert("Layers intiated...");
    
    this.GoToPreviousFrameKey(this.CurrentFrameKeyIndex);
    
}

DisplayController.prototype.GoToNextFrame = function(frameIndex){
    //alert("prototype.GoToNextFrame ");
    this.CurrentFrameIndex      = frameIndex;
    this.CurrentFrame           = this.Model[this.CurrentFrameIndex];
    this.CurrentFrameKeysNumber = this.CurrentFrame["FrameKeys"].length;
    this.CurrentFrameKeyIndex   = 0;
    
    // We prepare the target layers here
    this.SetFrameLayers();
    
    try{
        this.GoToNextFrameKey(this.CurrentFrameKeyIndex);
    }catch(ex){
        Console.log(ex.message);
    }
}


DisplayController.prototype.GoToPreviousFrameKey = function(frameKeyIndex){

    //alert("prototype.GoToPreviousFrameKey ");
    if(frameKeyIndex < 0)
    {
        if(this.CurrentFrameIndex == 0)
        {
            //GoToPreviousChapter(this.CurrentChapterId - 1);
        }
        else
        {
            this.GoToPreviousFrame(this.CurrentFrameIndex - 1);
        }
    }
    else
    {
        // We clean current KeyFrame element
        if(frameKeyIndex > 0)
        {
            this.RemoveKeyFrameElements(this.CurrentFrameKeyIndex);
        }
        
        this.CurrentFrameKeyIndex = frameKeyIndex; 
        // Display KeyFrame Element
        this.DisplayKeyFrameElements(this.CurrentFrameKeyIndex); // to b implemented
    }
    
}

DisplayController.prototype.GoToNextFrameKey = function(frameKeyIndex){

    try{
    
        if(frameKeyIndex >= this.CurrentFrame["FrameKeys"].length)
        {
            //we go to next frame

            if(this.CurrentFrameIndex >= this.NbFrames - 1)
            {
                //GoToNextChapter(this.CurrentChapterId + 1);
            }
            else
            {
                this.GoToNextFrame(this.CurrentFrameIndex + 1);
            }
        }
        else
        {
            this.CurrentFrameKeyIndex = frameKeyIndex;
            // Display KeyFrame Element
            this.DisplayKeyFrameElements(this.CurrentFrameKeyIndex);  // to be implemented
        }
    
    }catch(ex){
        console.log(ex.message);
    }
    
    
}


DisplayController.prototype.SetFrameLayers = function()
{
    var currentLayers = this.CurrentFrame["Layers"];
    
    //alert("Frame " + this.CurrentFrameIndex + " has " + currentLayers.length + " layers...");
    
    if(currentLayers != undefined && currentLayers.length > 0)
    {
        // Remove previous Frame Layers
        $("#bubblesRootDiv").empty();
        $('#displayDiv').empty();
        
        // Append current Frame Layers
        for(var layerIndex = 0 ; layerIndex < currentLayers.length; layerIndex++)
        {
            //alert("Layer Id to check(index is " + layerIndex +"): " + currentLayers[layerIndex]["LayerId"]);
            var layerElementId              = currentLayers[layerIndex]["LayerId"];
            var zIndexValue                 = LAYER_INTERVAL_FACTOR * (layerIndex + 1);
            
            // We create the main layer for pictures
            if(currentLayers[layerIndex]["LayerId"].indexOf("Main") != -1)
            {
                var newMainLayer            = "<div id='"+ layerElementId +"' class='basicContainerLayer'>" + /*layerElementId + " - " + this.CurrentFrameIndex + " - zIndex: " + zIndexValue +*/ "</div>";
                $('#displayDiv').append(newMainLayer);

                var curElement              = document.getElementById("displayDiv");
                curElement.style.zIndex     = zIndexValue;
                //$("#"+layerElementId).zIndex(zIndexValue);
            }
            else
            {
                var customLayerCssClass = " class='displayDivClass' ";
                //var commonParentLayer = "displayDiv";
                
                if(currentLayers[layerIndex]["CustomLayerCssClass"] != undefined)
                {
                    customLayerCssClass = " class='" + currentLayers[layerIndex]["CustomLayerCssClass"] + "'";
                    //commonParentLayer = "bubblesDiv";
                }
                
                var newLayer = "<div id='"+ layerElementId +"' "+customLayerCssClass+">" + /*layerElementId+ " - " + this.CurrentFrameIndex + " - zIndex: " + zIndexValue +*/ "</div>";
                //alert(newLayer);
                $('#displayDiv').append(newLayer);
                //$('#' + commonParentLayer).append(newLayer);
                
                var curElement              = document.getElementById(layerElementId);
                curElement.style.zIndex     = zIndexValue;
                //$("#"+layerElementId).zIndex(zIndexValue);
            }
        
        }
    }
}

DisplayController.prototype.RemoveKeyFrameElements = function(frameKeyIndex)
{

    if(this.CurrentFrame["FrameKeysData"][""+frameKeyIndex] != null && this.CurrentFrame["FrameKeysData"][""+frameKeyIndex] != undefined)
    {
        var currentLayers = this.CurrentFrame["Layers"];
        
        if(currentLayers != undefined && currentLayers.length > 0)
        {
            for(var layerIndex = 0 ; layerIndex < currentLayers.length; layerIndex++)
            {
                if(this.CurrentFrame["FrameKeysData"][""+frameKeyIndex][currentLayers[layerIndex]["LayerId"]] != undefined)
                {
                    var curLayerAssetData           = currentLayers[layerIndex]["AssetsIdsList"];
                    var curFrameKeyDataForLayer     = this.CurrentFrame["FrameKeysData"][""+frameKeyIndex][currentLayers[layerIndex]["LayerId"]];
                    
                    for(var layerAssetIdx = 0; layerAssetIdx < curLayerAssetData.length; layerAssetIdx++)
                    {
                        var curAssetId              = curLayerAssetData[layerAssetIdx]
                        if(curFrameKeyDataForLayer[curAssetId] != undefined)
                        {
                            var curAssetData = this.GetAssetDesc(curAssetId);  // this.Assets["Assets"]
                            
                            switch(curAssetData["AssetType"])
                            { 
                                
                                default:
                                    var layerSelector   = currentLayers[layerIndex]["LayerId"];
                                    $("#" + curAssetId).fadeOut(250);
                                    $( '#' + layerSelector ).remove( "#" + curAssetId );
                                break;
                            }
                        }
                    }
                }
            }
        }
    }
    //
    
    
}


// Method to customize according to how we want to manage the display according to model
DisplayController.prototype.DisplayKeyFrameElements = function(frameKeyIndex)
{
    try{
        
    if(this.CurrentFrame["FrameKeysData"][""+frameKeyIndex] != null && this.CurrentFrame["FrameKeysData"][""+frameKeyIndex] != undefined)
    {
        var currentLayers = this.CurrentFrame["Layers"];
        
        if(currentLayers != undefined && currentLayers.length > 0)
        {
            for(var layerIndex = 0 ; layerIndex < currentLayers.length; layerIndex++)
            {
                if(this.CurrentFrame["FrameKeysData"][""+frameKeyIndex][currentLayers[layerIndex]["LayerId"]] != undefined)
                {
                    var curLayerAssetData           = currentLayers[layerIndex]["AssetsIdsList"];
                    var curFrameKeyDataForLayer     = this.CurrentFrame["FrameKeysData"][""+frameKeyIndex][currentLayers[layerIndex]["LayerId"]];
                    
                    for(var layerAssetIdx = 0; layerAssetIdx < curLayerAssetData.length; layerAssetIdx++)
                    {
                        var curAssetId              = curLayerAssetData[layerAssetIdx]
                        if(curFrameKeyDataForLayer[curAssetId] != undefined)
                        {   
                            var curAssetData = this.GetAssetDesc(curAssetId);  // this.Assets["Assets"]
                            
                            switch(curAssetData["AssetType"])
                            {       
                                        /*case STOP_AUDIO_ASSET:
                                        break;*/
                                    
                                        case PLAY_AUDIO_ASSET:
                                    
                                        var layerSelector   = currentLayers[layerIndex]["LayerId"];
                                    
                                        if(curFrameKeyDataForLayer[curAssetId]["globalAudio"] != undefined && curFrameKeyDataForLayer[curAssetId]["globalAudio"])
                                        {
                                            layerSelector = $("#mainAudiContainer");
                                        }
                                            
                                    
                                        var audioSrc          = curAssetData["Path"];
                                        
                                        var audiAssetElement = $("<audio id='" + layerSelector + "_FK" + frameKeyIndex + "_A" + curAssetId + "' class='HIDDEN_AUDIO' src='" + audioSrc + "' autoplay auto ></audio>");
                                    
                                        $('#' + layerSelector).append(audiAssetElement);
                                    
                                        var audioElemObj = document.getElementById(layerSelector + "_FK" + frameKeyIndex + "_A" + curAssetId);
                                        
                                        if(audioElemObj != null && audioElemObj != undefined)
                                        {
                                            if(GBL_AUDIO_ON)
                                            {
                                                audioElemObj.muted = false;
                                                audioElemObj.play();
                                            }
                                        }
                                    
                                    break;
                                    
                                    
                                    case BUL_TXT_ASSET:
                                    
                                        var layerSelector   = currentLayers[layerIndex]["LayerId"];
                                        $('#' + layerSelector).empty();
                                        //alert(" curAssetId : " + curAssetId + "   -  layerSelector: " + layerSelector);
                                    
                                        var textValue       = "";
                                    
                                        if(curAssetData["TextFR"] != undefined && curAssetData["TextEN"] != undefined)
                                            textValue       = (CUR_LANGUAGE == LANGUAGE_FR)?curAssetData["TextFR"]:curAssetData["TextEN"];
                                    
                                        var zIndexNew       = ((layerIndex +1) * LAYER_INTERVAL_FACTOR) + 3;
                                        var appliedClass    = "";
                                    
                                        if(layerSelector.indexOf("Main") != -1)
                                            appliedClass    = "class='mainPic'";
                                    
                                    
                                        var textCssClass   = curFrameKeyDataForLayer[curAssetId]["CssClass"];
                                        if(textCssClass != undefined)
                                        {
                                            appliedClass = " class='" + textCssClass + "'";
                                        }
                                        
                                        //alert("appliedClass" + appliedClass);
                                        var newAssetElement = $("<div id='" + layerSelector + "_FK" + frameKeyIndex + "_A" + curAssetId +"' " + appliedClass + "> <div class='BUBBLE_WRAPPER'> <div class='BUBBLE_TXT'>" + textValue + "</div> </div></div>").hide();
                                    
                                        $('#' + layerSelector).append(newAssetElement);
                                    
                                        if(curFrameKeyDataForLayer[curAssetId]["StaticCss"] != undefined)
                                        {
                                            var assetHtmlElement        = document.getElementById(curAssetId);
                                            var staticCssList           = curFrameKeyDataForLayer[curAssetId]["StaticCss"];
                                            
                                            if(curFrameKeyDataForLayer[curAssetId]["CssClass"] != undefined && curFrameKeyDataForLayer[curAssetId]["CssClass"] != "")
                                                $("#" + curAssetId).addClass(curFrameKeyDataForLayer[curAssetId]["CssClass"]);
                                            
                                            for(var staticCssIdx = 0; staticCssIdx < staticCssList.length ; staticCssIdx++)
                                            {
                                                $("#" + curAssetId).css(staticCssList["cssProperty"],staticCssList["cssValue"]);
                                            }
                                        }
                                    
                                        var appendedDivId = layerSelector + "_FK" + frameKeyIndex + "_A" + curAssetId;
                                        var curTextElement = document.getElementById(appendedDivId);
                                        curTextElement.style.zIndex = zIndexNew;
                                        $("#" + appendedDivId).fadeIn(300);
                                    ////////////
                                    
                                    
                                    break;
                                    
                                    
                                    case TXT_ASSET:
                                        var layerSelector   = currentLayers[layerIndex]["LayerId"];
                                        //alert(" curAssetId : " + curAssetId + "   -  layerSelector: " + layerSelector);
                                        var textValue          = (CUR_LANGUAGE == LANGUAGE_FR)?curAssetData["TextFR"]:curAssetData["TextEN"];
                                        var zIndexNew = ((layerIndex +1) * LAYER_INTERVAL_FACTOR) + 3;
                                        var appliedClass    = "";
                                    
                                        if(layerSelector.indexOf("Main") != -1)
                                            appliedClass    = "class='mainPic'";
                                    
                                    
                                        var bubbleCssClass   = curFrameKeyDataForLayer[curAssetId]["CssClass"];
                                        if(bubbleCssClass != undefined)
                                        {
                                            appliedClass = " class='" + bubbleCssClass + "'";
                                        }
                                        
                                        var newAssetElement = $("<p id='"+curAssetId+"' " + appliedClass + ">" +textValue+ "</p>").hide();
                                    
                                        //alert("$('#' + layerSelector).append("+ newAssetElement + ");");
                                        $('#' + layerSelector).append(newAssetElement);
                                    
                                        if(curFrameKeyDataForLayer[curAssetId]["StaticCss"] != undefined)
                                        {
                                            var assetHtmlElement        = document.getElementById(curAssetId);
                                            var staticCssList           = curFrameKeyDataForLayer[curAssetId]["StaticCss"];
                                            
                                            if(curFrameKeyDataForLayer[curAssetId]["CssClass"] != undefined && curFrameKeyDataForLayer[curAssetId]["CssClass"] != "")
                                                $("#" + curAssetId).addClass(curFrameKeyDataForLayer[curAssetId]["CssClass"]);
                                            
                                            for(var staticCssIdx = 0; staticCssIdx < staticCssList.length ; staticCssIdx++)
                                            {
                                                $("#" + curAssetId).css(staticCssList["cssProperty"],staticCssList["cssValue"]);
                                            }
                                        }
                                    
                                        var curTextElement = document.getElementById(curAssetId);
                                        curTextElement.style.zIndex = zIndexNew;
                                    
                                        $("#" + curAssetId).fadeIn(300);
                                    ////////////
                                    
                                        
                                    
                                    
                                    
                                    break;
                                    
                                    case IMG_ASSET : default:
                                        var layerSelector   = currentLayers[layerIndex]["LayerId"];
                                        var imgSrc          = curAssetData["Path"];
                                        
                                        var appliedClass    = "";
                                    
                                        if(layerSelector.indexOf("Main") != -1)
                                            appliedClass    = "class='mainPic'";
                                    
                                    
                                        var imgCssClass   = curFrameKeyDataForLayer[curAssetId]["CssClass"];
                                        if(imgCssClass != undefined)
                                        {
                                            appliedClass = " class='" + imgCssClass + "'";
                                        }
                                        
                                        var newAssetElement = $("<img id='"+curAssetId+"' src='" + imgSrc + "' " + appliedClass + " />").hide();
                                    
                                        //alert("$('#' + layerSelector).append("+ newAssetElement + ");");
                                        $('#' + layerSelector).append(newAssetElement);
                                    
                                        if(curFrameKeyDataForLayer[curAssetId]["StaticCss"] != undefined)
                                        {
                                            var assetHtmlElement        = document.getElementById(curAssetId);
                                            var staticCssList           = curFrameKeyDataForLayer[curAssetId]["StaticCss"];
                                            
                                            if(curFrameKeyDataForLayer[curAssetId]["CssClass"] != undefined && curFrameKeyDataForLayer[curAssetId]["CssClass"] != "")
                                                $("#" + curAssetId).addClass(curFrameKeyDataForLayer[curAssetId]["CssClass"]);
                                            
                                            for(var staticCssIdx = 0; staticCssIdx < staticCssList.length ; staticCssIdx++)
                                            {
                                                $("#" + curAssetId).css(staticCssList["cssProperty"],staticCssList["cssValue"]);
                                            }
                                        }
                                    
                                        $("#" + curAssetId).fadeIn(400);
                                    
                                    break;
                            
                            }
                        }
                    }
                }
            }
        }
    }
    //    
    }
    catch(ex)
    {
        console.log(ex.message);
    
    } 
}


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
var displayController = new DisplayController();
displayController.Init(0);



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








