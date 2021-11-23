var canvas = document.createElement('canvas')
canvas.width = window.innerWidth
canvas.height = window.innerHeight
document.body.appendChild(canvas)

var gl = canvas.getContext('webgl')

gl.clearColor(1,0,1,1)
gl.clear(gl.COLOR_BUFFER_BIT)

function createShader(sh, type){ 
    // sh GLSL code (string)
    // type = gl.VERTEX_SHADER or gl.FRAGMENT_SHADER
    var shader= gl.createShader(type)
    gl.shaderSource(shader,sh)
    gl.compileShader(shader)
    return shader
}

function createProgram(vs,fs){ // vs,fs GLSL code (string)
    var program = gl.createProgram()
    var vshader = createShader(vs, gl.VERTEX_SHADER)
    var fshader = createShader(fs, gl.FRAGMENT_SHADER)
    gl.attachShader(program,vshader)
    gl.attachShader(program,fshader)
    gl.linkProgram(program)
    return program
}
// DATA
var vertexPosBuffer = gl.createBuffer()
gl.bindBuffer(gl.ARRAY_BUFFER, vertexPosBuffer)
var vertices =
    [-0.5, -0.5,
     0.5, -0.5, 
     0, 0.5];
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW)

// SHADERS
vs=`
    attribute vec2 pos;
    void main(){
        gl_Position = vec4(pos, 0, 1);
    }
`
fs=`
    precision mediump float;
    void main(){
        gl_FragColor = vec4(0,1,0,1)
    }
`
// PROGRAM
var program = createProgram(vs,fs)
gl.useProgram(program)

program.vertexPosAttrib = gl.getAttribLocation(program,'pos')
