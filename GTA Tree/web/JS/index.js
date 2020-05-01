
var lastEventListener = null;
var svgload = function () {
    var embed = document.createElement('object');
    embed.setAttribute('id', 'gta');
    embed.setAttribute('width', '900px');
    embed.setAttribute('height', '675px');
    embed.setAttribute('type', 'image/svg+xml');
    embed.setAttribute('data', 'SVG/gta_tree.svg');
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
   var a =  document.getElementById('gta').contentDocument;
   return a;
};


window.onload = function() {
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
        //alert(text);
        document.getElementById("info").innerHTML = text ;
/*
        if (genesNfamily[i].genes === text) {
                document.getElementById("info").innerHTML = text + "<div id='' style='overflow-x:scroll; width:900px;'><img src='images/" + genesNfamily[i].weblogo + "' height=80px></div>";
                var brn = svg().getElementById('BRANCHES');
                var allgenes = [];
                for (let i = 0; i < brn.children.length; i++) {
                    brn.children[i].setAttribute('fill', '#cccccc');
                    allgenes.push(brn.children[i].id);
                }
                var circle = svg().getElementById('CIRCLES');
                var allcircle = [];
                for (let i = 0; i < circle.children.length; i++) {
                    circle.children[i].setAttribute('fill', '#CECECE');
                    circle.children[i].setAttribute('r', '4');
                    allcircle.push(circle.children[i].id);

                }
            }
*/
        


    };

};


