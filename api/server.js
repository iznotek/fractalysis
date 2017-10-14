const express = require('express');
const glsl = require('glslify');
const app = express();

// This is very light-weight API to compile shaders and use glslify module system

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// Simple transformer to replace a variable with the shader name
const dynamicShaderTransformer = shader => (filename, src, opts) => {
  return src.replace('{{FractalShader}}', shader);
};

app.get('/compile/:shader', (req, res) => {
  const { shader } = req.params;
  const WIP_SHADERS = ['OctahedralIFS'];

  // TODO Eventually make all the shaders modular enough so 2D, 3D or whatever can be used though master and combined with other shaders
  // For now, for shaders that are not yet modular, load them directly
  let shaderSrc = null;
  if (WIP_SHADERS.includes(shader)) {
    shaderSrc = glsl.file(`./shaders/${shader}/fractal.glsl`);
  }
  else {
    shaderSrc = glsl.file('./shaders/master.glsl', { transform: [ dynamicShaderTransformer(shader) ] });
  }
  res.set('Content-Type', 'text/plain');
  res.send(shaderSrc);
});

app.listen(3001, () => {
  console.log(':: 💻  Fractalysis shader API listening on port 3001!');
});
