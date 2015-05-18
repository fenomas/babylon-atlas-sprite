// globals BABYLON


// set up standard sort of scene
var vec3 = BABYLON.Vector3
var cv = document.getElementById('canvas')
var engine = new BABYLON.Engine(cv)
var scene =  new BABYLON.Scene(engine)
scene.clearColor = new BABYLON.Color3(0.8, 0.85, 0.9)
var camera = new BABYLON.ArcRotateCamera('camera', -1, 1.2, 6, new vec3(0,1,0), scene)
var light = new BABYLON.HemisphericLight('light', new vec3(0.1,1,0.3), scene )
camera.attachControl(cv)
var plane = BABYLON.Mesh.CreateGround('ground', 5, 5, 1, scene)


// load atlas and create a sprite
var AtlasSprite = require('../')
var sprite = new AtlasSprite('sprites.png', 'sprites.json', scene, BABYLON)


// access 'mesh' property for the usual babylon properties
sprite.mesh.position.y = 1.2
sprite.mesh.scaling.x = 1.5
sprite.mesh.scaling.y = 2


// in this demo sprites need full alpha - not true of all textures
sprite.material.opacityTexture = sprite.material.diffuseTexture


// cycle through frames
var num = 0
setInterval(function() {
  if (!sprite.frames.length) return // json not loaded yet
  num = (num+1) % sprite.frames.length
  sprite.setFrame( sprite.frames[num] )
  // or just: sprite.setFrame( num )
}, 500)



// render
function render() {
  scene.render()
  requestAnimationFrame(render)
}
render()
