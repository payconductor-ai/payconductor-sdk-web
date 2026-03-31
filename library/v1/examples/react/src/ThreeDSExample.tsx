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

const TEST_ORDER: OrderCreateRequest = {
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
			number: "4235647728025682",
			holderName: "JOAO SILVA",
			cvv: "123",
			expiration: { month: 12, year: 2028 },
		},
		installments: 1,
	},
	shippingFee: 0,
	taxFee: 0,
};

type Step = "idle" | "creating" | "challenging" | "done";

export function ThreeDSExample() {
	const [step, setStep] = useState<Step>("idle");
	const [order, setOrder] = useState<OrderCreateResponse | null>(null);
	const [error, setError] = useState<string | null>(null);
	const [challengeResult, setChallengeResult] = useState<string | null>(null);

	const { handleChallenge } = useThreeDS({
		onChallenge: () => console.log("3DS challenge started"),
		onComplete: () => console.log("3DS challenge completed"),
		onError: (err) => console.error("3DS error:", err),
		onTimeout: () => console.warn("3DS challenge timed out"),
	});

	const handlePay = async () => {
		setStep("creating");
		setError(null);
		setOrder(null);
		setChallengeResult(null);

		try {
			const { data } = await orderApi.orderCreate({
				...TEST_ORDER,
				externalId: `3ds-test-${Date.now()}`,
			});

			setOrder(data);

			const needs3DS =
				data.statusDetail === "ThreeDsAwaitingChallenge" ||
				data.threeDSecure?.status === "NeedChallenge";

			if (needs3DS && data.threeDSecure) {
				setStep("challenging");

				const result = await handleChallenge({
					statusDetail: data.statusDetail,
					status: data.threeDSecure.status,
					acquirer: data.threeDSecure.acquirer,
					authToken: data.threeDSecure.authToken,
					threeDsUrl: data.threeDSecure.threeDsUrl,
					dsTransactionId: data.threeDSecure.dsTransactionId,
					version: data.threeDSecure.version,
					operationUrl: data.threeDSecure.operationUrl,
					publicKey: data.threeDSecure.publicKey,
				});

				setChallengeResult(result.status);

				if (result.status === "Success") {
					const { data: confirmed } = await orderApi.orderConfirm(data.id);
					setOrder(confirmed);
				}

				setStep("done");
			} else {
				setChallengeResult(data.status);
				setStep("done");
			}
		} catch (err) {
			setError(err instanceof Error ? err.message : "Unknown error");
			setStep("idle");
		}
	};

	return (
		<div style={{ maxWidth: "560px", margin: "0 auto", padding: "24px" }}>
			<h1>PayConductor - 3DS Test</h1>
			<p style={{ color: "#64748b", fontSize: "14px" }}>
				Uses useThreeDS hook with @payconductor/sdk. No iframe, no checkout element.
			</p>

			<div style={{ marginTop: "24px", padding: "24px", border: "1px solid #e2e8f0", borderRadius: "8px" }}>
				<h2 style={{ margin: "0 0 16px", fontSize: "18px" }}>Order Data</h2>

				<div style={{ padding: "16px", backgroundColor: "#f8fafc", borderRadius: "8px", marginBottom: "16px", fontFamily: "monospace", fontSize: "14px" }}>
					<Row label="Card" value="4235 6477 2802 5682" />
					<Row label="Amount" value="R$ 100,00" />
					<Row label="Installments" value="1x" />
					<Row label="Customer" value="Joao Silva" />
					<Row label="Document" value="123.456.789-09" />
				</div>

				<button
					disabled={step === "creating" || step === "challenging"}
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
						color={challengeResult === "Success" ? "#16a34a" : "#dc2626"}
						bg={challengeResult === "Success" ? "#f0fdf4" : "#fef2f2"}
						border={challengeResult === "Success" ? "#bbf7d0" : "#fecaca"}
						label="3DS Result"
						lines={[["Status", challengeResult]]}
					/>
				)}

				{error && (
					<div style={{ color: "#fa755a", marginTop: "16px", fontSize: "14px", overflowWrap: "break-word" }}>{error}</div>
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
