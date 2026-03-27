console.log("🔥 SERVER CORRECTO CARGADO");
const express = require("express");
const path = require("path");
const fs = require("fs");
const { exec } = require("child_process");

const app = express();
const PORT = 3000;

// Servir frontend
app.use(express.static(path.join(__dirname, "public")));

// 🔥 Ruta ZK
app.get("/prove", (req, res) => {
    const { score, min, max } = req.query;

    // 1. Actualizar input.json
    fs.writeFileSync(
        "zk-real/build/input.json",
        JSON.stringify({
        score: score.toString(),
        min: min.toString(),
        max: max.toString()
        }, null, 2)
    );

    // 2. Ejecutar ZK
    const command = `
    node zk-real/build/circuit_js/generate_witness.js zk-real/build/circuit_js/circuit.wasm zk-real/build/input.json zk-real/build/witness.wtns &&
    snarkjs groth16 prove zk-real/build/circuit_final.zkey zk-real/build/witness.wtns zk-real/build/proof.json zk-real/build/public.json
    `;

    exec(command, (error, stdout, stderr) => {
        if (error) {
            console.log("STDOUT:", stdout);
            console.log("STDERR:", stderr);
            console.log("ERROR:", error.message);
            return res.status(500).json({ error: error.message });
            }
        try {
            const proofPath = path.join(__dirname, "zk-real", "build", "proof.json");
            const publicPath = path.join(__dirname, "zk-real", "build", "public.json");

            const proof = JSON.parse(fs.readFileSync(proofPath));
            const publicSignals = JSON.parse(fs.readFileSync(publicPath));

            // ✅ FORMATO CORRECTO PARA SOLIDITY

            const pA = [
                proof.pi_a[0].toString(),
                proof.pi_a[1].toString()
            ];

            const pB = [
                [
                    proof.pi_b[0][1].toString(),
                    proof.pi_b[0][0].toString()
                ],
                [
                    proof.pi_b[1][1].toString(),
                    proof.pi_b[1][0].toString()
                ]
            ];

            const pC = [
                proof.pi_c[0].toString(),
                proof.pi_c[1].toString()
            ];

            const pubSignals = [
                publicSignals[0].toString(),
                publicSignals[1].toString()
        ];

            res.json({
                success: true,
                pA,
                pB,
                pC,
                pubSignals
            });

        } catch (err) {
            res.status(500).json({ error: "Error leyendo proof" });
        }
    });
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor en http://localhost:${PORT}`);
});