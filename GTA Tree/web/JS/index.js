var lastEventListener = null;
var svgload = function () {
    var embed = document.createElement('object');
    embed.setAttribute('id', 'gta');
    embed.setAttribute('width', '900px');
    embed.setAttribute('height', '675px');
    embed.setAttribute('type', 'image/svg+xml');
//    embed.setAttribute('data', 'SVG/gta_tree.svg');
    embed.setAttribute('data', 'SVG/gta_tree_v2_edited.svg');
    document.getElementById('container').appendChild(embed);
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
    svg().getElementById('Fam_Names').style.cursor = "pointer";
    var lbl = svg().getElementById('Fam_Names');
    for (let i = 0; i < lbl.children.length; i++) {
        var txt = lbl.children[i].textContent;
        lbl.children[i].setAttribute("text", txt);
    }
    var jsondata;
    $.getJSON('data/data.json', function (data) {
                      jsondata = data;
         });
    lbl.onclick = function (event) {
        var text = event.target.getAttribute('text');
        var index=0;
        var msg="";
        $.each(jsondata, function(i, val) {
            if(val.familyName === text){
                index=i;
                msg="success";
            }else{
                msg="failed"
            }
        });
        var subfamily="<p class='card-text' style='font-size: 10px; color: #000;padding-left: 20px;'>";
                                                                    
        $.each(jsondata[index].subfamilies, function(i, val) {          
            subfamily+=val.name+", ";
        });
        subfamily = subfamily.substring(0,subfamily.length-2);
        subfamily+="</p>";
        
        var domainOrganization="<table class='scrollable'>"
                                    +"<tr style='font-size: 10px;'>"
                                        +"<th>Domains</th>"
                                        +"<th>Percent</th>"
                                        +"<th>Count</th>"
                                    +"</tr>";
        $.each(jsondata[index].domainOrganization, function(i, val) {          
            domainOrganization+="<tr style='font-size: 10px; color: #000;'>"
                                    +"<td class='left'>"+val.domains+"</td>"
                                    +"<td class='center' style='color: #c00;'>"+val.percent+"</td>"
                                    +"<td class='center'>"+val.count+"</td>"
                            +"</tr>";
        });
        domainOrganization+="</table class='table'>"
       
       var taxonomicDistribution="<table class='scrollable'>"
                                        +"<tr style='font-size: 10px;'>"
                                            +"<th>SubFamily</th>"
                                            +"<th>Viruses</th>"
                                            +"<th>Archaea</th>"
                                            +"<th>Bacteria</th>"
                                            +"<th>Protista</th>"
                                            +"<th>Fungi</th>"
                                            +"<th>Viridiplantae</th>"
                                            +"<th>Metazoa</th>"
                                            +"<th>Unknown</th>"
                                        +"</tr>";
        $.each(jsondata[index].taxonomicDistribution, function(i, val) {          
            taxonomicDistribution+="<tr style='font-size: 10px; color: #000;'>"
                                    +"<td nowrap><div><span>"+val.subfamilyName+"</span></div></td>"
                                    +"<td class='center'>"+val.viruses+"</td>"
                                    +"<td class='center'>"+val.Archaea+"</td>"
                                    +"<td class='center'>"+val.Bacteria+"</td>"
                                    +"<td class='center'>"+val.Protista+"</td>"
                                    +"<td class='center'>"+val.Fungi+"</td>"
                                    +"<td class='center'>"+val.Viridiplantae+"</td>"
                                    +"<td class='center'>"+val.Metazoa+"</td>"
                                    +"<td class='center'>"+val.Unknown+"</td></tr>";
        });
        taxonomicDistribution+="</table>"
       
       
        document.getElementById("weblogo").innerHTML ="<div id='myModal' class='modal custom-modal'>"
                                                +"<section class='mb-4'>"
                                                    +" <div class='container'>"
                                                        +"<div class='card-columns'>"
                                                            +"<div class='card border-info mb-3' style='max-width: 40rem; min-width: 25rem; max-height: 41rem; min-height: 41rem;'>"
                                                                +"<button type='button' class='close' data-dismiss='modal' aria-label='Close'>"
                                                                        +"<span aria-hidden='true' class='white-text'>&times;</span>"
                                                                +"</button>"
                                                                +"<div class='card-header bg-background content-cente' style='height:50px;'>"
                                                                    +"<h4 class='card-title'><b>"+jsondata[index].familyName+"</b></h4>"
                                                                +"</div>"
                                                                +"<div class='card-body scrollableDiv' style='padding-top: 10px;'>"
                                                                    +"<h6 class='card-subtitle mb-2 text-dark'>Description: </h6>"
                                                                    +"<p class='card-text' style='font-size: 10px; color: #000;padding-left: 20px;'>"+jsondata[index].description+"</p>"
                                                                    +"<p class='card-subtitle mb-2 text-dark' style='font-size: 10px; color: #000; padding-left: 20px;'>Mechanism: "+jsondata[index].mechanism+"</p>"    
                                                                    +"</br>"                                                  
                                                                    +"<h6 class='card-subtitle mb-2 text-dark' '>Subfamilies </h6>"
                                                                    +"<p class='card-text' style='font-size: 12px; color: #000; padding-left: 20px;'>"+subfamily+"</p"
                                                                    +"</br>"                                                    
                                                                    +"<h6 class='card-subtitle mb-2 text-dark'  >Domain Organization </h6>"
                                                                    +domainOrganization
                                                                    +"</br>"                                                    
                                                                    +"<h6 class='card-subtitle mb-2 text-dark'>Taxonomic Distribution </h6>"
                                                                    +taxonomicDistribution
                                                                +"</div>"     
                                                                
                                                                +"<h6 class='card-subtitle mb-2 text-dark' style='padding-left: 20px;'>Family Alignment</h6>"
                                                                +"<div class='card-img-top' id='' style='overflow-x:scroll; width:397px;'><img src='"+jsondata[index].familyAlignment+"' height=80px></div>"
                                                                +"<div class='card-footer bg-light border-info'>"
                                                                    +"<a href='#' class='card-link'>Link</a>"
                                                                    +"<a href='#' class='card-link'>Download</a>"
                                                                +"</div>"
                                                            +"</div>"
                                
                                                        +"</div>"
                                                    +"</div>"
                                                +"</section>"
                                            +"</div>";

        var modal = document.getElementById("myModal");
        modal.style.display = "block";
        var span = document.getElementsByClassName("close")[0];
        span.onclick = function() {
            modal.style.display = "none";
        }
    };
};
