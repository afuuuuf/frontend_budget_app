export function buildTransactionPayload(formData) {
    return {
        description: formData.description.trim(),
        amount: Number(formData.amount),
        category: formData.category,
    };
}