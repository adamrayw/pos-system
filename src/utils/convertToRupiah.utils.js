function convert(price) {
    const converted = new Intl.NumberFormat(['ban', 'id']).format(price)
    return converted
}

export default convert