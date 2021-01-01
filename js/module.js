import * as THREE from '/js/three/build/three.module.js';
export function load3d() {
    
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera( 20, window.innerWidth / window.innerHeight, 0.1, 1000 );

    const renderer = new THREE.WebGLRenderer({alpha: true, antialias: true});
    renderer.domElement.setAttribute("id", "Canva3d");
    renderer.setSize( window.innerWidth - 50, window.innerHeight-50 );
    document.body.appendChild( renderer.domElement );

    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
    const cube = new THREE.Mesh( geometry, material );
    scene.add( cube );

    camera.position.z = 5;
    const animate = function () {
        requestAnimationFrame( animate );
        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;
        renderer.render( scene, camera );
    };

    animate();  
    
}

    
import { OBJLoader } from '/js/three/examples/jsm/loaders/OBJLoader.js';
export function load3d2(){

    let container;

    let camera, scene, renderer;

    let mouseX = 0, mouseY = 0;

    let windowHalfX = window.innerWidth / 2;
    let windowHalfY = window.innerHeight / 2;

    let object;

    init();
    animate();


    function init() {        
        //container = document.createElement( 'div' );
        
        //document.body.appendChild( container );

        camera = new THREE.PerspectiveCamera( 4, window.innerWidth / window.innerHeight, 1, 1000 );
       
        // scene

        scene = new THREE.Scene();

        const ambientLight = new THREE.AmbientLight( 0xcccccc, 0.4 );
        scene.add( ambientLight );

        const pointLight = new THREE.PointLight( 0xffffff, 0.8 );
        camera.add( pointLight );
        scene.add( camera );

        // manager

        function loadModel() {
            object.traverse( function ( child ) {
                if ( child.isMesh ) child.material.map = texture;
            } );
            scene.add( object );
                
            camera.position.x = 0.010;
            camera.position.y = 2.5;
            camera.position.z = 1;
        }

        const manager = new THREE.LoadingManager( loadModel );

        manager.onProgress = function ( item, loaded, total ) {
            console.log( item, loaded, total );
        };

        // texture

        const textureLoader = new THREE.TextureLoader( manager );
        const texture = textureLoader.load( 'model/earth_atmos_2048.jpg' );

        // model

        function onProgress( xhr ) {
            if ( xhr.lengthComputable ) {
                const percentComplete = xhr.loaded / xhr.total * 100;
                console.log( 'model ' + Math.round( percentComplete, 2 ) + '% downloaded' );
            }
        }

        function onError() {}

        const loader = new OBJLoader( manager );
        loader.load( 'model/iphone_6_model.obj', function ( obj ) {
            object = obj;
        }, onProgress, onError );

        renderer = new THREE.WebGLRenderer({alpha: true, antialias: true});
        renderer.setPixelRatio( window.devicePixelRatio );
        renderer.setSize( window.innerWidth -50, window.innerHeight -50 );
        renderer.domElement.setAttribute("id", "Canva3d");
        document.body.appendChild( renderer.domElement );
        //container.appendChild( renderer.domElement );

        document.addEventListener( 'mousemove', onDocumentMouseMove, false );

        window.addEventListener( 'resize', onWindowResize, false );

    }

    function onWindowResize() {
        windowHalfX = window.innerWidth / 2;
        windowHalfY = window.innerHeight / 2;
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize( window.innerWidth -50, window.innerHeight - 50);
    }

    function onDocumentMouseMove( event ) {
        mouseX = ( event.clientX - windowHalfX ) / 2;
        mouseY = ( event.clientY - windowHalfY ) / 2;
        
        console.log("x " + camera.position.x);
        console.log("y " + camera.position.y);
        console.log("z " + camera.position.z);
    }

    //

    function animate() {
        requestAnimationFrame( animate );
        render();
    }

    function render() {
       // camera.position.x += ( mouseX - camera.position.x ) * .05;
        //camera.position.y += ( - mouseY - camera.position.y ) * .05;
        object.rotation.x += 0.01;
        object.rotation.y -= 0.01;
        console.log(object.rotation);
        camera.lookAt( scene.position );
        renderer.render( scene, camera );
    }
}