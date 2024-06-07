function formatPrice(price: string) {
  const response = 'R$ ' + parseFloat(price).toFixed(2).replace('.', ',');
  if(response === 'R$ NaN') {
    return '-'
  }
  return response
}

export default formatPrice;