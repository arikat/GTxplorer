var lastEventListener = null;
var svgload = function () {
    var embed = document.createElement('object');
    embed.setAttribute('id', 'gta');
    embed.setAttribute('width', '900px');
    embed.setAttribute('height', '675px');
    embed.setAttribute('type', 'image/svg+xml');
    embed.setAttribute('data', 'SVG/gta_tree_v2_edited.svg');
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
        react_frame.postMessage({"familyName":familyName},"https://uga-gta2.neltlify.app");
        ///////Family////////
        var subfamily = "";
        if (jsondata[index].subfamilies === null || jsondata[index].subfamilies === undefined || jsondata[index].subfamilies === '' || jsondata[index].subfamilies.length === 0) {
            subfamily = "<span style='font-size: 9px; color: #000;'>No Data Found!</span>";
        } else {
            subfamily = "<table class='scrollable'>"
                    + "<tr style='font-size: 10px;'>"
            if (cladeName === "Clade") {
                subfamily += "<th>Family</th>";
            }
            if (famName === "GT") {
                subfamily += "<th>Subfamily</th>";
            }
            subfamily += "<th> | FastaGTADomain</th>"
                    + "<th> | FastaFullSequence</th>"
                    + "<th> | Tables</th>"
                    + "</tr>";
            $.each(jsondata[index].subfamilies, function (i, value) {
                var download = "";
                $.each(value.downloads, function (j, val) {
                    download += "<td class='center'><a href='" + val.nr + "' title='NR' download><i class='fas fa-file-download' style='color:#ff5200;font-size:17px;'></i></a>&nbsp;<a href='" + val.uniprot + "' title='Uniprot' download><i class='fas fa-file-download' style='color:#084177;font-size:17px;'></i></a></td>";
                });
                subfamily += "<tr><td style='font-size: 9px; color: #000;' nowrap><div><span>" + value.name + "</span></div></td>" + download + "</tr>";
            });
            subfamily += "</table>";
        }
        ///////Domain Organization////////
        var domainOrganization = "";
        if (jsondata[index].domainOrganization === null || jsondata[index].domainOrganization === undefined || jsondata[index].domainOrganization === '' || jsondata[index].domainOrganization.length === 0) {
            domainOrganization = "<br>No Domain Organization Found!";
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
        var cardData="<div id='myModal' class='modal custom-modal'>"
                                                +"<section class='mb-4'>"
                                                    +" <div class='container'>"
                                                        +"<div class='card-columns'>"
                                                            +"<div class='card border-info mb-3' style='max-width: 25rem; min-width: 25rem; max-height: 42rem; min-height: 42rem;'>"
                                                                +"<button type='button' class='close' data-dismiss='modal' aria-label='Close'>"
                                                                        +"<span aria-hidden='true' class='white-text'>&times;</span>"
                                                                +"</button>"
                                                                +"<div class='card-header bg-background content-cente' style='height:50px;'>"
                                                                    +"<h4 class='card-title'><i class='fas fa-dna'></i> <b>"+jsondata[index].familyName+"</b><div class='tooltip'>Hover over me<span class='tooltiptext'>Tooltip text</span></div> </h4>"
                                                                +"</div>"
                                                                +"<div class='card-body scrollableDiv' style='padding-top: 10px;margin-left: -10px;margin-right: -10px;max-height: 460px; min-height: 460px;'>"
                                                                    +"<h6 class='card-subtitle mb-2 text-dark'>Description: </h6>"
                                                                    +"<p class='card-text' style='font-size: 10px; color: #000;margin-top: -10px;padding-left: 10px;'>"+jsondata[index].description+"</br><b>Mechanism: </b>"+jsondata[index].mechanism+"</p>";
                                                            
                                                                if(cladeName === "Clade"){
                                                                    cardData +="<h6 class='card-subtitle mb-2 text-dark'>Families </h6>";
                                                                 }
                                                                if(famName === "GT"){
                                                                   cardData +="<h6 class='card-subtitle mb-2 text-dark'>SubFamilies </h6>";
                                                                }   
                                                            cardData+="<p class='card-text' style='color: #000;margin-top: -15px;'>"+subfamily+"</p>"
                                                                    +"<h6 class='card-subtitle mb-2 text-dark'>Domain Organization";
                                                            
                                                                if(cladeName === "Clade"){
                                                                    cardData +="</h6>";
                                                                 }
                                                                if(famName === "GT"){
                                                                   cardData +=" <a href='"+jsondata[index].domainInformation+"' class='card-link' title='Domain Information' download><i class='fas fa-file-download' style='color: #16817a;font-size: 17px;'></i></a></h6>";
                                                                } 

        
        
                                                               cardData+="<p class='card-text' style='font-size: 10px; color: #000;10px;margin-top: -15px;'>"+domainOrganization  +"</p>"                                        
                                                                    +"<h6 class='card-subtitle mb-2 text-dark'>Taxonomic Distribution </h6>"
                                                                    +"<p class='card-text' style='font-size: 10px; color: #000;margin-top: -15px;'>"+taxonomicDistribution+"</p>"
                                                                +"</div>"
                                                                +"<div class='card-footer bg-white border-info' style='font-size: 10px;'>"
                                                                    +"<h6 class='card-subtitle mb-2 text-dark'>Family Alignment</h6>"
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