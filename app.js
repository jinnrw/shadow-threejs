var camera, scene, renderer, controls, geometry, material, mesh;

init();
animate();

function init() {

  scene = new THREE.Scene();

  camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 10000);
  camera.position.set(400, 700, 700);
  scene.add(camera);

  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap; // or BasicShadowMap
  document.body.appendChild(renderer.domElement);

  controls = new THREE.OrbitControls(camera, renderer.domElement);

  light();
  mesh();
  floor();
}

function mesh() {
  geometry = new THREE.CubeGeometry(30, 30, 30);
  var cubeMaterials = [
    new THREE.MeshPhongMaterial({
      color: 0xff0000,
    }),
    new THREE.MeshPhongMaterial({
      color: 0x00ff00,
    }),
    new THREE.MeshPhongMaterial({
      color: 0x0000ff,
    }),
    new THREE.MeshPhongMaterial({
      color: 0xffff00,
    }),
    new THREE.MeshPhongMaterial({
      color: 0xff00ff,
    }),
    new THREE.MeshPhongMaterial({
      color: 0x00ffff,
    }),
  ];

  mesh = new THREE.Mesh(geometry, cubeMaterials);
  mesh.position.set(0, 30, 0);
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  scene.add(mesh);
}

function light() {
  scene.add(new THREE.AmbientLight(0x666666));

  let light = new THREE.SpotLight(0xffffff);
  light.position.set(-100, 200, -100);

  light.castShadow = true;
  light.shadowMapWidth = 2048;
  light.shadowMapHeight = 2048;

  scene.add(light)
}

function floor() {
  let floor;
  let floor_geo = new THREE.PlaneGeometry(300, 300);
  let floor_mat = new THREE.MeshPhongMaterial({
    color: 0x6C6C6C
  });

  floor = new THREE.Mesh(floor_geo, floor_mat);
  floor.rotation.x = -Math.PI / 2;
  floor.position.set(0, 0, 0);

  floor.receiveShadow = true;

  scene.add(floor);
}

function animate() {
  requestAnimationFrame(animate);
  render();
}

function render() {
  mesh.rotation.x -= Math.PI / 200;   
  mesh.rotation.y -= Math.PI / 200;   
  renderer.render(scene, camera);
}
