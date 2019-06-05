const greeter = (name = 'user') => {
    console.log('Hello ' + name)
}

greeter()

const transaction = (type, { label, stock = 0 } = {}) => {
    console.log(type, label, stock)
}
transaction('order')

transaction('order', product)