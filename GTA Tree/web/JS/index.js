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
    console.log("done");
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
    lbl.onclick = function (event) {
        var text = event.target.getAttribute('text');
        document.getElementById("weblogo").innerHTML ="<div id='myModal' class='modal custom-modal'>"
                                                +"<section class='mb-4'>"
                                                    +" <div class='container'>"
                                                        +"<div class='card-columns'>"
                                                            +"<div class='card border-info mb-3' style='max-width: 40rem; min-width: 25rem; max-height: 41rem; min-height: 41rem;'>"
                                                                +"<button type='button' class='close' data-dismiss='modal' aria-label='Close'>"
                                                                        +"<span aria-hidden='true' class='white-text'>&times;</span>"
                                                                +"</button>"
                                                                +"<div class='card-header bg-background content-cente' style='height:50px;'>"
                                                                    +"<h4 class='card-title'><b>"+text+"</b></h4>"
                                                                +"</div>"
                                                                +"<div class='card-body'>"
                                                                    +"<h6 class='card-subtitle mb-2 text-dark'>Description: </h6>"
                                                                    +"<p class='card-text'>example text to build on the card title and make up the bulk of the card'sexample text to build on the card card'sexample card's content.</p>"
                                                                    +"<h7 class='card-subtitle mb-2 text-dark' style='font-size: 13px; color: #000;'>Mechanism: </h7>"    
                                                                    +"<hr>"                                                    
                                                                    +"<h6 class='card-subtitle mb-2 text-dark'>Subfamilies </h6>"
                                                                    +"<hr>"                                                    
                                                                    +"<h6 class='card-subtitle mb-2 text-dark'>Domain Organization </h6>"
                                                                    +"<hr>"                                                    
                                                                    +"<h6 class='card-subtitle mb-2 text-dark'>Taxonomic Distribution </h6>"
                                                                    +"<hr>" 
                                                                +"</div>"                                         
                                                                    +"<h6 class='card-subtitle mb-2 text-dark' style='padding-left: 20px;'>Family Alignment: </h6>"
                                                                +"<div class='card-img-top' id='' style='overflow-x:scroll; width:397px;'><img src='data/display_images/weblogoDomain/" +text+ ".png' height=80px></div>"
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
