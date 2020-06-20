const socket = io()

socket.on('message', (message) => {
    console.log(message)
})

const messageForm = document.getElementById('messageForm')
messageForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const message = e.target.elements.message.value
    socket.emit('sendMessage', message, (error) => {
        if(error) {
            return console.log(error)
        }
        console.log('Message delivered!')
    })
})

const sendLocation = document.getElementById('sendLocation')
sendLocation.addEventListener('click', () => {
    if(!navigator.geolocation) {
        return alert('Geolocation is not supported by your browser')
    }

    navigator.geolocation.getCurrentPosition((position) => {
        const latitude = position.coords.latitude
        const longitude = position.coords.longitude
        socket.emit('sendLocation', {latitude, longitude}, () => {
            console.log('Location shared!')
        })
    })
})
