$( document ).ready(function(){
  console.log("DOM listo");

  let scene = new THREE.Scene();
  let camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
  let renderer = new THREE.WebGLRenderer();
  renderer.setSize( window.innerWidth, window.innerHeight );
  $( "body" ).append( renderer.domElement );

  var light = new THREE.PointLight( 0xffffff, 1, 100 );
  light.position.set( 0, 0, 10 );
  scene.add( light );

  let geometry = new THREE.OctahedronGeometry( 3, 5);
  geometry.computeFlatVertexNormals();
  let material = new THREE.MeshLambertMaterial ( {color: 0xe6cb32, flatShading:true } );
  let bola = new THREE.Mesh( geometry, material );

  //console.log( bola );

  scene.add( bola );

  camera.position.z = 8;

let contenedor = new THREE.Object3D();
scene.add( contenedor );

  for( let i = 0; i < bola.geometry.vertices.length; i++ ){
    let geometry = new THREE.SphereGeometry( 0.1, 0.1, 0.1 );
    let material = new THREE.MeshLambertMaterial({ color: 0xe6a432});
    let cubo = new THREE.Mesh( geometry, material );
    cubo.position.set( bola.geometry.vertices[ i ].x, bola.geometry.vertices[ i ].y, bola.geometry.vertices[ i ].z );
    contenedor.add( cubo );
  }





function animate(){
    requestAnimationFrame( animate );

    bola.rotation.x += 0.001;

    for ( let i = 0; i < bola.geometry.vertices.length; i++){
      bola.geometry.vertices [ i ].x += (-0.01 + (Math.random() * 0.02) );
      bola.geometry.vertices [ i ].y += (-0.01 + (Math.random() * 0.02) );
      bola.geometry.vertices [ i ].z += (-0.01 + (Math.random() * 0.02) );
    }
    bola.geometry.verticesNeedUpdate = true;

    for( let i = 0; i < contenedor.children.length; i++ ){
      contenedor.children[ i ]. position.x = bola.geometry.vertices[ i ].x;
      contenedor.children[ i ]. position.y = bola.geometry.vertices[ i ].y;
      contenedor.children[ i ]. position.z = bola.geometry.vertices[ i ].z;
      }
contenedor.rotation.x += 0.001;

    renderer.render( scene, camera );
  }

animate();

});
