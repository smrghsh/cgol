import * as THREE from 'three'
import Experience from '../Experience.js'
import Environment from './Environment.js'
import Sim from './Sim.js'

export default class World
{
    constructor()
    {
        this.experience = new Experience()
        this.sizes = this.experience.sizes
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        this.sim = new Sim(50,50)
        // Wait for resources
        this.resources.on('ready', () =>
        {
            // Setup
            console.log('resources ready')
            this.environment = new Environment()
        })
        this.sim.randomize()
        this.sim.updateMeshes()
    }
    update() {

        
    }
}