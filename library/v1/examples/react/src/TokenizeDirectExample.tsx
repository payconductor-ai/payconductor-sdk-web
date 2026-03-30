import { PayConductorTokenizeSDK } from "@payconductor/react";
import {
	Configuration,
	DocumentType,
	OrderApi,
	type OrderCreateRequest,
} from "@payconductor/sdk";
import { useState } from "react";

const publicKey = import.meta.env.VITE_PAYCONDUCTOR_CLIENT_ID || "your_client_id";

const sdkConfig = new Configuration({
	username: import.meta.env.VITE_PAYCONDUCTOR_CLIENT_ID || "your_client_id",
	password: import.meta.env.VITE_PAYCONDUCTOR_CLIENT_SECRET || "your_client_secret",
	basePath: import.meta.env.DEV ? "http://localhost:5174/api/v1" : "https://api.payconductor.ai/api/v1",
});

const orderApi = new OrderApi(sdkConfig);
const tokenizeSDK = new PayConductorTokenizeSDK(publicKey);

export function TokenizeDirectExample() {
	const [step, setStep] = useState<"idle" | "tokenizing" | "creating_order" | "done">("idle");
	const [token, setToken] = useState<string | null>(null);
	const [orderId, setOrderId] = useState<string | null>(null);
	const [error, setError] = useState<string | null>(null);

	const handleTokenizeAndPay = async () => {
		setStep("tokenizing");
		setError(null);
		setToken(null);
		setOrderId(null);
		
		const cardNumber = "4235647728025682"

		try {
			const cardToken = await tokenizeSDK.tokenizeCard({
				customer: {
					name: "Joao Silva",
					email: "joao@teste.com",
					documentNumber: "12345678909",
					documentType: "Cpf",
					phoneNumber: "+55 11 987654321",
				},
				card: {
					number: cardNumber,
					holderName: "JOAO SILVA",
					cvv: "123",
					expiration: {month: 12, year: 2028},
				},
			});

			setToken(cardToken);
			setStep("creating_order");

			const orderRequest: OrderCreateRequest = {
				chargeAmount: 50.00,
				clientIp: "0.0.0.0",
				customer: {
					documentNumber: "12345678909",
					documentType: DocumentType.Cpf,
					email: "joao@teste.com",
					name: "Joao Silva",
				},
				discountAmount: 0,
				externalId: `tokenize-test-${Date.now()}`,
				payment: {
					paymentMethod: "CreditCard",
					card: {
						token: cardToken,
						firstSixCardNumber: cardNumber.slice(0, 6),
					},
					installments: 1,
				},
				shippingFee: 0,
				taxFee: 0,
			};

			const {data: orderData} = await orderApi.orderCreate(orderRequest);
			setOrderId(orderData.id);
			setStep("done");
		} catch (err) {
			setError(err instanceof Error ? err.message : "Unknown error");
			setStep("idle");
		}
	};

	return (
		<div style={{maxWidth: "560px", margin: "0 auto", padding: "24px"}}>
			<h1>PayConductor - Tokenize Direct</h1>
			<p style={{color: "#64748b", fontSize: "14px"}}>
				Uses PayConductorTokenizeSDK directly (no checkout element).
			</p>

			<div style={{marginTop: "24px", padding: "24px", border: "1px solid #e2e8f0", borderRadius: "8px"}}>
				<h2 style={{margin: "0 0 16px", fontSize: "18px"}}>Card Data</h2>

				<div style={{
					padding: "16px",
					backgroundColor: "#f8fafc",
					borderRadius: "8px",
					marginBottom: "16px",
					fontFamily: "monospace",
					fontSize: "14px"
				}}>
					<Row label="Number" value="4235 6477 2802 5682"/>
					<Row label="Holder" value="JOAO SILVA"/>
					<Row label="Expiry" value="12/2028"/>
					<Row label="CVV" value="123"/>
				</div>

				<button
					disabled={step !== "idle" && step !== "done"}
					onClick={handleTokenizeAndPay}
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
					{step === "idle" || step === "done" ? "Tokenize and Create Order" : null}
					{step === "tokenizing" ? "Tokenizing card..." : null}
					{step === "creating_order" ? "Creating order..." : null}
				</button>

				{token && (
					<ResultBox color="#16a34a" bg="#f0fdf4" border="#bbf7d0" label="Card Token" value={token}/>
				)}

				{orderId && (
					<ResultBox color="#2563eb" bg="#eff6ff" border="#bfdbfe" label="Order ID" value={orderId}/>
				)}

				{error && (
					<div style={{color: "#fa755a", marginTop: "16px"}}>{error}</div>
				)}
			</div>
		</div>
	);
}

function Row({ label, value }: { label: string; value: string }) {
	return (
		<div style={{ display: "flex", justifyContent: "space-between", padding: "4px 0" }}>
			<span style={{ color: "#64748b" }}>{label}</span>
			<span>{value}</span>
		</div>
	);
}

function ResultBox({ color, bg, border, label, value }: { color: string; bg: string; border: string; label: string; value: string }) {
	return (
		<div style={{ marginTop: "16px", padding: "16px", backgroundColor: bg, borderRadius: "8px", border: `1px solid ${border}` }}>
			<p style={{ margin: "0 0 4px", fontSize: "13px", color, fontWeight: 600 }}>{label}</p>
			<p style={{ margin: "0", fontFamily: "monospace", fontSize: "14px", wordBreak: "break-all" }}>{value}</p>
		</div>
	);
}
