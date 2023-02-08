import * as THREE from 'three'
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { GUI } from "three/addons/libs/lil-gui.module.min.js";
import * as TWEEN from '@tweenjs/tween.js'
const axis = "X";
const alt = 1;
//Clase con Parametros para el Cubo, Cantidad de Cubos, Eje de Construccion
class Params {
    constructor() {
        this.cube_num = 0;
        this.height = 0;
        this.axis_x = false;
        this.axis_y = false;
        this.axis_z = false;
    }
}
const params = new Params();

function main() {
    // Scene
    const scene = new THREE.Scene();
    // Camera
    const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.z = 100; // Set camera position
    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setClearColor("#233143"); // Set background colour
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement); // Add renderer to HTML as a canvas element
    // Make Canvas Responsive
    window.addEventListener('resize', () => {
        renderer.setSize(window.innerWidth, window.innerHeight); // Update size
        camera.aspect = window.innerWidth / window.innerHeight; // Update aspect ratio
        camera.updateProjectionMatrix(); // Apply changes
    })

    // CUBE CREATION, creamos el Stack de Cubos
    function parametros(cube_num, axis_x, axis_y, axis_z) {
        var cube = new THREE.Group();
        var stack = new THREE.Group();
        cube = create_cube();
        setTimeout(function() {
            if (axis_x == true) {
                for (let i = 0; i < cube_num; i++) {
                    cube = create_cube();
                    stack.add(cube);
                    scene.add(cube.translateX(i));
                }
            }
            if (axis_y == true) {
                for (let i = 0; i < cube_num; i++) {
                    cube = create_cube();
                    stack.add(cube);
                    scene.add(cube.translateY(i));
                }
            }

            if (axis_z == true) {
                for (let i = 0; i < cube_num; i++) {
                    cube = create_cube();
                    stack.add(cube);
                    scene.add(cube.translateZ(i));
                }
            }
        }, 2000);
    };

    function create_cube() {
        //FUNCION QUE PERMITE CREAR EL CUBO CARA POR CARA
        var geometry1 = new THREE.BufferGeometry();
        var geometry2 = new THREE.BufferGeometry();
        var geometry3 = new THREE.BufferGeometry();
        var geometry4 = new THREE.BufferGeometry();
        var geometry5 = new THREE.BufferGeometry();
        var geometry6 = new THREE.BufferGeometry();

        // create a simple square shape. We duplicate the top left and bottom right
        // vertices because each vertex needs to appear once per triangle.
        const vertices = new Float32Array([
            0.0, 0.0, 0.0,
            1.0, 0.0, 0.0,
            0.0, 1.0, 0.0,

            1.0, 0.0, 0.0,
            1.0, 1.0, 0.0,
            0.0, 1.0, 0.0

        ]);
        //side 1
        geometry1.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
        const material1 = new THREE.MeshBasicMaterial({ color: 'yellow' });
        material1.side = THREE.DoubleSide;
        var mesh1 = new THREE.Mesh(geometry1, material1);
        mesh1.matrixAutoUpdate = true;


        //side 2
        geometry2.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
        const material2 = new THREE.MeshBasicMaterial({ color: 'white' });
        material2.side = THREE.DoubleSide;
        var mesh2 = new THREE.Mesh(geometry2, material2);
        mesh2.matrixAutoUpdate = true;
        tw_rotate_X(mesh2, mesh2.position.x, mesh2.position.y, mesh2.position.z, mesh2.rotation.x, mesh2.rotation.y, Math.PI / 2, 300);


        //side 3
        geometry3.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
        const material3 = new THREE.MeshBasicMaterial({ color: 'green' });
        material3.side = THREE.DoubleSide;
        var mesh3 = new THREE.Mesh(geometry3, material3);
        mesh3.matrixAutoUpdate = true;
        mesh3.matrix = mesh2.matrix;
        tw_rotate_Y(mesh3, mesh3.position.x, mesh3.position.y, mesh3.position.z, Math.PI / 2, mesh3.rotation.y, Math.PI / 2, 2500);


        //side 4
        geometry4.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
        const material4 = new THREE.MeshBasicMaterial({ color: 'white' });
        material4.side = THREE.DoubleSide;
        var mesh4 = new THREE.Mesh(geometry4, material4);
        var pos_x = 0;
        var pos_y = 0;
        var pos_z = 0;
        var rot_x = 0;
        var rot_y = 0;
        mesh4.matrixAutoUpdate = false;
        mesh4.translateY(1);
        pos_x = mesh4.position.x;
        pos_y = mesh4.position.y;
        pos_z = mesh4.position.z;
        rot_x = mesh4.rotation.x;
        rot_y = mesh4.rotation.y;
        setTimeout(function() {
            tw_rotate_X(mesh4, pos_x, pos_y, pos_z, rot_x, rot_y, Math.PI / 2, 300);
            mesh4.matrixAutoUpdate = true;
        }, 6000);


        //side 5
        geometry5.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
        const material5 = new THREE.MeshBasicMaterial({ color: 'green' });
        material5.side = THREE.DoubleSide;
        var mesh5 = new THREE.Mesh(geometry5, material5);
        mesh5.matrix = mesh4.matrix;
        mesh4.matrixAutoUpdate = false;
        var pos_x_5 = 0;
        var pos_y_5 = 0;
        var pos_z_5 = 0;
        var rot_x_5 = 0;
        var rot_y_5 = 0;
        mesh5.matrixAutoUpdate = false;
        mesh5.translateX(1);
        pos_x_5 = mesh5.position.x;
        pos_y_5 = mesh5.position.y;
        pos_z_5 = mesh5.position.z;
        rot_x_5 = mesh5.rotation.x;
        rot_y_5 = mesh5.rotation.y;
        setTimeout(function() {
            tw_rotate_Y(mesh5, pos_x_5, pos_y_5, pos_z_5, rot_x_5, rot_y_5, -Math.PI / 2, 400);
            mesh5.matrixAutoUpdate = true;

        }, 9500);


        //side 6
        geometry6.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
        const material6 = new THREE.MeshBasicMaterial({ color: 'yellow' });
        material6.side = THREE.DoubleSide;
        var mesh6 = new THREE.Mesh(geometry6, material6);
        var pos_z_f = 0;
        pos_z_f = mesh6.position.z;
        pos_z_f = pos_z_f + 1;
        setTimeout(function() {
            translate_Z(mesh6, mesh6.position.x, mesh6.position.y, mesh6.position.z, pos_z_f, 1000);
        }, 11000);


        var cube = new THREE.Group();
        cube.add(mesh1);
        cube.add(mesh2);
        cube.add(mesh3);
        cube.add(mesh4);
        cube.add(mesh5);
        cube.add(mesh6);
        return cube;
    };





    function tw_rotate_X(mesh, pos_x, pos_y, pos_z, angle_iX, angleiY, angle_fX, t_delay) {
        //FUNCION QUE PERMITE ROTAR UNA CARA DEL CUBO angle_fX ANGULOS EN EL EJE X
        try {
            var tween = new TWEEN.Tween({ x: pos_x, y: pos_y, z: pos_z, xRotation: angle_iX, yRotation: angleiY })
                .to({ x: mesh.position.x, y: mesh.position.y, z: mesh.position.z, xRotation: angle_fX, yRotation: angleiY }, 2000)
                .onUpdate((coords) => {
                    mesh.position.x = coords.x;
                    mesh.position.y = coords.y;
                    mesh.position.z = coords.z;
                    mesh.rotation.x = coords.xRotation;
                    mesh.rotation.y = coords.yRotation;

                })
                .repeat(0)
                .delay(t_delay);
            tween.start();
        } catch (error) {
            console.error(error);
        }
    };

    function tw_rotate_Y(mesh, pos_x, pos_y, pos_z, angle_iX, angleiY, angle_fY, t_delay) {
        //FUNCION QUE PERMITE ROTAR UNA CARA DEL CUBO angle_fY ANGULOS EN EL EJE Y
        try {
            var tween = new TWEEN.Tween({ x: pos_x, y: pos_y, z: pos_z, xRotation: angle_iX, yRotation: angleiY })
                .to({ x: mesh.position.x, y: mesh.position.y, z: mesh.position.z, xRotation: angle_iX, yRotation: angle_fY }, 2000)
                .onUpdate((coords) => {
                    mesh.position.x = coords.x;
                    mesh.position.y = coords.y;
                    mesh.position.z = coords.z;
                    mesh.rotation.x = coords.xRotation;
                    mesh.rotation.y = coords.yRotation;

                })
                .repeat(0)
                .delay(t_delay);
            tween.start();
        } catch (error) {
            console.error(error);
        }
    };

    function translate_Z(mesh, pos_x, pos_y, pos_z, pos_z_f, t_delay) {
        //FUNCION QUE PERMITE TRANSLADAR UNA CARA DEL CUBO 1 UNIDAD EN EL EJE Z
        try {
            var tween = new TWEEN.Tween({ x: pos_x, y: pos_y, z: pos_z })
                .to({ x: pos_x, y: pos_y, z: pos_z_f }, 100)
                .onUpdate((coords) => {
                    mesh.position.x = coords.x;
                    mesh.position.y = coords.y;
                    mesh.position.z = coords.z;
                })
                .repeat(0)
                .delay(t_delay);
            tween.start();
        } catch (error) {
            console.error(error);
        }
    };

    function translate_Y(mesh) {
        //FUNCION QUE PERMITE TRANSLADAR UNA CARA DEL CUBO 1 UNIDAD EN EL EJE Y
        try {
            var tween = new TWEEN.Tween({ x: mesh.position.y, y: mesh.position.y, z: mesh.position.y })
                .to({ x: mesh.position.x, y: mesh.translateY(1), z: mesh.position.z }, 2000)
                .onUpdate((coords) => {
                    mesh.position.x = coords.x;
                    mesh.position.y = coords.y;
                    mesh.position.z = coords.z;
                })
                .repeat(0)
                .delay(t_delay);
            tween.start();
        } catch (error) {
            console.error(error);
        }
    };

    const controls = new OrbitControls(camera, renderer.domElement);
    // Axes Helper
    const axesHelper = new THREE.AxesHelper(5);
    scene.add(axesHelper); // X axis = red, Y axis = green, Z axis = blue
    // Trigonometry Constants for Orbital Paths 
    let theta = 0; // Current angle
    // Angle increment on each render
    const dTheta = 2 * Math.PI / 100;
    // Rendering Function

    const sphere = new THREE.SphereGeometry(0.5, 16, 8);

    //lights
    let light1, light2;

    light1 = new THREE.PointLight(0xff0040, 2, 50);
    light1.add(new THREE.Mesh(sphere, new THREE.MeshBasicMaterial({ color: 0xff0040 })));
    scene.add(light1);

    light2 = new THREE.PointLight(0x80ff80, 2, 50);
    light2.add(new THREE.Mesh(sphere, new THREE.MeshBasicMaterial({ color: 0x80ff80 })));
    scene.add(light2);

    let gui = new GUI();
    const axisFolder = gui.addFolder("Axis")
    axisFolder.add(params, "axis_x").name("Axis_X").listen();
    axisFolder.add(params, "axis_y").name("Axis_Y").listen();
    axisFolder.add(params, "axis_z").name("Axis_Z").listen();
    const cubeFolder = gui.addFolder("CubesNum");
    cubeFolder
        .add(params, "cube_num", 0, 20, 1)
        .listen()
        .onChange(function() {
            parametros(params.cube_num, params.axis_x, params.axis_y, params.axis_z);
            params.height = params.cube_num * alt;
        });

    const rendering = function() {
        // Rerender every time the page refreshes (pause when on another tab)
        requestAnimationFrame(rendering);
        //Increment theta, and update sphere coords based off new value        
        theta += dTheta;
        // Store trig functions for sphere orbits 
        // MUST BE INSIDE RENDERING FUNCTION OR THETA VALUES ONLY GET SET ONCE

        const trigs = [
            { x: Math.cos(theta * 1.05), y: Math.sin(theta * 1.05), z: Math.cos(theta * 1.05), r: params.height + 0.25 },
            { x: Math.cos(theta * 0.8), y: Math.sin(theta * 0.8), z: Math.sin(theta * 0.8), r: params.height + 0.5 },
            { x: Math.cos(theta * 1.25), y: Math.cos(theta * 1.25), z: Math.sin(theta * 1.25), r: params.height + 0.75 },
            { x: Math.sin(theta * 0.6), y: Math.cos(theta * 0.6), z: Math.sin(theta * 0), r: params.height + 1 }
        ];

        light1.position.x = trigs[0]['r'] * trigs[0]['x'];
        light1.position.y = trigs[0]['r'] * trigs[0]['y'];
        light1.position.z = trigs[0]['r'] * trigs[0]['z'];
        light2.position.x = trigs[1]['r'] * trigs[1]['x'];
        light2.position.y = trigs[1]['r'] * trigs[1]['y'];
        light2.position.z = trigs[1]['r'] * trigs[1]['z'];
        renderer.render(scene, camera);
    }

    function animate() {
        requestAnimationFrame(animate);

        controls.update();

        TWEEN.update();

        renderer.render(scene, camera);

    }


    rendering();

    animate();
};
main();