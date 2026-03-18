const { generateProof } = require("./prover");
const { verifyProof } = require("./verifier");

// Dato privado REAL
const privateScore = 700; // 👈 NO cumple

// Regla pública
const publicThreshold = 750;

console.log("=== PRUEBA CON POSIBLE TRAMPA ===");

// El prover genera la prueba
const proofData = generateProof(privateScore, publicThreshold);

// 👇 SIMULAMOS TRAMPA
proofData.result = true; // el prover intenta mentir

console.log("Commitment:", proofData.commitment);
console.log("Threshold:", proofData.threshold);
console.log("Resultado declarado:", proofData.result);

// Verifier valida
const result = verifyProof(proofData);

console.log("¿Prueba válida?", result);