const generateMessage = (text) => {
    return {
        text,
        createdAt: new Date().getTime()
    }
}

const getLocationMessage = (url) => {
    return {
        url,
        createdAt: new Date().getTime()
    }
}

module.exports = {
    generateMessage,
    getLocationMessage
}