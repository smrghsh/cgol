import * as THREE from 'three'
import Debug from './Utils/Debug.js'
import Sizes from "./Utils/Sizes.js"
import Time from './Utils/Time.js'
import Resources from './Utils/Resources.js'
import Camera from './Camera.js'
import Renderer from './Renderer.js'
import World from './World/World.js'

import sources from './sources.js'


let instance = null

export default class Experience
{
    constructor(canvas){
        if (instance){
            return instance
        }
        instance = this
        // Global access
        window.experience = this
        this.canvas = canvas
        this.debug = new Debug()
        this.play = true
        this.speed = 4
        this.clickSound = new Audio('/sounds/click.wav')
        if(this.debug.active)
        {
            this.debugFolder = this.debug.ui.addFolder('experience')
            const debugObject = {
                play: this.play,
                speed: this.speed
            }
            this.debugFolder.add(debugObject, 'play').onChange( value =>{this.play = value})
            this.debugFolder.add(debugObject, 'speed').min(0.5).max(15).onChange( value =>{this.speed = value})
            // removed for demo
            // this.debugFolder.add(debugObject, 'back')
        }
        this.sizes = new Sizes()
        this.time = new Time()
        this.lastUpdated = this.time.current
        this.scene = new THREE.Scene()
        this.resources = new Resources(sources)
        this.world = new World()
        this.camera = new Camera()
        this.renderer = new Renderer()
        this.raycaster = new THREE.Raycaster()
        this.mouse = new THREE.Vector2()
        this.INTERSECTED = null
        window.addEventListener('mousemove', (event) =>
        {
            this.mouse.x = event.clientX / this.sizes.width * 2 - 1
            this.mouse.y = - (event.clientY / this.sizes.height) * 2 + 1
        })
        window.addEventListener('click', () =>
        {
            if(this.INTERSECTED)
            {
                this.world.sim.toggleCell(this.INTERSECTED.r,this.INTERSECTED.c)
                this.world.sim.updateMeshes()
                this.clickSound.play()
            }
        })
        this.sizes.on('resize', ()=>
        {
            this.resize()
            this.camera.resize()
            this.renderer.resize()
        })
        this.time.on('tick', ()=>
        {
            this.update()
        })
    }

    resize()
    {
        console.log('resized occured')
        this.camera.resize()
    }
    update()
    {
        this.camera.update()
        this.renderer.update()
        this.world.update()
        //https://github.com/mrdoob/three.js/blob/master/examples/webgl_interactive_cubes.html
        this.raycaster.setFromCamera( this.mouse, this.camera.instance );
        // console.log(this.mouse)
        const intersects = this.raycaster.intersectObjects( this.world.sim.meshes.children, false );
        if ( intersects.length > 0 ) {
            if ( this.INTERSECTED != intersects[ 0 ].object ) {
                if ( this.INTERSECTED ) this.INTERSECTED.material.color.setHex( this.INTERSECTED.currentHex );
                this.INTERSECTED = intersects[ 0 ].object;
                this.INTERSECTED.currentHex = this.INTERSECTED.material.color.getHex();
                this.INTERSECTED.material.color.setHex( 0xff0000 );

            }
        } else {

            if ( this.INTERSECTED ) this.INTERSECTED.material.color.setHex( this.INTERSECTED.currentHex );

            this.INTERSECTED = null;

        }

        if (this.play){
            // console.log(this.play
            if(this.time.current > (this.lastUpdated + (1000/this.speed))){
                this.world.sim.step()
                this.world.sim.updateMeshes()
                this.lastUpdated = this.time.current
            }
        }
    }
    destroy()
    {
        this.sizes.off('resize')
        this.time.off('tick')

        // Traverse the whole scene
        this.scene.traverse((child) =>
        {
            // Test if it's a mesh
            if(child instanceof THREE.Mesh)
            {
                child.geometry.dispose()

                // Loop through the material properties
                for(const key in child.material)
                {
                    const value = child.material[key]

                    // Test if there is a dispose function
                    if(value && typeof value.dispose === 'function')
                    {
                        value.dispose()
                    }
                }
            }
        })
        this.camera.controls.dispose()
        this.renderer.instance.dispose()
        if(this.debug.active)
        {
            this.debug.ui.destroy()
        }
            
    }
}