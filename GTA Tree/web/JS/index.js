$(function () {
  $('[data-toggle="popover"]').popover()
});

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
        $.each(jsondata[index].subfamilies, function(i, value) {          
            var download="";
            $.each(value.downloads, function(j, val) {          
                download += val.name+":<a href='"+val.nr+"' title='NR'><i class='fas fa-file-download' style='color: #ff5200;font-size: 17px;'></i></a>&nbsp;<a href='"+val.uniprot+"' title='Uniprot'><i class='fas fa-file-download' style='color: #084177;font-size: 17px;'></i></a>";
           // alert(download);
            });
            subfamily+="<span data-html='true' data-toggle='popover' data-placement='top' data-original-title='Download' data-content='hello'>"+value.name+", </span>";
            
        });
        //subfamily = subfamily.substring(0,subfamily.length-2);
        subfamily+="</p>";
        ///////dynamically created main problem hai
        //document.getElementById("test").innerHTML = subfamily;
        function Popx(id) {
                $('#' + id).popover({
                //$('#yo').popover({
                    html: true,
                    trigger: 'focus',
                    content: 'yoyo',
                    title: 'Download2',
                    placement: 'top'
                }).hover(function (e) {
                    $(this).popover('focus');
                });
        }
        
        
        document.getElementById("test").innerHTML = "<div id='yo'><span tabindex='6' data-container='body' data-html='true' data-toggle='popover' data-placement='top' data-trigger='focus' data-original-title='Download1' data-content='<b>hello</b>'>pop2</span></div>";
        Popx("yo");
        
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
        
        var downloads="";
        $.each(jsondata[index].downloads, function(i, val) {          
            downloads+=val.name+":  <a href='"+val.nr+"' title='NR'><i class='fas fa-file-download' style='color: #ff5200;font-size: 17px;'></i></a>&nbsp;<a href='"+val.uniprot+"' title='Uniprot'><i class='fas fa-file-download' style='color: #084177;font-size: 17px;'></i></a>&nbsp;";
        });
        
       
        document.getElementById("weblogo").innerHTML ="<div id='myModal' class='modal custom-modal'>"
                                                +"<section class='mb-4'>"
                                        
                                                    +" <div class='container'>"
                                                        +"<div class='card-columns'>"
                                                            +"<div class='card border-info mb-3' style='max-width: 40rem; min-width: 25rem; max-height: 41rem; min-height: 41rem;'>"
                                                                +"<button type='button' class='close' data-dismiss='modal' aria-label='Close'>"
                                                                        +"<span aria-hidden='true' class='white-text'>&times;</span>"
                                                                +"</button>"
                                                                +"<div class='card-header bg-background content-cente' style='height:50px;'>"
                                                                    +"<h4 class='card-title'><i class='fas fa-dna'></i> <b>"+jsondata[index].familyName+"</b><div class='tooltip'>Hover over me<span class='tooltiptext'>Tooltip text</span></div> </h4>"
                                                                +"</div>"
                                                                +"<div class='card-body scrollableDiv' style='padding-top: 10px;'>"
                                                                    +"<h6 class='card-subtitle mb-2 text-dark'>Description: </h6>"
                                                                    +"<p class='card-text' style='font-size: 10px; color: #000;padding-left: 20px;'>"+jsondata[index].description+"</p>"
                                                                    +"<p class='card-subtitle mb-2 text-dark' style='font-size: 10px; color: #000; padding-left: 20px;'>Mechanism: "+jsondata[index].mechanism+"</p>"    
                                                                    +"</br>"                                                  
                                                                    +"<h6 class='card-subtitle mb-2 text-dark' '>Subfamilies </h6>"
                                                                    +"<p class='card-text' style='font-size: 12px; color: #000; padding-left: 20px;'>"+subfamily+"</p"
                                                                    +"</br>"                                                    
                                                                    +"<h6 class='card-subtitle mb-2 text-dark'  >Domain Organization <a href='"+jsondata[index].domainInformation+"' class='card-link' title='Domain Information'><i class='fas fa-file-download' style='color: #16817a;font-size: 17px;'></i></a></h6>"
                                                                    +domainOrganization
                                                                    +"</br>"                                                    
                                                                    +"<h6 class='card-subtitle mb-2 text-dark'>Taxonomic Distribution </h6>"
                                                                    +taxonomicDistribution
                                                                +"</div>"
                                                                +"<h6 class='card-subtitle mb-2 text-dark' style='padding-left: 20px;'>Family Alignment</h6>"
                                                                +"<div class='card-img-top' id='' style='overflow-x:scroll; width:397px;'><img src='"+jsondata[index].familyAlignment+"' height=80px></div>"
                                                                +"<div class='card-footer bg-light border-info' style='font-size: 12px;'>"
                                                                    +downloads
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
