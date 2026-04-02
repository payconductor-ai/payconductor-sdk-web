import { useTokenizer } from "@payconductor/react";
import { useState } from "react";

export default function TokenizerExample() {
	const [token, setToken] = useState<string | null>(null);
	const [error, setError] = useState<string | null>(null);
	const [isProcessing, setIsProcessing] = useState(false);

	const { tokenizeCard } = useTokenizer({
		publicKey: import.meta.env.VITE_PAYCONDUCTOR_CLIENT_ID || "your_client_id",
		onSuccess: (t) => console.log("Card tokenized:", t),
		onError: (err) => console.error("Tokenizer error:", err),
	});

	const handleTokenize = async () => {
		setIsProcessing(true);
		setError(null);
		setToken(null);

		const result = await tokenizeCard({
			customer: {
				name: "Customer Name",
				email: "customer@example.com",
				documentNumber: "12345678909",
				documentType: "Cpf",
				phoneNumber: "+55 11 987654321",
			},
			card: {
				number: "4111111111111111",
				holderName: "CUSTOMER NAME",
				cvv: "123",
				expiration: { month: 12, year: 2028 },
			},
		});

		if (result) {
			setToken(result);
		} else {
			setError("Tokenization failed");
		}

		setIsProcessing(false);
	};

	return (
		<div style={{ maxWidth: "560px", margin: "0 auto", padding: "24px" }}>
			<h1>PayConductor Tokenizer</h1>

			<div style={{ marginTop: "24px", padding: "24px", border: "1px solid #e2e8f0", borderRadius: "8px" }}>
				<h2 style={{ margin: "0 0 16px", fontSize: "18px" }}>Test Card Tokenization</h2>

				<p style={{ color: "#64748b", fontSize: "14px", margin: "0 0 16px" }}>
					Uses the useTokenizer hook from @payconductor/react with test card data.
				</p>

				<div style={{ padding: "16px", backgroundColor: "#f8fafc", borderRadius: "8px", marginBottom: "16px" }}>
					<p style={{ margin: "0 0 4px", fontSize: "13px", color: "#64748b" }}>Card Number</p>
					<p style={{ margin: "0", fontFamily: "monospace" }}>4111 1111 1111 1111</p>
					<p style={{ margin: "8px 0 4px", fontSize: "13px", color: "#64748b" }}>Expiry / CVV</p>
					<p style={{ margin: "0", fontFamily: "monospace" }}>12/2028 / 123</p>
				</div>

				<button
					disabled={isProcessing}
					onClick={handleTokenize}
					type="button"
					style={{
						width: "100%",
						padding: "16px",
						backgroundColor: "#0066ff",
						color: "#ffffff",
						border: "none",
						borderRadius: "8px",
						cursor: "pointer",
						fontSize: "16px",
						fontWeight: 600,
					}}
				>
					{isProcessing ? "Tokenizing..." : "Tokenize Card"}
				</button>

				{token && (
					<div style={{ marginTop: "16px", padding: "16px", backgroundColor: "#f0fdf4", borderRadius: "8px", border: "1px solid #bbf7d0" }}>
						<p style={{ margin: "0 0 4px", fontSize: "13px", color: "#16a34a", fontWeight: 600 }}>Token generated</p>
						<p style={{ margin: "0", fontFamily: "monospace", fontSize: "14px", wordBreak: "break-all" }}>{token}</p>
					</div>
				)}

				{error && (
					<div style={{ color: "#fa755a", marginTop: "16px" }}>{error}</div>
				)}
			</div>
		</div>
	);
}
