"use client";
import { useMemo } from "react";
import styles from "./MathBackground.module.css";

const MATH_SYMBOLS = [
    "∇", "Σ", "∂", "∫", "λ", "θ", "∞",
    "Ax = λx", "det(A)", "‖v‖", "∂L/∂w",
    "σ(x)", "∇f", "Aᵀ", "P(x|y)", "∈ ℝⁿ",
    "softmax", "∇²", "⊗", "∝", "≈",
    "E[X]", "argmin", "log p(x)",
    "xᵀWx", "tr(A)", "rank(A)",
];

export default function MathBackground() {
    const symbols = useMemo(() => {
        const items = [];
        for (let i = 0; i < 35; i++) {
            items.push({
                symbol: MATH_SYMBOLS[i % MATH_SYMBOLS.length],
                left: `${(i * 37 + 13) % 100}%`,
                top: `${(i * 53 + 7) % 100}%`,
                delay: `${(i * 1.7) % 12}s`,
                duration: `${18 + (i % 7) * 4}s`,
                size: `${12 + (i % 5) * 3}px`,
                opacity: 0.03 + (i % 4) * 0.01,
            });
        }
        return items;
    }, []);

    return (
        <div className={styles.mathBg} aria-hidden="true">
            {symbols.map((s, i) => (
                <span
                    key={i}
                    className={styles.mathSymbol}
                    style={{
                        left: s.left,
                        top: s.top,
                        animationDelay: s.delay,
                        animationDuration: s.duration,
                        fontSize: s.size,
                        opacity: s.opacity,
                    }}
                >
                    {s.symbol}
                </span>
            ))}
        </div>
    );
}
