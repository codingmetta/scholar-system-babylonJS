
//------------------------------------
  //Verallgemeinert: Minute(n) für einen Umlauf
  const u          = 1;

  const sun_rotation_cycle = -25.38;


  const merkur_rotation_cycle = -87.9;
  const merkur_radius = 1;

  // Venus linksläufig
  const venus_rotation_cycle= 224.7;
  const venus_radius= 2;

  const earth_rotation_cycle  = -365.24;
  const earth_radius = 3;

  const moon_rotation_cycle   = -27.3;

  const mars_rotation_cycle = -686.9;
  const mars_radius = 4.6;
//------------------------------------

// Umlaufzeit
var cycle_time = 60*u;

// Implementierung Babylon.js, Kameraperspektive und Zuweisung der Canvas
var canvas = document.getElementById("renderCanvas");
var engine = new BABYLON.Engine(canvas, true);
var scene = new BABYLON.Scene(engine);
var camera = new BABYLON.ArcRotateCamera("ArcRotateCamera", -Math.PI/2.0, 0*Math.PI, 15 , new BABYLON.Vector3(0, 0, 0), scene);

// Skybox
var skybox = BABYLON.Mesh.CreateBox("skyBox", 100.0, scene);
var skyboxMaterial = new BABYLON.StandardMaterial("skyBox", scene);
skyboxMaterial.backFaceCulling = false;
skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture("img/skybox/skybox", scene);
skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
skyboxMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);
skyboxMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
skyboxMaterial.disableLighting = true;
skybox.material = skyboxMaterial;



//Erstellung der Himmelsobjekte
var sun = BABYLON.Mesh.CreateSphere("Sun", 0, 0.6, scene);
var merkur = BABYLON.Mesh.CreateSphere("Merkur", 0, 0.1, scene);
var venus = BABYLON.Mesh.CreateSphere("Venus", 0, 0.29, scene);
var earth = BABYLON.Mesh.CreateSphere("Earth", 0, 0.3, scene); 
var moon = BABYLON.Mesh.CreateSphere("Moon", 0, 0.08, scene);
var mars = BABYLON.Mesh.CreateSphere("Mars", 0, 0.15, scene);
var dot = BABYLON.Mesh.CreateSphere("dot", 0, 0.03, scene);



//Erstellung und Zuweisung der Materialien

var material1 = new BABYLON.StandardMaterial("default1", scene);
material1.diffuseTexture = new BABYLON.Texture("img/sun.jpg", scene);
material1.specularColor = new BABYLON.Color3(0,0,0);
material1.emissiveColor = new BABYLON.Color3(1,1,1);
material1.diffuseTexture.vScale = -1;
material1.diffuseTexture.uScale = -1;

var material2 = new BABYLON.StandardMaterial("default2", scene);
material2.diffuseTexture = new BABYLON.Texture("img/merkur.jpg", scene);
material2.specularColor = new BABYLON.Color3(0,0,0);
material2.emissiveColor = new BABYLON.Color3(0.6,0.6,0.6);
material2.diffuseTexture.vScale = -1;
material2.diffuseTexture.uScale = -1;

var material3= new BABYLON.StandardMaterial("default3", scene);
material3.diffuseTexture = new BABYLON.Texture("img/venus.jpg", scene);
material3.specularColor = new BABYLON.Color3(0,0,0);
material3.emissiveColor = new BABYLON.Color3(0.3,0.3,0.3);
material3.diffuseTexture.vScale = -1;
material3.diffuseTexture.uScale = -1;

var material4 = new BABYLON.StandardMaterial("default4", scene);
material4.diffuseTexture = new BABYLON.Texture("img/earth.jpg", scene);
material4.specularColor = new BABYLON.Color3(0,0,0);
material4.emissiveColor = new BABYLON.Color3(0.18,0.18,0.18);
material4.diffuseTexture.vScale = -1;
material4.diffuseTexture.uScale = -1;

var material5 = new BABYLON.StandardMaterial("default5", scene);
material5.diffuseTexture = new BABYLON.Texture("img/moon.jpg", scene);
material5.specularColor = new BABYLON.Color3(0,0,0);
material5.emissiveColor = new BABYLON.Color3(0.18,0.18,0.18);
material5.diffuseTexture.vScale = -1;
material5.diffuseTexture.uScale = -1;


var material6= new BABYLON.StandardMaterial("default6", scene);
material6.diffuseTexture = new BABYLON.Texture("img/mars.jpg", scene);
material6.specularColor = new BABYLON.Color3(0,0,0);
material6.emissiveColor = new BABYLON.Color3(0.07,0.07,0.07);
material6.diffuseTexture.vScale = -1;
material6.diffuseTexture.uScale = -1;


var cmat2 = new BABYLON.StandardMaterial("cmat2", scene);
cmat2.emissiveColor = new BABYLON.Color3(0,1,1);
cmat2.diffuseColor = new BABYLON.Color3(0,1,1);


sun.material = material1;
merkur.material = material2;
venus.material = material3;
earth.material = material4;
moon.material = material5;
mars.material = material6;
dot.material = cmat2;



// Erstellung von Licht- und Zeitverhältnissen

var light = new BABYLON.PointLight("dir01", new BABYLON.Vector3(-0.0, -0.0, 0.0), scene);
light.diffuse = new BABYLON.Color3(2.0, 2.0, 2.0);
scene.clearColor = new BABYLON.Color3(0.1,0.1,0.1);

var d = new Date();
var startTime = d.getTime();
var lastTime  = startTime;



// Mondposition in Abhängigkeit der Erdposition 
moon.position.x = earth.position.x - 0.5;
moon.position.y = earth.position.y;
moon.position.z = earth.position.z;



// Anzeige der Umlaufbahnen der Planeten

for (i = 0; i < 2 * Math.PI; i += 0.1) { 

		
	var dotclone_merkur = dot.clone();


	    let x1 = Math.sin(i) * merkur_radius;
	    let y1 = Math.cos(i) * merkur_radius* 1.5;

		dotclone_merkur.position.x = y1;
		dotclone_merkur.position.z = x1;


	var dotclone_venus = dot.clone();

			 x1 = Math.sin(i) * venus_radius;
			 y1 = Math.cos(i) * venus_radius* 1.0;

		dotclone_venus.position.x = y1;
		dotclone_venus.position.z = x1;



	var dotclone_earth = dot.clone();

			 x1 = Math.sin(i) * earth_radius;
			 y1 = Math.cos(i) * earth_radius * 1.5 + 1.7;

		dotclone_earth.position.x = y1;
		dotclone_earth.position.z = x1;



	var dotclone_mars = dot.clone();

			 x1 = Math.sin(i) * mars_radius;
			 y1 = Math.cos(i) * mars_radius* 1.5 + 1.2;

		dotclone_mars.position.x = y1;
		dotclone_mars.position.z = x1;

	}

   



scene.beforeRender = function() {

	var d     = new Date();
	var time  = d.getTime();
    var runtime = time -lastTime;

    // Minimierung von Ungenauigkeiten 
    if (runtime >= cycle_time* 10000) location.reload(); 

	// Sonnenrotation um eigene Achse
	sun.rotation.y =  ((time - lastTime) / 1000) / (cycle_time / sun_rotation_cycle);

// Positionen und Rotationen der Planeten abhängig von der verstrichenen Zeit 

    let merkur_cyc = ((time - lastTime) / 1000) / ((cycle_time) / (2 * Math.PI));
    let x1_merkur = Math.sin(merkur_cyc) * merkur_radius;
    let y1_merkur = Math.cos(merkur_cyc) * merkur_radius* 1.5;

	merkur.position.x = y1_merkur;
	merkur.position.z = x1_merkur;
	merkur.rotation.y = ((time - lastTime) / 1000) / (cycle_time / merkur_rotation_cycle);



    let venus_cyc = ((time - lastTime) / 1000) / ((cycle_time) / (2 * Math.PI)); 
    let x1_venus = Math.sin(venus_cyc) * venus_radius;
    let y1_venus = Math.cos(venus_cyc) * venus_radius;

	venus.position.x = y1_venus;
	venus.position.z = x1_venus;
	venus.rotation.y = ((time - lastTime) / 1000) / (cycle_time / venus_rotation_cycle);



    let earth_cyc = ((time - lastTime) / 1000) / ((cycle_time ) / (2 * Math.PI));
    let x1_earth = Math.sin(earth_cyc) * earth_radius;
    let y1_earth = Math.cos(earth_cyc) * earth_radius * 1.5 + 1.7; //Position im Brennpunkt der Ellipse

	earth.position.x = y1_earth;
	earth.position.z = x1_earth;
	//earth.rotation.y = ((time - lastTime) / 1000) / (cycle_time / earth_rotation_cycle);
	earth.rotation.y = ((2*Math.PI)*((time - lastTime) / 1000) / (cycle_time / (earth_rotation_cycle)));

	console.log((earth.rotation.y)/(2*Math.PI));
	console.log((time-lastTime)/1000);


 
		let moon_cyc = ((time - lastTime) / 1000) / (((cycle_time / (earth_rotation_cycle / moon_rotation_cycle)) / 2) / Math.PI);

		moon.position.x = y1_earth + Math.sin(moon_cyc) * 0.3;
		moon.position.z = x1_earth + Math.cos(moon_cyc) * 0.3;
		moon.rotation.y = ((time - lastTime) / 1000) / ((cycle_time / (earth_rotation_cycle / moon_rotation_cycle)) / (2 * Math.PI));

 

	let mars_cyc = ((time - lastTime) / 1000) / ((cycle_time) / ( 2 * Math.PI));  
	let x1_mars = Math.sin(mars_cyc) * mars_radius;
	let y1_mars = Math.cos(mars_cyc) * mars_radius * 1.5 + 1.2;

	mars.position.x = y1_mars;
	mars.position.z = x1_mars;
	mars.rotation.y = ((time - lastTime) / 1000) / (cycle_time / mars_rotation_cycle);

};



scene.activeCamera.attachControl(canvas);

var renderLoop = function () {
  engine.beginFrame();
  scene.render();
  engine.endFrame();
  BABYLON.Tools.QueueNewFrame(renderLoop);
};

  BABYLON.Tools.QueueNewFrame(renderLoop);

window.addEventListener("resize", function () {
  engine.resize();
});
