let speed=0.007;
let spoke_num = 60;
let r = 70; //support radius
let l = r*1.2; // rod length
//let xoo = 250;
//let yoo = 250;

let xo = new Array();
let yo = new Array();
let angle = new Array();
let TWO_PI = 2*Math.PI;
let alpha = 20;

let viz = function(p) {
	p.setup = function () {

		p.createCanvas(500, 500, p.WEBGL);
		//console.log("setup started");
		p.frameRate(60);
	}
	
	p.draw = function() {
		p.background(0);
		//translate(xoo, yoo, 0);
		
		spoke_num = num_slider.value();
		speed = speed_slider.value()/1000;
		alpha = alpha_slider.value();
		
		for (n=0; n < spoke_num; n++) {
			xo[n] = r*Math.cos(n*TWO_PI/spoke_num)
			yo[n] = r*Math.sin(n*TWO_PI/spoke_num)
			angle[n] = n*TWO_PI/spoke_num
		}
		
		p.strokeWeight(1);
		p.stroke(168);
		p.noFill();
		p.arc(0, 0, r*2, r*2, 0, TWO_PI);
		
		
		for(n=0; n < spoke_num; n++) {
			p.push();

			p.translate(xo[n], yo[n]);
			
			z_rot = angle[n] * (3 + p.frameCount * speed);
			p.rotateZ(z_rot);
			
			if (color_radio.value() == 'color') {
				c = Math.sin(z_rot);
				i = c * 255;
				red = Math.round(Math.sin(0.024 * i + 0) * 127 + 128);
				green = Math.round(Math.sin(0.024 * i + 2) * 127 + 128);
				blue = Math.round(Math.sin(0.024 * i + 4) * 127 + 128);
				p.stroke(red, green, blue, alpha);
			}
			if (color_radio.value() == 'no color') {
				p.stroke(168, alpha);
			}
			
			p.line(l*Math.cos(angle[n]), l*Math.sin(angle[n]), 0, -l*Math.cos(angle[n]), -l*Math.sin(angle[n]), 0);
			
			p.pop();
		
		}
	}

};

let control1 = function(p) {
	p.setup = function() {
		
		p.createCanvas(300,150);
		
		num_slider = p.createSlider(1, 1000, 100, 1);
		num_slider.position(50, 20, 'absolute');
		
		speed_slider = p.createSlider(0, 10, 7, 0);
		speed_slider.position(50, 50, 'absolute');
		
		alpha_slider = p.createSlider(0, 255, 40, 0);
		alpha_slider.position(50, 80, 'absolute');
		
		p.text('num_spokes', num_slider.x*2 + num_slider.width, 35);
		p.text('speed', speed_slider.x*2 + speed_slider.width, 65);
		p.text('alpha', alpha_slider.x*2 + alpha_slider.width, 95);
		
		color_radio = p.createRadio();
		color_radio.option('color');
		color_radio.option('no color');
		color_radio.style('width', '200px');
		color_radio.style('float', 'right');
		color_radio.style('font-size', '12px');
		color_radio.style('font-family', 'sans-serif');
		color_radio.position(num_slider.x*2 + num_slider.width + 150, 50);
		
		color_radio._getInputChildrenArray()[1].checked = true;
	}
	p.draw = function() {
		//p.background(255, 0, 0);

		

	}
};


let v = new p5(viz, 'visualization');
let c1 = new p5(control1, 'controls1');
