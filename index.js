
module.exports = AtlasSprite

var loader = require('load-json-xhr')




// atlas keeps the reference to the texture object and json data

function AtlasSprite(imgURL, jsonURL, scene, BAB, noMip, sampling) {
  if (!this instanceof AtlasSprite) {
    return new AtlasSprite(imgURL, jsonURL, scene, BAB, noMip, sampling)
  }

  var self = this
  this._data = null
  this._texReady = false

  this._pending = true
  this.frames = []
  this.currentFrame = ''
  this._pendingFrame = ''

  // json loading
  loader(jsonURL, function(err, data) {
    if (err) throw err
    self._data = data
    if (self._texReady) initSelf(self);
  })

  // texture loader and event
  this.texture = new BAB.Texture(imgURL, scene, noMip, true, sampling, function() {
    self._texReady = true
    if (self._data) initSelf(self);
  })
  // atlas will typically need alpha
  this.texture.hasAlpha = true

  // material and mesh setup
  var mat = new BAB.StandardMaterial('spriteMat', scene)
  mat.specularColor = new BAB.Color3(0,0,0)
  mat.emissiveColor = new BAB.Color3(1,1,1)
  mat.backFaceCulling = false
  mat.diffuseTexture = this.texture
  this.material = mat

  // plane mesh
  var mesh = BAB.Mesh.CreatePlane('spriteMesh', 1, scene)
  mesh.material = mat
  this.mesh = mesh
  this.mesh.visibility = false
}

function initSelf(self) {
  for (var s in self._data.frames) {
    self.frames.push(s)
  }
  self._pending = false
  var fr = self._pendingFrame || self.frames[0]
  self.setFrame(fr)
  self.mesh.visibility = true
}




// Set which frame to show (frame names are as defined in the spritesheet json)

AtlasSprite.prototype.setFrame = function(frame) {
  if (this._pending) {
    this._pendingFrame = frame
    return
  }

  if (typeof frame === 'number') frame = this.frames[frame]
  if (frame === this.currentFrame) return
  
  var dat = this._data.frames[frame]
  if (!dat) {
    throw new Error('Babylon sprite: frame "'+frame+'" not found in atlas')
    return
  }

  var tex = this.texture
  var s = tex.getSize()

  var w = dat.frame.w
  var h = dat.frame.h
  var x = dat.frame.x
  var y = dat.frame.y

  tex.uScale = w/s.width
  tex.vScale = h/s.height
  tex.uOffset = ( s.width /2 - x)/w - 0.5
  tex.vOffset = (-s.height/2 + y)/h + 0.5

  this.currentFrame = frame
}



// dispose method - disposes babylon objects

AtlasSprite.prototype.dispose = function() {
  this.texture.dispose()
  this.material.dispose()
  this.mesh.dispose()
  this._data = null
  this._pending = true
  this.currentFrame = ''
  this.frames.length = 0
}


