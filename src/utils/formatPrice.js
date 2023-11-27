export function formatPrice(price) {
  return new Intl.NumberFormat('us-US', {
		style: 'currency',
		currency: 'USD',
	}).format(price)
}