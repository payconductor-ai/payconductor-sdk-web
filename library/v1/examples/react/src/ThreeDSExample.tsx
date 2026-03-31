import { useThreeDS } from "@payconductor/react";
import {
	Configuration,
	DocumentType,
	OrderApi,
	type OrderCreateRequest,
	type OrderCreateResponse,
} from "@payconductor/sdk";
import { useState } from "react";

const sdkConfig = new Configuration({
	username: import.meta.env.VITE_PAYCONDUCTOR_CLIENT_ID,
	password: import.meta.env.VITE_PAYCONDUCTOR_CLIENT_SECRET,
	basePath: import.meta.env.DEV ? "http://localhost:5174/api/v1" : "https://api.payconductor.ai/api/v1",
});

const orderApi = new OrderApi(sdkConfig);

type TestCard = {
	number: string;
	label: string;
	brand: string;
};

const TEST_CARDS: Record<string, TestCard[]> = {
	"Mastercard": [
		{ number: "5100010000000114", label: "3DS2 frictionless + fingerprinting", brand: "Mastercard" },
		{ number: "5100010000000106", label: "3DS2 challenge + fingerprinting", brand: "Mastercard" },
		{ number: "5100010000001054", label: "3DS2 challenge + timeout fingerprinting", brand: "Mastercard" },
		{ number: "5100010000000056", label: "3DS2 timeout no challenge", brand: "Mastercard" },
		{ number: "5970100300000042", label: "Aceito - comprador nao inscrito 3DS", brand: "Mastercard" },
		{ number: "5970100300000067", label: "Aceito, garantia = NAO", brand: "Mastercard" },
		{ number: "5970100300000083", label: "Recusado - limite excedido", brand: "Mastercard" },
		{ number: "5970100300000091", label: "Recusado - CVV incorreto", brand: "Mastercard" },
		{ number: "5970100300000075", label: "Recusado - falha autenticacao 3DS2", brand: "Mastercard" },
	],
	"Visa": [
		{ number: "4970115000000210", label: "3DS2 frictionless + fingerprinting", brand: "Visa" },
		{ number: "4970115000000228", label: "3DS2 challenge + fingerprinting", brand: "Visa" },
		{ number: "4970110000002019", label: "3DS2 challenge + timeout fingerprinting", brand: "Visa" },
		{ number: "4970110000000054", label: "3DS2 timeout no challenge", brand: "Visa" },
		{ number: "4970100000000048", label: "Aceito - comprador nao inscrito 3DS", brand: "Visa" },
		{ number: "4970100000000055", label: "Aceito, garantia = NAO", brand: "Visa" },
		{ number: "4970100000000071", label: "Recusado - limite excedido", brand: "Visa" },
		{ number: "4970100000000089", label: "Recusado - CVV incorreto", brand: "Visa" },
		{ number: "4970100000000063", label: "Recusado - falha autenticacao 3DS2", brand: "Visa" },
	],
	"Elo": [
		{ number: "6550010000000042", label: "Autenticacao frictionless sem fingerprinting", brand: "Elo" },
		{ number: "6550010000000109", label: "Autenticacao frictionless + fingerprinting", brand: "Elo" },
		{ number: "6550010000000117", label: "Autenticacao frictionless + timeout", brand: "Elo" },
		{ number: "6550010000000026", label: "Autenticacao challenge sem fingerprinting", brand: "Elo" },
		{ number: "6550010000000133", label: "Autenticacao challenge + fingerprinting", brand: "Elo" },
		{ number: "6550010000000141", label: "Autenticacao challenge + timeout fingerprinting", brand: "Elo" },
		{ number: "6550010000000067", label: "Autenticacao timeout no challenge", brand: "Elo" },
	],
	"AMEX": [
		{ number: "375900000000008", label: "Autenticacao frictionless sem fingerprinting", brand: "AMEX" },
		{ number: "375900000010007", label: "Autenticacao frictionless + fingerprinting", brand: "AMEX" },
		{ number: "375900000000016", label: "Autenticacao challenge sem fingerprinting", brand: "AMEX" },
		{ number: "375900000010015", label: "Autenticacao challenge + fingerprinting", brand: "AMEX" },
		{ number: "375900000020006", label: "Autenticacao fingerprint + timeout", brand: "AMEX" },
		{ number: "375900000020014", label: "Autenticacao challenge + timeout fingerprinting", brand: "AMEX" },
		{ number: "375900000010254", label: "Autenticacao timeout no challenge", brand: "AMEX" },
	],
	"Diners": [
		{ number: "36000000000008", label: "Aceito", brand: "Diners" },
		{ number: "36000000000057", label: "Recusado", brand: "Diners" },
		{ number: "36000100000106", label: "3DS2 frictionless + fingerprinting (GRL)", brand: "Diners" },
		{ number: "36000100000130", label: "3DS2 challenge + fingerprinting", brand: "Diners" },
		{ number: "36000100000064", label: "Timeout no challenge", brand: "Diners" },
	],
};

type Step = "idle" | "creating" | "challenging" | "confirming" | "done";

export function ThreeDSExample() {
	const [selectedCard, setSelectedCard] = useState<TestCard>(TEST_CARDS["Visa"][1]);
	const [selectedBrand, setSelectedBrand] = useState("Visa");
	const [step, setStep] = useState<Step>("idle");
	const [order, setOrder] = useState<OrderCreateResponse | null>(null);
	const [error, setError] = useState<string | null>(null);
	const [challengeResult, setChallengeResult] = useState<string | null>(null);
	const [logs, setLogs] = useState<string[]>([]);

	const log = (msg: string) => setLogs((prev) => [...prev, `[${new Date().toLocaleTimeString()}] ${msg}`]);

	const { handleChallenge } = useThreeDS({
		onChallenge: () => log("3DS challenge started"),
		onComplete: () => log("3DS challenge completed"),
		onError: (err) => log(`3DS error: ${err.message}`),
		onTimeout: () => log("3DS challenge timed out"),
	});

	const handlePay = async () => {
		setStep("creating");
		setError(null);
		setOrder(null);
		setChallengeResult(null);
		setLogs([]);
		log(`Creating order with card ${selectedCard.number} (${selectedCard.label})`);

		try {
			const orderRequest: OrderCreateRequest = {
				chargeAmount: 100.00,
				clientIp: "0.0.0.0",
				customer: {
					documentNumber: "12345678909",
					documentType: DocumentType.Cpf,
					email: "joao@teste.com",
					name: "Joao Silva",
					phoneNumber: "+55 11 987654321",
				},
				discountAmount: 0,
				externalId: `3ds-test-${Date.now()}`,
				payment: {
					paymentMethod: "CreditCard",
					card: {
						number: selectedCard.number,
						holderName: "JOAO SILVA",
						cvv: "123",
						expiration: { month: 4, year: 2025 },
					},
					installments: 1,
				},
				shippingFee: 0,
				taxFee: 0,
			};

			const { data } = await orderApi.orderCreate(orderRequest);
			setOrder(data);
			log(`Order created: ${data.id} | status: ${data.status} | statusDetail: ${(data as any).statusDetail ?? "-"}`);

			const statusDetail = (data as any).statusDetail as string | undefined;
			const threeDSecure = data.threeDSecure;

			const needs3DS =
				statusDetail === "ThreeDsAwaitingChallenge" ||
				threeDSecure?.status === "NeedChallenge";

			if (!needs3DS) {
				log(`No 3DS needed. Order status: ${data.status}`);
				setChallengeResult(data.status);
				setStep("done");
				return;
			}

			log(`3DS required. Acquirer: ${threeDSecure?.acquirer ?? "PayConductor (inferred)"}`);
			setStep("challenging");

			const result = await handleChallenge({
				statusDetail,
				status: threeDSecure?.status,
				acquirer: threeDSecure?.acquirer,
				authToken: threeDSecure?.authToken,
				threeDsUrl: threeDSecure?.threeDsUrl,
				dsTransactionId: threeDSecure?.dsTransactionId,
				version: threeDSecure?.version,
				operationUrl: threeDSecure?.operationUrl,
				publicKey: threeDSecure?.publicKey,
				environment: threeDSecure?.environment,
			});

			log(`3DS result: ${result.status}`);
			setChallengeResult(result.status);

			if (result.status === "Success") {
				setStep("confirming");
				log("Confirming order after 3DS...");

				try {
					const { data: confirmed } = await orderApi.orderConfirm(data.id);
					setOrder(confirmed);
					log(`Order confirmed: ${confirmed.status}`);
				} catch (confirmErr) {
					const msg = confirmErr instanceof Error ? confirmErr.message : "Confirm failed";
					log(`Confirm error: ${msg}`);
				}
			}

			setStep("done");
		} catch (err) {
			const msg = err instanceof Error ? err.message : "Unknown error";
			setError(msg);
			log(`Error: ${msg}`);
			setStep("idle");
		}
	};

	return (
		<div style={{ maxWidth: "700px", margin: "0 auto", padding: "24px" }}>
			<h1>PayConductor - 3DS Test</h1>
			<p style={{ color: "#64748b", fontSize: "14px" }}>
				Uses useThreeDS hook with @payconductor/sdk, without checkout element.
			</p>

			<div style={{ marginTop: "24px", padding: "24px", border: "1px solid #e2e8f0", borderRadius: "8px" }}>
				<h2 style={{ margin: "0 0 16px", fontSize: "18px" }}>Test Card</h2>

				<div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "12px" }}>
					{Object.keys(TEST_CARDS).map((brand) => (
						<button
							key={brand}
							type="button"
							onClick={() => {
								setSelectedBrand(brand);
								setSelectedCard(TEST_CARDS[brand][0]);
							}}
							style={{
								padding: "6px 14px",
								borderRadius: "6px",
								border: "1px solid #e2e8f0",
								backgroundColor: selectedBrand === brand ? "#0066ff" : "#fff",
								color: selectedBrand === brand ? "#fff" : "#334155",
								cursor: "pointer",
								fontSize: "13px",
								fontWeight: 500,
							}}
						>
							{brand}
						</button>
					))}
				</div>

				<select
					value={selectedCard.number}
					onChange={(e) => {
						const card = TEST_CARDS[selectedBrand].find((c) => c.number === e.target.value);
						if (card) setSelectedCard(card);
					}}
					style={{
						width: "100%",
						padding: "10px 12px",
						borderRadius: "8px",
						border: "1px solid #e2e8f0",
						fontSize: "14px",
						marginBottom: "16px",
						backgroundColor: "#fff",
					}}
				>
					{TEST_CARDS[selectedBrand].map((card) => (
						<option key={card.number} value={card.number}>
							{card.number} - {card.label}
						</option>
					))}
				</select>

				<div style={{ padding: "16px", backgroundColor: "#f8fafc", borderRadius: "8px", marginBottom: "16px", fontFamily: "monospace", fontSize: "14px" }}>
					<Row label="Card" value={selectedCard.number.replace(/(.{4})/g, "$1 ").trim()} />
					<Row label="Brand" value={selectedCard.brand} />
					<Row label="Scenario" value={selectedCard.label} />
					<Row label="Amount" value="R$ 100,00" />
					<Row label="Expiry / CVV" value="04/2025 / 123" />
				</div>

				<button
					disabled={step === "creating" || step === "challenging" || step === "confirming"}
					onClick={handlePay}
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
					{step === "idle" || step === "done" ? "Pay with 3DS" : null}
					{step === "creating" ? "Creating order..." : null}
					{step === "challenging" ? "Waiting 3DS challenge..." : null}
					{step === "confirming" ? "Confirming order..." : null}
				</button>

				{order && (
					<ResultBox
						color="#2563eb"
						bg="#eff6ff"
						border="#bfdbfe"
						label="Order"
						lines={[
							["ID", order.id],
							["Status", order.status],
							["Status Detail", (order as any).statusDetail ?? "-"],
							["Provider", order.externalIntegrationKey || "-"],
							["3DS Acquirer", order.threeDSecure?.acquirer ?? "PayConductor"],
						]}
					/>
				)}

				{challengeResult && (
					<ResultBox
						color={challengeResult === "Success" || challengeResult === "Completed" ? "#16a34a" : "#dc2626"}
						bg={challengeResult === "Success" || challengeResult === "Completed" ? "#f0fdf4" : "#fef2f2"}
						border={challengeResult === "Success" || challengeResult === "Completed" ? "#bbf7d0" : "#fecaca"}
						label="3DS Result"
						lines={[["Status", challengeResult]]}
					/>
				)}

				{error && (
					<div style={{ color: "#fa755a", marginTop: "16px", fontSize: "14px", overflowWrap: "break-word" }}>{error}</div>
				)}

				{logs.length > 0 && (
					<div style={{ marginTop: "16px", padding: "12px", backgroundColor: "#1e293b", borderRadius: "8px", maxHeight: "200px", overflowY: "auto" }}>
						{logs.map((l, i) => (
							<div key={i} style={{ fontFamily: "monospace", fontSize: "12px", color: "#94a3b8", padding: "2px 0" }}>{l}</div>
						))}
					</div>
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

function ResultBox({ color, bg, border, label, lines }: {
	color: string;
	bg: string;
	border: string;
	label: string;
	lines: [string, string][];
}) {
	return (
		<div style={{ marginTop: "16px", padding: "16px", backgroundColor: bg, borderRadius: "8px", border: `1px solid ${border}` }}>
			<p style={{ margin: "0 0 8px", fontSize: "13px", color, fontWeight: 600 }}>{label}</p>
			{lines.map(([k, v]) => (
				<div key={k} style={{ display: "flex", justifyContent: "space-between", padding: "2px 0", fontSize: "14px" }}>
					<span style={{ color: "#64748b" }}>{k}</span>
					<span style={{ fontFamily: "monospace" }}>{v}</span>
				</div>
			))}
		</div>
	);
}
