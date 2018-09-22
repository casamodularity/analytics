var app;
var change;
var empty;

define( ["jquery","qlik","text!./styles.css"], function ( $,qlik,cssContent ) {
	'use strict';
  app = qlik.currApp();
  $("<style>").html(cssContent).appendTo("head");
	return {
		initialProperties: {
			version: 1.0,
			qHyperCubeDef: {
				qDimensions: [],
				qMeasures: [],
				qInitialDataFetch: [{
					qWidth: 2,
					qHeight: 50
				}]
			}
		},
		//property panel
		definition: {
			type: "items",
			component: "accordion",
			items: {
                addons : {
                    uses : "addons",
                  items:{
                    variablex : {
                            ref : "variablex",
                            label : "Update Variable Name",
                            type : "string",
                            defaultValue : ""
                        },
                     emptyVal : {
                            ref : "emptyVal",
                            label : "default(when empty)",
                            type : "string",
                            defaultValue : "0"
                        }
                  }
                },
				settings: {
					uses: "settings"
				}
			}
		},
		snapshot: {
			canTakeSnapshot: true
		},

		paint: function ( $element, layout ) {
			var self = this, html = "<div>";
             debugger;
            change =  layout.variablex;
            empty  =  layout.emptyVal; 
          
         var xxx = app.variable.getContent('' + change + '');
          
          html += "<input id='SR_IB' class='SRinput' oninput='update()' placeholder='Enter your Value'>";
                    html += "</div>";
			        $element.html( html );
		}
	};

} );

function update(){

  if (document.getElementById('SR_IB').value!=""){
  app.variable.setContent( '' + change + '', '' + document.getElementById('SR_IB').value + '' );
  }else{
    if(! empty){
      app.variable.setContent( '' + change + '', '' + '0' + '' );
    }else{
      app.variable.setContent( '' + change + '', '' + empty + '' );
    }
  
  }
  
}
