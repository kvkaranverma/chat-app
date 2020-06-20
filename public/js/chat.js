const socket = io()

// Elements
const $messageForm = document.getElementById('messageForm')
const $messageFormInput = $messageForm.querySelector('#messageText')
const $messageFormButton = $messageForm.querySelector('#sendMessageBtn')
const $sendLocationButton = document.getElementById('sendLocation')
const $messages = document.getElementById('messages')

// Templates
const messageTemplate = document.getElementById('message-template').innerHTML
const locationMessageTemplate = document.getElementById('location-message-template').innerHTML

socket.on('message', (message) => {
    console.log(message)
    const html = Mustache.render(messageTemplate, {
        message: message.text,
        createdAt: moment(message.createdAt).format('h:mm a')
    })
    $messages.insertAdjacentHTML('beforeend', html)
})

socket.on('locationMessage', (mapsURL) => {
    console.log(mapsURL)
    const html = Mustache.render(locationMessageTemplate, {
        mapsURL: mapsURL.text,
        createdAt: moment(mapsURL.createdAt).format('h:mm a')
    })
    $messages.insertAdjacentHTML('beforeend', html)
})

$messageForm.addEventListener('submit', (e) => {
    e.preventDefault()
    $messageFormButton.setAttribute('disabled', 'disabled')

    const message = $messageFormInput.value
    socket.emit('sendMessage', message, (error) => {
        $messageFormButton.removeAttribute('disabled')
        $messageFormInput.value = ''
        $messageFormInput.focus()

        if(error) {
            return console.log(error)
        }
        console.log('Message delivered!')
    })
})

$sendLocationButton.addEventListener('click', () => {
    $sendLocationButton.setAttribute('disabled', 'disabled')
    if(!navigator.geolocation) {
        return alert('Geolocation is not supported by your browser')
    }

    navigator.geolocation.getCurrentPosition((position) => {
        const latitude = position.coords.latitude
        const longitude = position.coords.longitude
        socket.emit('sendLocation', {latitude, longitude}, () => {
            $sendLocationButton.removeAttribute('disabled')
            console.log('Location shared!')
        })
    })
})
