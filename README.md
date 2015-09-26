babylon-atlas-sprite
==========

A Babylon.js object that shows frames from a texture atlas (img+JSON).

### Usage:

```javascript
var AtlasSprite = require('babylon-atlas-sprite')

var sprite = new AtlasSprite('sprites.png', 'sprites.json', scene, BABYLON)

// standard babylon objects exposed as 'mesh', 'material', 'texture'
sprite.mesh.position.x = 5

// set frame to names specified in the json
sprite.setFrame( 'frame003' )
```

Live demo [here](http://andyhall.github.io/babylon-atlas-sprite/example/).

### Installation

```shell
npm install babylon-atlas-sprite
```

To see example locally:

```shell
cd babylon-atlas-sprite
npm install
npm test
```

### API

```javascript
var AtlasSprite = require('babylon-atlas-sprite')

new AtlasSprite( imgURL, jsonURL, scene, BABYLON, noMipMap, samplingMode )

sprite.frames // array of frame names from JSON

sprite.setFrame(frameName)

sprite.setFrame(num) // same as: sprite.setFrame(sprite.frames[num]) 

sprite.dispose()
```