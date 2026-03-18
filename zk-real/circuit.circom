pragma circom 2.0.0;

include "../node_modules/circomlib/circuits/comparators.circom";

template ThresholdCheck() {
    signal input score;
    signal input threshold;

    component gte = GreaterEqThan(32);

    gte.in[0] <== score;
    gte.in[1] <== threshold;

    gte.out === 1;
}

// 👇 AQUÍ EL CAMBIO IMPORTANTE
component main {public [threshold]} = ThresholdCheck();