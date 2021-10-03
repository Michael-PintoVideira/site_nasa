import logo from './logo.svg';
import './App.css';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three-orbitcontrols-ts'

class first_page extends Component{
  componentDidMount(){
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
      const renderer = new THREE.WebGL1Renderer({
        canvas: document.querySelector('#bg'),
      });

      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setSize(window.innerWidth, window.innerHeight);
      camera.position.setZ(30);


      //const geometry = new THREE.TorusGeometry(10, 3, 16, 100)
      //const material = new THREE.MeshStandardMaterial({color: 0xFF6347});
      //const earth = new THREE.Mesh(geometry, material);


      const earthTexture = new THREE.TextureLoader().load('test.jpg')
      const earth = new THREE.Mesh(
        new THREE.SphereGeometry(10, 32, 32),
        new THREE.MeshBasicMaterial({
            map: earthTexture,
          }
        )
      )



      const pointLight = new THREE.PointLight(0xFF6347)
      const AmbientLight = new THREE.AmbientLight(0xFF6347)
      pointLight.position.set(20,20,20)
      scene.add(pointLight)
      scene.add(AmbientLight)
      scene.add(earth)


      //helper

      //const lightHelper = new THREE.PointLightHelper(pointLight);
      //const gridHelper = new THREE.GridHelper(200, 50);
      //scene.add(lightHelper, gridHelper);

      const constrols = new OrbitControls(camera, renderer.domElement);
      constrols.update();

      function addStar(){
        const geometry = new THREE.SphereGeometry(0.25, 24, 24);
        const material = new THREE.MeshBasicMaterial( {color : 0xffffff});
        const star = new THREE.Mesh(geometry, material);

        const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100) ); 
        star.position.set(x, y, z);
        scene.add(star)
      }

      Array(200).fill().forEach(addStar)
      const spaceTexture = new THREE.TextureLoader().load('space.jpg')
      scene.background = spaceTexture;

      const moonTexture = new THREE.TextureLoader().load('moon.jpg')
      const normalTexture = new THREE.TextureLoader().load('normal.jpg')
      const moon = new THREE.Mesh(
        new THREE.SphereGeometry(3, 32, 32),
        new THREE.MeshBasicMaterial({
            map: moonTexture,
            normalmap: normalTexture
          }
        )
      )

      moon.position.z = 30
      moon.position.setX(-10)


      function moveCamera() {
        const t = document.body.getBoundingClientRect().top;
        moon.rotation.x += 0.05;
        moon.rotation.y += 0.075;
        moon.rotation.z += 0.05;


        camera.position.z = t * -0.01;
        camera.position.x = t * -0.0002;
        camera.position.y = t * -0.0002;

      }

      //document.body.onscroll = moveCamera

      scene.add(moon)



      function animate(){
        requestAnimationFrame(animate);
        //earth.rotation.x += 0.01;
        earth.rotation.y += 0.005;
        //earth.rotation.z += 0.01;

        constrols.update();
        renderer.render(scene, camera);
      }
      animate()
    }

    render(){
      return(
        <div className="first_page">
          <div className="search-box">
             <button class="btn-search"><i class="fas fa-search"></i></button>
             <input type="text" class="input-search" placeholder="Type to Search..."></input>
          </div>
          <canvas id="bg"></canvas>
        </div>
      )
    }
  }

export default first_page;
