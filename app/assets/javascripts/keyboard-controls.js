$(document).ready(function(){
    //Set first image with red background
    $("#image1").css("background-color","red");

    var current_image = "#image1";
    var next_image = "#image1";
    var img_num = 1;
    var selection_flag = 0;
    var selected_images = [];
    var already_selected = false;
    var previous_image = "#image1";
    var imageToAnalyze = [-5,-4,-3,-2,-1,0];
    var imageToAnalyze_String = [];
    var reducedData;
    var damage_status= 'undamaged';
    var damaged_images = {};
    var damage_counter = 0;

// ---------------------------FUNCTIONS----------------------------------------------

    //Based on keyboard input, will change the background color to the selected image, thus highlighting it
    $.fn.change_color = function() {
        
        //check if image has already been selected
        for(var i = 0; i < selected_images.length; i++){
            if ($(current_image).attr("src") == selected_images[i]){
                already_selected = true;
            }
        }

        previous_image = current_image;

        $(previous_image).css("background-color", "#ccc");

        //Set img-number
        switch(img_num){

            case 1:
                current_image = "#image1";
            break;

            case 2:
                current_image = "#image2";
            break;

            case 3:
                current_image = "#image3";
            break;

            case 4:
                current_image = "#image4";
            break;

            case 5:
                current_image = "#image5";
            break;

            case 6:
                current_image = "#image6";
            break;
        }
    
        //spacebar pressed, and image previously not selected
        if(selection_flag == 1 && already_selected == false){
            $(current_image).addClass("keep-color");
            $(current_image).css("background-color","red");
            selected_images.push($(current_image).attr("src"));
        }

        //arrow key pressed, previously not selected
        else if(selection_flag == 0){
            $(current_image).css("background-color","red");
        }

        //spacebar pressed, and the image was previously selected
        else if(selection_flag == 1 && already_selected == true){
            selected_images = jQuery.grep(selected_images, function(value){
                return value != $(current_image).attr("src");
            });
            $(current_image).css("background-color","red");
            $(current_image).removeClass("keep-color");
        }


        already_selected = false;
        selection_flag = 0;
        //return this;
    };

    //Repopulate page with new images
    $.fn.updateImages = function() {
        //Reset highlighted image to top left corner
        $(current_image).css("background-color","#ccc");
        //Clear selections
        $("#image1").removeClass("keep-color");        
        $("#image2").removeClass("keep-color");
        $("#image3").removeClass("keep-color");
        $("#image4").removeClass("keep-color");
        $("#image5").removeClass("keep-color");
        $("#image6").removeClass("keep-color");        
        current_image = "#image1";
        next_image = "#image1";
        img_num = 1;
        selection_flag = 0;
        selected_images = [];
        already_selected = false;
        previous_image = "#image1";
        $(current_image).css("background-color","red");    

        //Change images to new set of six
        for(i = 0; i < imageToAnalyze.length; i++){
            imageToAnalyze[i] = imageToAnalyze[i]+6;
            imageToAnalyze_String[i] ='images/' + imageToAnalyze[i].toString()+'.jpg';
        }
        $("#image1").attr("src",imageToAnalyze_String[0]);
        $("#image2").attr("src",imageToAnalyze_String[1]);
        $("#image3").attr("src",imageToAnalyze_String[2]);
        $("#image4").attr("src",imageToAnalyze_String[3]);
        $("#image5").attr("src",imageToAnalyze_String[4]);
        $("#image6").attr("src",imageToAnalyze_String[5]);
        //$(document).modifyJSON();
    };

    //Send data to server
    // $.fn.sendData = function(){
    //     while (damage_counter < selected_images.length){
    //         damaged_images["image"+damage_counter] = selected_images[i];
    //         damage_counter++;
    //     }
    //     //alert(damaged_images);
    //     $.ajax({
    //         url: "/home/shadman/iisl-app/app/controllers/images_controller.rb",
    //         type: "GET",
    //         dataType: "script"
    //     }); //End ajax call
    // };

    //Select images using keyboard
    $.fn.keyboard_control = function() {
        $("#submit").click(function(){
            alert("Images selected: "+selected_images);
            $(document).updateImages();      
        });

        $(window).keydown(function(e) {
            switch(e.which){

                case 37: //left
                    if (img_num == 1){img_num = 3;}
                    else if (img_num == 4){img_num = 6;}
                    else{img_num = img_num - 1;}
                    $(document).change_color();
                break;
                
                case 38: //up
                    if (img_num > 3){img_num = img_num - 3;}
                    else if(img_num < 4){img_num = img_num + 3;}
                    $(document).change_color();                    
                break;
                
                case 39: //right
                    if (img_num == 3){img_num = 1;}
                    else if (img_num == 6){img_num = 4;}
                    else{img_num = img_num + 1;}
                    $(document).change_color();
                break;
                
                case 40: //down
                    if (img_num > 3){img_num = img_num - 3;}
                    else if(img_num < 4){img_num = img_num + 3;}
                    $(document).change_color();                    
                break;

                case 32: //spacebar
                    img_num = img_num;
                    selection_flag = 1;
                    $(document).change_color();
                break;

                case 13: //enter
                    alert("Images selected: "+selected_images);
                    $(document).updateImages();
                    // $(document).sendData();
                break;
            }
        });
    };

//-------------------------------------MAIN------------------------------

    $(document).updateImages();
    $(document).keyboard_control();
});