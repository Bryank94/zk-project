const { generateProof } = require("./prover");
const { verifyProof } = require("./verifier");

// Dato privado
const privateScore = 812;

// Regla pública
const publicThreshold = 750;

console.log("=== SISTEMA ZK SIMULADO ===");

// El prover genera la prueba
const proofData = generateProof(privateScore, publicThreshold);

// Información pública
console.log("Regla:", proofData.statement);
console.log("Threshold:", publicThreshold);

// El verifier verifica la prueba
const result = verifyProof(proofData);

console.log("¿Prueba válida?", result);