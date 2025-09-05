const loggingPlugin = {
	requestDidStart(requestContext) {
		const { request } = requestContext;

		// Skip introspection queries and schema queries
		if (
			request.query &&
			(request.query.includes("__schema") ||
				request.query.includes("__type") ||
				request.query.includes("IntrospectionQuery"))
		) {
			return {};
		}

		// Only log actual queries and mutations
		const operationType = request.query
			? request.query.trim().startsWith("mutation")
				? "MUTATION"
				: "QUERY"
			: "UNKNOWN";

		const operationName = request.operationName || "Anonymous";

		console.log(`\n🚀 ${operationType}: ${operationName}`);
		console.log("📝 Query:", request.query);

		if (request.variables && Object.keys(request.variables).length > 0) {
			console.log("📊 Variables:", JSON.stringify(request.variables, null, 2));
		}

		return {
			willSendResponse(requestContext) {
				if (requestContext.response.data) {
					console.log(
						"✅ Response Data:",
						JSON.stringify(requestContext.response.data, null, 2)
					);
				}
				if (requestContext.response.errors) {
					console.log("❌ Errors:", requestContext.response.errors);
				}
				console.log("─────────────────────────────────────\n");
			},
		};
	},
};

module.exports = loggingPlugin;
