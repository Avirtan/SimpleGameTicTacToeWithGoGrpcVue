import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";
import Stats from "three/examples/jsm/libs/stats.module";

export class Game {
    scene = undefined;
    renderer = undefined;
    controls = undefined;
    camera = undefined;
    stats = undefined;
    raycaster = undefined;
    mouse = undefined;
    fields = [];
    side = "o";
    fieldX = undefined;
    fieldO = undefined;
    start = false;
    init() {
        this.raycaster = new THREE.Raycaster();
        this.mouse = new THREE.Vector2();
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        );
        this.camera.position.z = 5;
        this.camera.position.y = 1;
        const ambientLight = new THREE.AmbientLight();
        this.scene.add(ambientLight);

        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(this.renderer.domElement);
        this.generateGameFields();
        //window.addEventListener("resize", this.onWindowResize(), false);
        // window.addEventListener(
        //     "click",
        //     (event) => this.onMouseClick(event),
        //     false
        // );
        //this.fontLoad();
    }
    setSide(side) {
        this.side = side;
    }
    enableControls() {
        this.controls = new OrbitControls(
            this.camera,
            this.renderer.domElement
        );
        this.controls.enableDamping = true;
        this.controls.target.set(0, 1, 0);
    }
    enableAxes() {
        this.scene.add(new THREE.AxesHelper(20));
    }
    enabeleStats() {
        this.stats = Stats();
        document.body.appendChild(this.stats.dom);
    }
    enableGridHealp() {
        var grid = new THREE.GridHelper(1000, 1000);
        this.scene.add(grid);
    }
    setStart(strat) {
        this.start = strat;
    }
    render() {
        this.renderer.render(this.scene, this.camera);
    }
    generateGameFields() {
        var x = -1;
        var y = -1;
        for (var i = -2; i < 1; i++) {
            y = -1;
            for (var j = -2; j < 1; j++) {
                const geometry = new THREE.BoxGeometry();

                const material = new THREE.MeshBasicMaterial({
                    color: this.getRandomColor(),
                });
                const cube = new THREE.Mesh(geometry, material);
                cube.position.set(x, y, 0);
                cube.name = "cube" + x + j;
                this.scene.add(cube);
                this.fields.push(cube);
                y += 1.5;
            }
            x += 1.5;
        }
        y += 1.5;
    }
    animate() {
        requestAnimationFrame(() => this.animate());
        if (this.controls) {
            this.controls.update();
        }
        this.render();
        this.stats.update();
    }
    getRandomColor() {
        var letters = "0123456789ABCDEF";
        var color = "#";
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }
    fontLoad(path) {
        var loader = new FontLoader();
        loader.load(path, (font) => {
            this.fieldX = new TextGeometry("x", {
                font: font,
                size: 1,
                height: 0.1,
            });
            this.fieldO = new TextGeometry("o", {
                font: font,
                size: 1,
                height: 0.1,
            });
        });
    }
    onMouseClick(event) {
        this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
        this.raycaster.setFromCamera(this.mouse, this.camera);
        const intersects = this.raycaster.intersectObjects(this.scene.children);
        if (intersects.length > 0 && intersects[0].object.name != "h") {
            intersects[0].object.material.color.set(this.getRandomColor());
            var cube = intersects[0].object;
            var textMesh = new THREE.Mesh(
                this.side == "o" ? this.fieldO : this.fieldX,
                new THREE.MeshPhongMaterial({ color: this.getRandomColor() })
            );
            textMesh.position.x = cube.position.x - 0.4;
            textMesh.position.y = cube.position.y - 0.5;
            textMesh.name = "h";
            const object = this.scene.getObjectById(cube.id, true);
            object.geometry.dispose();
            object.material.dispose();
            this.scene.remove(object);
            this.scene.add(textMesh);
            return cube.id;
        }
        return false
    }
    setEnemyField(pos) {
        pos = parseInt(pos);
        const object = this.scene.getObjectById(pos, true);
        var textMesh = new THREE.Mesh(
            this.side == "o" ? this.fieldX : this.fieldO,
            new THREE.MeshPhongMaterial({ color: this.getRandomColor() })
        );
        textMesh.position.x = object.position.x - 0.4;
        textMesh.position.y = object.position.y - 0.5;
        textMesh.name = "h";
        object.geometry.dispose();
        object.material.dispose();
        this.scene.remove(object);
        this.scene.add(textMesh);
    }
    onWindowResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.render();
        //console.log("resize")
    }
}
