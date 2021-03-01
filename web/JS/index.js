const SERVER_ADDRESS= "https://uga-gta.netlify.app/"
// Back to top arrow
$(document).ready(function(){
    $(window).scroll(function () {
           if ($(this).scrollTop() > 100) {
               $('#back-to-top').fadeIn();
           } else {
               $('#back-to-top').fadeOut();
           }
       });
       // scroll body to 0px on click
       $('#back-to-top').click(function () {
           $('#back-to-top').tooltip('hide');
           $('body,html').animate({
               scrollTop: 0
           }, 200);
           return false;
       });
       
       $('#back-to-top').tooltip('show');

});

//material contact form animation
$('.contact-form').find('.form-control').each(function() {
    var targetItem = $(this).parent();
    if ($(this).val()) {
      $(targetItem).find('label').css({
        'top': '10px',
        'fontSize': '14px'
      });
    }
  })
  $('.contact-form').find('.form-control').focus(function() {
    $(this).parent('.input-block').addClass('focus');
    $(this).parent().find('label').animate({
      'top': '10px',
      'fontSize': '14px'
    }, 300);
  })
  $('.contact-form').find('.form-control').blur(function() {
    if ($(this).val().length == 0) {
      $(this).parent('.input-block').removeClass('focus');
      $(this).parent().find('label').animate({
        'top': '25px',
        'fontSize': '18px'
      }, 300);
    }
  })

const SERVER_ADDRESS= process.env.SERVER_ADDRESS;
var lastEventListener = null;
var svgload = function () {
    var wid = $(window).width() - 430;
    if(wid < 330){
        wid = 330;
    }
    if(wid > 1000){
        wid = 1000;
    }
    embed = document.createElement('object');
    embed.setAttribute('id', 'gta');
    //embed.setAttribute('width', '900px');
    embed.setAttribute('width', wid);
    embed.setAttribute('height', '675px');
    embed.setAttribute('type', 'image/svg+xml');
    embed.setAttribute('data', 'SVG/gta_tree_v3.svg');
    embed.setAttribute('style','outline: 1px solid #b8b6b4');
    document.getElementById('gttree').appendChild(embed);
    lastEventListener = function () {
        svgPanZoom(embed, {
            zoomEnabled: true,
            controlIconsEnabled: true
        });
        gta();
    };
    embed.addEventListener('load', lastEventListener);
    console.log("Done Rendering");
    return embed;
};

var svg = function () {
    var a = document.getElementById('gta').contentDocument;
    return a;
};

window.onload = function () {
    svgload();
};
$(window).resize(function(){
  console.log("reloading svg...");
  
  document.getElementById('container').removeChild(embed);
  svgload();
  var modal = document.getElementById("myModal");
  modal.style.display = "none";
        
});

var gta = function () {
    //Family//
    svg().getElementById('Fam_Names').style.cursor = "pointer";
    var lbl_family = svg().getElementById('Fam_Names');
    for (let i = 0; i < lbl_family.children.length; i++) {
        var txt = lbl_family.children[i].textContent;
        lbl_family.children[i].setAttribute("text", txt);
    }
    var jsondata_Fam;
    $.getJSON('data/db_files/GTA_Fam.json', function (data) {
                      jsondata_Fam = data;
         });
    lbl_family.onclick = function (event) {
        var gta_name = event.target.getAttribute('text');
        card(gta_name, jsondata_Fam);
    }; 
    //Subfamily//
    var jsondata_SubFam;
    $.getJSON('data/db_files/GTA_SubFam.json', function (data) {
                      jsondata_SubFam = data;
         });
    //Clade//
    var jsondata_Clade;
    svg().getElementById('flowmask').style.cursor = "pointer";
    var lbl_clade = svg().getElementById('flowmask');
    for (let i = 0; i < lbl_clade.children.length; i++) {
        var txt = lbl_clade.children[i].textContent;
        if(txt!=""){
            lbl_clade.children[i].setAttribute("text", txt);
        }
    }
    $.getJSON('data/db_files/GTA_Clade.json', function (data) {
                      jsondata_Clade = data;
         });  
    lbl_clade.onclick = function (event) {
        var gta_name = event.target.getAttribute('text');
        card(gta_name, jsondata_Clade);
    };
//    $.getJSON('data/data.json', function (data) { 
};

var card = function(GTAname, jsondata){
    var index=0;
    var msg="";
    var cladeName = GTAname;
    cladeName = cladeName.substring(0,cladeName.length-2);

    var famName = GTAname;
    famName = famName.substring(0,2);

    $.each(jsondata, function(i, val) {
        //console.log(val+" --  "+GTAname);
        if(val.familyName === GTAname){
            index=i;
            msg="success";
            return false;
        }else{
            msg="failed";
        }
    });
    if (msg === "success") {
        let familyName = jsondata[index].familyName;
        let react_frame = document.getElementById('react_frame').contentWindow;
        react_frame.postMessage({"familyName":familyName},SERVER_ADDRESS);
        ///////Family////////
        var subfamily = "";
        if (jsondata[index].subfamilies === null || jsondata[index].subfamilies === undefined || jsondata[index].subfamilies === '' || jsondata[index].subfamilies.length === 0) {
            subfamily = "<span style='font-size: 9px; color: #000;'>No Subfamilies!</span>";
        } else {
            subfamily = "<table class='scrollable'>"
                    + "<tr style='font-size: 10px;'>"
            if (cladeName === "Clade") {
                subfamily += "<th>Family</th>";
            }
            if (famName === "GT") {
                subfamily += "<th>Subfamily</th>";
            }
            subfamily += "<th> | GT-A Domain</th>"
                    + "<th> | Full Sequence</th>"
                    + "<th> | Table</th>"
                    + "</tr>";
            $.each(jsondata[index].subfamilies, function (i, value) {
                var download = "";
                $.each(value.downloads, function (j, val) {
                    download += "<td class='center'><a href='" + val.nr + "' title='NR' download><i class='fas fa-file-download icon-nr'></i></a>&nbsp;<a href='" + val.uniprot + "' title='Uniprot' download><i class='fas fa-file-download icon-up'></i></a></td>";
                });
                subfamily += "<tr><td style='font-size: 9px; color: #000;' nowrap><div><span>" + value.name + "</span></div></td>" + download + "</tr>";
            });
            subfamily += "</table>";
        }
        ///////Domain Organization////////
        var domainOrganization = "";
        if (jsondata[index].domainOrganization === null || jsondata[index].domainOrganization === undefined || jsondata[index].domainOrganization === '' || jsondata[index].domainOrganization.length === 0) {
            domainOrganization = "<br>Domain Organization Data for family level only!";
        } else {
            domainOrganization = "<table class='scrollable'>"
                    + "<tr style='font-size: 10px;'>"
                    + "<th>Domains</th>"
                    + "<th>Percent</th>"
                    + "<th>Count</th>"
                    + "</tr>";
            $.each(jsondata[index].domainOrganization, function (i, val) {
                domainOrganization += "<tr style='font-size: 9px; color: #000;'>"
                        + "<td class='left'>" + val.domains + "</td>"
                        + "<td class='center' style='color: #c00;'>" + val.percent + "</td>"
                        + "<td class='center'>" + val.count + "</td>"
                        + "</tr>";
            });
            domainOrganization += "</table class='table'>"
        }
        ///////Taxonomic Distributionain////////
        var taxonomicDistribution = "<table class='scrollable'>"
                + "<tr style='font-size: 10px;'>"
                + "<th>Archaea</th>"
                + "<th>Bacteria</th>"
                + "<th>Fungi</th>"
                + "<th>Metazoa</th>"
                + "<th>Protista</th>"
                + "<th>Unknown</th>"
                + "<th>Viridiplantae</th>"
                + "<th>Viruses</th>"
                + "</tr>"
                + "<tr style='font-size: 10px; color: #000;'>";
        $.each(jsondata[index].taxonomicDistribution, function (i, val) {
            taxonomicDistribution += "<td nowrap class='center'><div><span>" + val + "</span></div></td>";
        });
        taxonomicDistribution += "</tr></table>"
        ///////Downloads///////////////
        var downloads = "";
        $.each(jsondata[index].downloads, function (i, val) {
            downloads += val.name + ":  <a href='" + val.nr + "' title='NR' download><i class='fas fa-file-download' style='color: #ff5200;font-size: 17px;'></i></a>&nbsp;<a href='" + val.uniprot + "' title='Uniprot' download><i class='fas fa-file-download' style='color: #084177;font-size: 17px;'></i></a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
        });
        downloads = downloads.substring(0, downloads.length - 6);
        var wid = $(window).width() -430;
        if(wid < 330){
            wid = 330;
        }
        if(wid > 1000){
            wid = 1000;
        }
        var cardData="<div id='myModal' class='modal custom-modal' style ='left: "+ wid +"px;'>"
                                                +"<section class='mb-4'>"
                                                    +" <div class='container'>"
                                                        +"<div class='card-columns'>"
                                                            +"<div class='card card-border mb-3' style='max-width: 25rem; min-width: 25rem; max-height: 41rem; min-height: 41rem;'>"
                                                                +"<button type='button' class='close  mr-1' data-dismiss='modal' aria-label='Close'>"
                                                                        +"<span aria-hidden='true' class='white-text'>&times;</span>"
                                                                +"</button>"
                                                                +"<div class='card-header card-header-custom content-center' style='height:50px;'>"
                                                                    +"<h4 class='title-color'><i class='fas'></i> <b>"+jsondata[index].familyName+"</b><div class='tooltip'>Hover over me<span class='tooltiptext'>Tooltip text</span></div> </h4>"
                                                                +"</div>"
                                                                +"<div class='card-body card-body-custom scrollableDiv'>"
                                                                    +"<h6 class='card-subtitle mb-3 text-dark'>Description </h6>"
                                                                    +"<p class='card-text' style='font-size: 10px; color: #000;margin-top: -10px;padding-left: 10px;'>"+jsondata[index].description+"</br><b>Mechanism: </b>"+jsondata[index].mechanism+"</p>";
                                                            
                                                                if(cladeName === "Clade"){
                                                                    cardData +="<h6 class='card-subtitle mb-3 text-dark'>Families </h6>";
                                                                 }
                                                                if(famName === "GT"){
                                                                   cardData +="<h6 class='card-subtitle mb-3 text-dark'>SubFamilies </h6>";
                                                                }   
                                                            cardData+="<p class='card-text' style='color: #000;margin-top: -10px;'>"+subfamily+"</p>"
                                                                    +"<h6 class='card-subtitle mb-3 text-dark'>Domain Organization";
                                                            
                                                                if(cladeName === "Clade"){
                                                                    cardData +="</h6>";
                                                                 }
                                                                if(famName === "GT"){
                                                                   cardData +=" <a href='"+jsondata[index].domainInformation+"' class='card-link' title='Domain Information' download><i class='fas fa-file-download' style='color: #16817a;font-size: 17px;'></i></a></h6>";
                                                                } 

        
        
                                                               cardData+="<p class='card-text' style='font-size: 10px; color: #000;10px;margin-top: -10px;'>"+domainOrganization  +"</p>"                                        
                                                                    +"<h6 class='card-subtitle mb-3 text-dark'>Taxonomic Distribution </h6>"
                                                                    +"<p class='card-text' style='font-size: 10px; color: #000;margin-top: -10px;'>"+taxonomicDistribution+"</p>"
                                                                +"</div>"
                                                                +"<div class='card-footer card-footer-custom bg-white card-border'>"
                                                                    +"<h6 class='card-subtitle mb-1 text-dark' style='margin-left: -10px'>Family Alignment</h6>"
                                                                    +"<div class='card-img-top' id='' style='overflow-x:scroll; width:397px;margin-left:-19px;margin-top:-5px;'><img src='"+jsondata[index].familyAlignment+"' height=80px></div>"
                                                                    +"<p class='card-text' style='font-size: 10px; color: #000;margin-top: 5px;'>"+downloads+"</p>"
                                                                +"</div>"
                                                            +"</div>"
                                                        +"</div>"
                                                    +"</div>"
                                                +"</section>"
                                            +"</div>";
        console.log(jsondata[index].familyAlignment);
        document.getElementById("weblogo").innerHTML = cardData;

        var modal = document.getElementById("myModal");
        modal.style.display = "contents";
        var span = document.getElementsByClassName("close")[0];
        span.onclick = function() {
            modal.style.display = "none";
        }
    }
    else{
        alert("⚠ Data for "+GTAname+" is Unavailable in Database!");
        var modal = document.getElementById("myModal");
        modal.style.display = "none";
        
    }
};